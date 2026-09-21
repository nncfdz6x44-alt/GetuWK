const PROGRAM_PDF_URL = null;

const programTopics = [
  {
    id: "wirtschaft",
    number: "01",
    navTitle: "Wirtschaft",
    kicker: "Wirtschaft & Wissen",
    title: "Leipzigs Zukunft wächst aus Wirtschaft und Wissen",
    description: "Leipzig soll seine Stärke als Wirtschafts-, Wissenschafts- und Hochschulstandort besser miteinander verbinden. Bestehende Unternehmen, Mittelstand, Handwerk, Selbständige und Start-ups benötigen verlässliche Rahmenbedingungen. Gleichzeitig sollen Forschung und wissenschaftliche Erkenntnisse stärker in wirtschaftliche Anwendung überführt werden.",
    points: [
      "Wissenschaft und Unternehmen gezielter miteinander verbinden",
      "Leipziger Wissenschafts- und Wirtschaftsdialog etablieren",
      "Forschungstransfer und Ausgründungen stärken",
      "internationale Wirtschafts- und Wissenschaftskontakte ausbauen",
      "Leipzig als Wissenschafts- und Kongressstandort weiterentwickeln"
    ]
  },
  {
    id: "verwaltung",
    number: "02",
    navTitle: "Verwaltung",
    kicker: "Verwaltung",
    title: "Eine Stadt, die möglich macht",
    description: "Wer sich an die Stadt wendet, soll nicht erst die interne Organisation der Verwaltung verstehen müssen. Zuständigkeiten, notwendige Unterlagen und nächste Schritte sollen einfacher nachvollziehbar sein.",
    points: [
      "ein klarer Weg für Bürgeranliegen",
      "mehr vollständig digitale Verwaltungsleistungen",
      "nachvollziehbarer Bearbeitungsstatus",
      "klare Verantwortung bei ämterübergreifenden Verfahren",
      "Modernisierung gemeinsam mit den Beschäftigten"
    ],
    progress: [
      "Warte- und Bearbeitungszeiten werden kürzer",
      "mehr häufig genutzte Leistungen können vollständig digital erledigt werden",
      "Bearbeitungsstand und nächste Schritte sind nachvollziehbar",
      "Zuständigkeiten bei ämterübergreifenden Anliegen sind klar"
    ]
  },
  {
    id: "finanzen",
    number: "03",
    navTitle: "Finanzen",
    kicker: "Finanzen",
    title: "Solide Finanzen: Fundament für verlässliche Politik",
    description: "Leipzig soll seine finanzielle Handlungsfähigkeit langfristig sichern. Dafür sollen strukturelle Fehlbeträge reduziert, Investitionen priorisiert und finanzielle Risiken transparent betrachtet werden.",
    points: [
      "Haushaltskonsolidierung als Führungsaufgabe",
      "Verschuldungsentwicklung nachvollziehbar darstellen",
      "Investitionen und Folgekosten gemeinsam betrachten",
      "städtische Beteiligungen und finanzielle Risiken einbeziehen",
      "Interessen Leipzigs gegenüber Land und Bund vertreten"
    ],
    progress: [
      "strukturelle Fehlbeträge reduzieren",
      "Investitionen nachvollziehbar priorisieren",
      "finanzielle Risiken und Fortschritte transparent darstellen"
    ]
  },
  {
    id: "mobilitaet",
    number: "04",
    navTitle: "Mobilität",
    kicker: "Mobilität",
    title: "Mobilität und Erreichbarkeit: Das UND ist Leipzigs Stärke",
    description: "Leipzig soll unterschiedliche Formen der Mobilität miteinander verbinden. Gute Erreichbarkeit, Sicherheit und Wahlmöglichkeiten sollen gemeinsam betrachtet werden.",
    points: [
      "Fuß, Rad, ÖPNV und Auto gemeinsam berücksichtigen",
      "Wirtschaftsverkehr praktikabler organisieren",
      "Barrieren und Gefahrenstellen reduzieren",
      "Baustellen besser koordinieren",
      "Stadtteile und Umland zuverlässig anbinden"
    ],
    progress: [
      "bessere Baustellenkoordination",
      "sichere Fuß- und Radverbindungen",
      "Wirtschaftsverkehr und Erreichbarkeit berücksichtigen"
    ]
  },
  {
    id: "bildung",
    number: "05",
    navTitle: "Bildung",
    kicker: "Bildung",
    title: "Schulen, Kitas und Familien",
    description: "Die Stadt trägt Verantwortung für gute Rahmenbedingungen rund um Bildung und Familienalltag – insbesondere bei Gebäuden, Betreuung, Schulwegen und ergänzenden Angeboten.",
    points: [
      "Schulbau und Sanierung nachvollziehbar priorisieren",
      "regelmäßiger Austausch mit Leipziger Schulleitungen",
      "Schulen und Hochschulen stärker miteinander verbinden",
      "Unterstützungsangebote für Kinder besser zugänglich machen",
      "Schulwegsicherheit verbessern"
    ]
  },
  {
    id: "wohnen",
    number: "06",
    navTitle: "Wohnen",
    kicker: "Wohnen",
    title: "Wohnen: Individueller Lebensmittelpunkt",
    description: "Leipzig soll zusätzliche und unterschiedliche Wohnangebote ermöglichen. Dafür sollen geeignete Flächen entwickelt und kommunale Planungs- und Genehmigungsprozesse verlässlicher werden.",
    points: [
      "Neubau und Nachverdichtung ermöglichen",
      "Aufstockungen und Umnutzungen prüfen",
      "höhergeschossiges Bauen an geeigneten Orten offen prüfen",
      "LWB-Neubauziele am tatsächlichen Bedarf ausrichten",
      "Wohnungstausch leichter zugänglich machen"
    ],
    progress: [
      "zusätzliche Wohnungsbauprojekte werden ermöglicht",
      "vergleichbare Verfahren benötigen weniger Zeit",
      "das Angebot unterschiedlicher Wohnungsgrößen wächst",
      "Wohnungstausch wird leichter zugänglich"
    ]
  },
  {
    id: "sicherheit",
    number: "07",
    navTitle: "Öffentlicher Raum",
    kicker: "Öffentlicher Raum",
    title: "Öffentlicher Raum und Sicherheit: Platz für alle",
    description: "Straßen, Plätze, Parks und Wege sollen gepflegt, gut beleuchtet und sicher nutzbar sein. Hinweise aus der Bevölkerung sollen zuverlässig bearbeitet werden.",
    points: [
      "Mängelmelder weiterentwickeln",
      "Zuständigkeiten bei Problemen klarer organisieren",
      "Reinigung, Grünpflege und Beleuchtung besser koordinieren",
      "Stadtordnungsdienst sichtbar und ansprechbar einsetzen",
      "Bearbeitungsstände nachvollziehbarer machen"
    ],
    progress: [
      "Mängelmelder weiterentwickeln",
      "wiederkehrende Probleme systematisch bearbeiten",
      "sichtbarer und ansprechbarer Stadtordnungsdienst"
    ]
  },
  {
    id: "internationalitaet",
    number: "08",
    navTitle: "Internationalität",
    kicker: "Internationalität",
    title: "Internationalität und Weltoffenheit",
    description: "Internationale Beziehungen sollen konkrete Kooperationen für Leipzig ermöglichen – insbesondere in Bildung, Wissenschaft, Wirtschaft und Kultur.",
    points: [
      "Städtepartnerschaften stärker für konkrete Kooperationen nutzen",
      "internationale Akteure gezielter miteinander verbinden",
      "Informationen an wichtigen Kontaktpunkten verständlich und bei Bedarf mehrsprachig zugänglich machen"
    ]
  },
  {
    id: "klima",
    number: "09",
    navTitle: "Klima",
    kicker: "Umwelt & Klima",
    title: "Umwelt- und Klimaschutz",
    description: "Natürliche Ressourcen, saubere Luft und Grünflächen sind Teil der Lebensqualität Leipzigs. Maßnahmen sollen wirksam sein und Veränderungen so gestaltet werden, dass ihre positiven Effekte für die Menschen nachvollziehbar werden.",
    points: [
      "natürliche Ressourcen schützen",
      "Parks, Wälder und Grünflächen an Klimaveränderungen anpassen",
      "Wissenschaft, Unternehmen und Innovationen in die Entwicklung einbeziehen"
    ]
  },
  {
    id: "kultur",
    number: "10",
    navTitle: "Kultur",
    kicker: "Kultur",
    title: "Leipziger Kultur: Vielfalt erleben und selbst gestalten",
    description: "Große Kulturinstitutionen, freie Szene, Clubs, Initiativen und Stadtteilkultur prägen Leipzig gemeinsam. Die unterschiedlichen Formen kultureller Arbeit sollen berücksichtigt werden.",
    points: [
      "kulturelle Vielfalt erhalten",
      "Zugang und kulturelle Bildung stärken",
      "Barrierefreiheit verbessern",
      "Räume für Ateliers, Proben und Veranstaltungen ermöglichen",
      "Belange bestehender Musik- und Clubstandorte frühzeitig berücksichtigen"
    ]
  },
  {
    id: "sport",
    number: "11",
    navTitle: "Sport",
    kicker: "Sport",
    title: "Sport: Bewegung, die verbindet",
    description: "Sport findet in Vereinen, auf Sportanlagen und frei zugänglichen Bewegungsflächen statt. Leipzig soll sowohl Breitensport als auch seine gewachsene Spitzensportinfrastruktur berücksichtigen.",
    points: [
      "Kinder- und Jugendsport unterstützen",
      "Trainingsstätten erhalten",
      "frei zugängliche Bewegungsangebote ermöglichen",
      "geeignete Schulhöfe und Sportplätze weiter öffnen",
      "Sportforum weiterentwickeln"
    ]
  },
  {
    id: "stadtteile",
    number: "12",
    navTitle: "Stadtteile",
    kicker: "Stadtteile",
    title: "Leipzig ist überall Leipzig",
    description: "Die Stadtteile haben unterschiedliche Stärken, Bedürfnisse und Herausforderungen. Lokale Erfahrungen sollen stärker in Entscheidungen einfließen.",
    points: [
      "Stadtbezirksbeiräte und Ortschaftsräte frühzeitig einbeziehen",
      "lokale Prioritäten nachvollziehbar machen",
      "regelmäßige Stadtteilläufe in allen zehn Stadtbezirken durchführen",
      "offene Anliegen dokumentieren und später erneut aufgreifen"
    ],
    progress: [
      "regelmäßige Vor-Ort-Termine finden in allen zehn Stadtbezirken statt",
      "offene Anliegen werden dokumentiert",
      "bei späteren Terminen wird der Bearbeitungsstand erneut aufgegriffen"
    ]
  },
  {
    id: "beteiligung",
    number: "13",
    navTitle: "Beteiligung",
    kicker: "Bürgerbeteiligung",
    title: "Zuhören und Ideen freisetzen",
    description: "Gute Vorschläge sollen einen nachvollziehbaren Weg zur Prüfung erhalten. Gleichzeitig soll sichtbar werden, was aus Fragen, Hinweisen und Ideen tatsächlich entsteht.",
    points: [
      "offene Ideenrunden durchführen",
      "ausgewählte Vorschläge transparent prüfen",
      "Ergebnisse und Zuständigkeiten nachvollziehbar dokumentieren",
      "Format „Der Oberbürgermeister hat eine Frage“ etablieren"
    ]
  }
];

