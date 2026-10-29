export const PLAN = Object.freeze({start:'2026-11-02',end:'2026-12-17',holidays:['2026-11-18'],location:'Amt für Statistik und Wahlen, Thomasiusstraße 1, 04109 Leipzig',title:'Geplanter Besuch: Unterstützungsunterschrift für Getu Abraham',description:'Persönliche Planung, keine Terminbuchung beim Amt.\nAusweisdokument mitnehmen.\nUnterzeichnung vom 2. November bis 17. Dezember 2026.\nZimmer 203, 2. Obergeschoss.\nÖffnungszeiten: Montag bis Mittwoch 10–16 Uhr, Donnerstag 13–18 Uhr, Freitag 7–13 Uhr. Feiertage ausgenommen.\nAktuelle Informationen: https://www.leipzig.de/rathaus/wahlen-in-leipzig/kandidieren'});
export function officeHours(date){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date<PLAN.start||date>PLAN.end)return null;
 const d=new Date(date+'T12:00:00Z');
 if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==date||PLAN.holidays.includes(date))return null;
 const w=d.getUTCDay();return w>=1&&w<=3?[600,960]:w===4?[780,1080]:w===5?[420,780]:null;
}
export function slots(date){const h=officeHours(date);if(!h)return[];const result=[];for(let m=h[0];m+15<=h[1];m+=15)result.push(String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0'));return result;}
export function visit(date,time){
 if(!slots(date).includes(time))throw new Error('Bitte einen Tag und eine Uhrzeit innerhalb der Öffnungszeiten wählen.');
 // The supported November–December 2026 interval lies entirely in Central European Time (UTC+1).
 const start=new Date(date+'T'+time+':00+01:00'),end=new Date(start.getTime()+15*60000);
 const stamp=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
 return {date,time,start:stamp(start),end:stamp(end)};
}
export function escapeIcs(s){return s.replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');}
function foldLine(line){const out=[];let row='',length=0;for(const char of line){const n=new TextEncoder().encode(char).length;if(length+n>75){out.push(row);row=' ';length=1;}row+=char;length+=n;}out.push(row);return out.join('\r\n');}
export function makeIcs(v,uid='visit-'+Date.now()+'@getu-abraham.de',now=new Date()){
 const stamp=now.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
 return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Getu Abraham//Persoenliche Besuchsplanung//DE','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+stamp,'DTSTART:'+v.start,'DTEND:'+v.end,'SUMMARY:'+escapeIcs(PLAN.title),'LOCATION:'+escapeIcs(PLAN.location),'DESCRIPTION:'+escapeIcs(PLAN.description),'END:VEVENT','END:VCALENDAR'].map(foldLine).join('\r\n')+'\r\n';
}
export function googleUrl(v){const q=new URLSearchParams({action:'TEMPLATE',text:PLAN.title,dates:v.start+'/'+v.end,ctz:'Europe/Berlin',location:PLAN.location,details:PLAN.description});return 'https://calendar.google.com/calendar/render?'+q;}
