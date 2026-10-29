import {PLAN,slots,visit,makeIcs,googleUrl} from './calendar.js';
const byId=id=>document.getElementById(id);
const date=byId('visit-date'),time=byId('visit-time'),error=byId('visit-error'),preview=byId('visit-preview');
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
date.min=today>PLAN.start?today:PLAN.start;
let first=date.min;
while(first<=PLAN.end&&!slots(first).length){const next=new Date(first+'T12:00:00Z');next.setUTCDate(next.getUTCDate()+1);first=next.toISOString().slice(0,10);}
date.value=first<=PLAN.end?first:'';
function showError(message){error.textContent=message;error.hidden=!message;}
function refresh(){
 const old=time.value,available=slots(date.value);
 time.replaceChildren();
 for(const s of available){const opt=document.createElement('option');opt.value=s;opt.textContent=s+' Uhr';time.append(opt);}
 if(available.includes(old))time.value=old;
 const valid=available.length>0&&date.value>=date.min;
 time.disabled=!valid;
 byId('download-ics').disabled=!valid;byId('google-calendar').disabled=!valid;
 preview.replaceChildren();
 if(!valid){const why=date.value==='2026-11-18'?'Am 18. November ist Buß- und Bettag. Bitte wählen Sie einen anderen Tag.':today>PLAN.end?'Der Sammelzeitraum ist abgelaufen. Bitte informieren Sie sich auf der Kampagnenwebsite.':'Bitte wählen Sie einen Werktag im Sammelzeitraum. Am Wochenende ist geschlossen.';showError(why);return;}
 showError('');
 const label=document.createElement('strong');
 label.textContent=new Intl.DateTimeFormat('de-DE',{timeZone:'Europe/Berlin',weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(date.value+'T12:00:00Z'))+' · '+time.value+' Uhr';
 const line=document.createElement('span');line.textContent='Thomasiusstraße 1, Leipzig · Ausweis mitnehmen';preview.append(label,line);
}
function selection(){if(date.value<date.min)throw new Error('Bitte wählen Sie einen noch bevorstehenden Besuch.');return visit(date.value,time.value);}
date.addEventListener('change',refresh);
time.addEventListener('change',()=>{const selected=time.value;refresh();time.value=selected;});
byId('visit-form').addEventListener('submit',e=>{e.preventDefault();try{const v=selection();const blob=new Blob([makeIcs(v,crypto.randomUUID()+'@getu-abraham.de')],{type:'text/calendar;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Getu-Unterstuetzungsunterschrift-'+v.date+'.ics';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);showError('');}catch(e){showError(e.message);}});
byId('google-calendar').addEventListener('click',()=>{try{window.open(googleUrl(selection()),'_blank','noopener,noreferrer');showError('');}catch(e){showError(e.message);}});
byId('copy-address').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('Amt für Statistik und Wahlen, Thomasiusstraße 1, 04109 Leipzig');byId('copy-address').textContent='Adresse kopiert ✓';byId('copy-status').textContent='Adresse in die Zwischenablage kopiert.';}catch{byId('copy-address').textContent='Bitte Adresse oben markieren und kopieren';}});
refresh();