const programHighlights = [
  {
    number: "01",
    title: "Wirtschaft & Wissen",
    text: "Leipzig soll Wissenschaft, Unternehmen, Hochschulen, Forschung und Gründungen stärker miteinander verbinden. Forschungsergebnisse sollen häufiger in Anwendungen, neue Unternehmen und zusätzliche Arbeitsplätze münden.",
    points: ["Leipziger Wissenschafts- und Wirtschaftsdialog", "bessere Verbindungen zwischen Forschung und Unternehmen", "stärkere internationale Vernetzung von Wissenschaft und Wirtschaft"]
  },
  {
    number: "02",
    title: "Eine Stadt, die möglich macht",
    text: "Verwaltung soll für Bürgerinnen und Bürger sowie Unternehmen einfacher und nachvollziehbarer funktionieren. Zuständigkeiten, Bearbeitungsstände und nächste Schritte sollen klarer erkennbar sein.",
    points: ["häufig genutzte Leistungen vollständig digital ermöglichen", "Bearbeitungsstände nachvollziehbarer machen", "klare Koordination bei ämterübergreifenden Anliegen"]
  },
  {
    number: "03",
    title: "Solide Finanzen",
    text: "Die finanzielle Handlungsfähigkeit der Stadt ist die Voraussetzung dafür, Infrastruktur, Bildung und öffentliche Angebote langfristig verlässlich finanzieren zu können.",
    points: ["strukturelle Fehlbeträge reduzieren", "Investitionen nachvollziehbar priorisieren", "finanzielle Risiken und Fortschritte transparent darstellen"]
  },
  {
    number: "04",
    title: "Mobilität: Das UND zählt",
    text: "Zu Fuß, mit dem Rad, mit Bus und Bahn oder mit dem Auto: Leipzig soll unterschiedliche Mobilitätsformen miteinander verbinden und Erreichbarkeit erhalten.",
    points: ["bessere Baustellenkoordination", "sichere Fuß- und Radverbindungen", "Wirtschaftsverkehr und Erreichbarkeit berücksichtigen"]
  },
  {
    number: "05",
    title: "Bildung & Familien",
    text: "Kinder brauchen gute Lernbedingungen und Familien einen Alltag, auf den sie sich verlassen können. Leipzig trägt Verantwortung für Schulgebäude, Betreuung, sichere Wege und ergänzende Bildungsangebote.",
    points: ["Schulbau und Sanierung nachvollziehbar priorisieren", "Kooperationen zwischen Schulen und Hochschulen ausbauen", "erkannte Gefahrenstellen auf Schulwegen angehen"]
  },
  {
    number: "06",
    title: "Wohnen",
    text: "Zusätzlicher Wohnraum soll durch Neubau, Nachverdichtung, Aufstockungen und die Nutzung vorhandener Gebäude entstehen. Gleichzeitig sollen kommunale Planungs- und Genehmigungsprozesse verlässlicher werden.",
    points: ["zusätzliche geeignete Flächen entwickeln", "höhergeschossiges Bauen an geeigneten Standorten prüfen", "Planungs- und Genehmigungszeiten reduzieren"]
  },
  {
    number: "07",
    title: "Öffentlicher Raum & Sicherheit",
    text: "Straßen, Plätze, Parks und Wege sollen gepflegt, gut beleuchtet und für alle nutzbar sein. Probleme und Verbesserungsvorschläge sollen einfacher gemeldet und ihre Bearbeitung nachvollzogen werden können.",
    points: ["Mängelmelder weiterentwickeln", "wiederkehrende Probleme systematisch bearbeiten", "sichtbarer und ansprechbarer Stadtordnungsdienst"]
  },
  {
    number: "Leipzig vor Ort",
    title: "Stadtteile ernst nehmen. Ideen sichtbar machen.",
    text: "Politik und Verwaltung sollen regelmäßig vor Ort sein. Anliegen aus den Stadtteilen sollen dokumentiert und weiterverfolgt werden. Bürgerideen sollen einen nachvollziehbaren Weg zur fachlichen Prüfung erhalten.",
    points: ["regelmäßige Stadtteilläufe", "offene Ideenrunden", "Format „Der Oberbürgermeister hat eine Frage“"],
    accent: true
  }
];

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function renderProgramImage({ src = null, alt = "", placeholderLabel, note = "" }) {
  if (src) {
    if (!alt) throw new Error("ProgramImage benötigt bei src einen alt-Text.");
    return `<img class="program-image" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`;
  }
  return `
    <div class="program-image-placeholder" role="img" aria-label="${escapeHtml(placeholderLabel)}">
      <span>${escapeHtml(placeholderLabel)}</span>
      ${note ? `<small>${escapeHtml(note)}</small>` : ""}
    </div>`;
}

function renderProgressBox(items) {
  if (!items) return "";
  return `
    <aside class="progress-box" aria-label="Woran Fortschritt erkennbar wird">
      <p>Woran Fortschritt erkennbar wird</p>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </aside>`;
}

function renderTopic(topic) {
  return `
    <article class="program-topic" id="${topic.id}" aria-labelledby="${topic.id}-title">
      <div class="topic-index">
        <span>${topic.number}</span>
        <p>${escapeHtml(topic.kicker)}</p>
      </div>
      <div class="topic-content">
        <h3 id="${topic.id}-title">${escapeHtml(topic.title)}</h3>
        <p class="topic-description">${escapeHtml(topic.description)}</p>
        <h4>Was konkret vorgesehen ist</h4>
        <ul class="topic-points">${topic.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
        ${renderProgressBox(topic.progress)}
      </div>
    </article>`;
}

document.querySelectorAll("[data-program-image]").forEach((slot) => {
  slot.innerHTML = renderProgramImage({
    placeholderLabel: slot.dataset.label,
    note: slot.dataset.note || ""
  });
});

document.querySelector("[data-program-nav]").innerHTML = programTopics
  .map((topic) => `<a href="#${topic.id}">${escapeHtml(topic.navTitle)}</a>`)
  .join("");

document.querySelector("[data-highlight-grid]").innerHTML = programHighlights
  .map((card) => `
    <article class="highlight-card${card.accent ? " highlight-card-accent" : ""}">
      <span>${escapeHtml(card.number)}</span>
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.text)}</p>
      <ul>${card.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>`)
  .join("");

const topicMarkup = [];
programTopics.forEach((topic, index) => {
  if (index === 7) {
    topicMarkup.push(`
      <div class="topic-image-break">
        ${renderProgramImage({ placeholderLabel: "Leipziger Stadtteil / öffentlicher Raum" })}
      </div>`);
  }
  if (index === 11) {
    topicMarkup.push(`
      <div class="topic-image-break topic-image-break-people">
        ${renderProgramImage({ placeholderLabel: "Getu im Gespräch / Stadtteil / Menschen" })}
      </div>`);
  }
  topicMarkup.push(renderTopic(topic));
});
document.querySelector("[data-topic-list]").innerHTML = topicMarkup.join("");

if (PROGRAM_PDF_URL) {
  document.querySelector("[data-program-download]").innerHTML = `
    <a class="button" href="${escapeHtml(PROGRAM_PDF_URL)}" target="_blank" rel="noopener noreferrer">
      Vollständiges Wahlprogramm herunterladen
    </a>`;
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".highlight-card, .program-topic, .editorial-break, .topic-image-break")
  .forEach((element) => revealObserver.observe(element));
