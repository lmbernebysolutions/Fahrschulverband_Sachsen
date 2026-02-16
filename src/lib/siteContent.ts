/**
 * Statische Texte – Landesverband Sächsischer Fahrlehrer e.V.
 * Quelle: ECHTE_TEXTE.md – WORTWÖRTLICH, kein Lorem Ipsum
 */

export const siteContent = {
  // Navigation
  nav: {
    service: [
      { label: "Kontakt", href: "/kontakt" },
      { label: "Mitgliederbereich", href: "/mitgliederbereich" },
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
    main: [
      {
        label: "Der Verband",
        href: "/der-verband/ueber-uns",
        children: [
          { label: "Über uns", href: "/der-verband/ueber-uns" },
          { label: "Vorstand/Geschäftsstelle", href: "/der-verband/vorstand-geschaeftsstelle" },
          { label: "Mitgliedschaft", href: "/der-verband/mitgliedschaft" },
        ],
      },
      {
        label: "Für Fahrschulen",
        href: "/fuer-fahrschulen",
        children: [
          { label: "Übersicht", href: "/fuer-fahrschulen" },
          {
            label: "Termine Fortbildung",
            href: "/fuer-fahrschulen/termine-fortbildung",
          },
          { label: "Stellenangebote", href: "/fuer-fahrschulen/stellenangebote" },
          { label: "Fahrschulmarkt", href: "/fuer-fahrschulen/fahrschulmarkt" },
        ],
      },
      {
        label: "Für Fahrschüler",
        href: "/fuer-fahrschueler/fahrschulsuche",
        children: [
          { label: "Fahrschulsuche", href: "/fuer-fahrschueler/fahrschulsuche" },
          {
            label: "Berufskraftfahrer",
            href: "/fuer-fahrschueler/berufskraftfahrer",
          },
          {
            label: "Aufbauseminare",
            href: "/fuer-fahrschueler/aufbauseminare",
          },
          {
            label: "Mobil ohne Angst",
            href: "/fuer-fahrschueler/mobil-ohne-angst",
          },
          {
            label: "Fahreignungsseminare",
            href: "/fuer-fahrschueler/fahreignungsseminare",
          },
          {
            label: "Behindertenausbildung",
            href: "/fuer-fahrschueler/behindertenausbildung",
          },
        ],
      },
      { label: "Aktuelles", href: "/aktuelles" },
    ],
  },

  // Startseite
  home: {
    hero: {
      headline: "35 Jahre - Landesverband Sächsischer Fahrlehrer e.V.",
      text: "Sehr geehrte Mitglieder, sehr geehrte Partner, unsere nächste Mitgliederversammlung findet am 9. Mai 2026 im Atlanta Hotel Leipzig in Leipzig/Wachau statt. (www.atlanta-hotel.de) Wir möchten mit Ihnen das 35-jährige Bestehen des Landesverbandes Sächs. Fahrlehrer e. V. feiern. Alle Infos zu unserer Veranstaltung. Bitte planen Sie den Termin jetzt schon in ihren Terminkalender ein. Anmeldungen zum Rahmenprogramm und zu der Abendveranstaltung sind ab sofort möglich.",
    },
    intro: {
      headline:
        "Landesverband Sächsischer Fahrlehrer e.V. - Der Interessenverband für Fahrschulen und Fahrlehrer",
      text: "Herzlich willkommen beim Landesverband Sächsischer Fahrlehrer. Hier informieren wir unsere Mitglieder über aktuelle fachliche, rechtliche sowie übergeordnete Themen zum Berufstand des Fahrlehrers. Darüber hinaus erhalten Sie einen schnellen Überblick zu bevorstehenden Verbandsveranstaltungen und weiteren themenrelevanten Ereignissen. Bitte beachten Sie auch unsere vielfältigen Fortbildungsveranstaltungen, die wir für Mitglieder und andere Interessierte anbieten! Sie finden hier stets alle aktuellen Termine. Bei Interesse an einer Fortbildungsmaßnahme können Sie sich zudem schnell und bequem online anmelden.",
    },
    fahrschueler: {
      headline: "In einer Verbandsfahrschule sind Sie immer gut beraten",
      text: "Auch für Fahrschüler und Verkehrsteilnehmer lohnt sich ein Besuch unserer Internetseite. Neben interessanten Meldungen im Aktuelles-Bereich, bieten wir als besonderen Service eine zentrale Online-Fahrschulsuche sowie weitere Online-Suchen für speziellere Fahrschulprogramme, beispielsweise Berufskraftfahrer-Weiterbildung oder auch Behindertenausbildung, die von unseren Verbandsfahrschulen angeboten werden.",
      tiles: [
        "FAHRSCHULSUCHE",
        "BERUFSKRAFTFAHRER",
        "AUFBAUSEMINAR FAHRANFÄNGER",
        "MOBIL OHNE ANGST",
        "FAHREIGNUNGSSEMINARE",
        "BEHINDERTENAUSBILDUNG",
      ],
    },
  },

  // Footer
  footer: {
    contact: {
      name: "Landesverband Sächsischer Fahrlehrer e.V.",
      address: "Bernhardstr. 35, 01187 Dresden",
      phone: "0351 478 68-0",
      fax: "0351 478 68-12",
      email: "info@fahrlehrerverband-sachsen.de",
    },
    membershipCta: {
      headline: "Werden Sie Mitglied!",
      text: "Profitieren Sie von Fortbildungsangeboten, Rahmenverträgen und der starken Gemeinschaft.",
      buttonText: "Jetzt Mitglied werden",
    },
    copyright: "© 2026 Landesverband Sächs. Fahrlehrer e.V.",
  },

  // Über uns (echte Inhalte)
  ueberUns: {
    einleitung:
      "Der Landesverband Sächsischer Fahrlehrer e.V. wurde am 16.02.1991 in Dresden gegründet. Der Landesverband ist ein freiwilliger Zusammenschluss sächsischer Fahrlehrer. Als Landesverband vertreten wir die Interessen unserer Verbandsmitglieder gegenüber zuständigen Behörden und sonstigen öffentlichen Einrichtungen. Darüber hinaus betreiben wir allgemeine Öffentlichkeitsarbeit für den Berufstand des Fahrlehrers.",
    aufgaben: [
      "alle Fahrlehrer auf freiwilliger Basis zusammenschließen",
      "die Interessen und Belange der Verbandsmitglieder gegenüber den zuständigen Behörden vertreten",
      "aktiv einen Beitrag zur Erhöhung der Verkehrssicherheit durch eine gewissenhafte Fahrschulausbildung zu leisten",
      "die Forschungsvorhaben auf dem Gebiet der Verkehrssicherheit zu unterstützen und die Ergebnisse den Fahrlehrern zugänglich zu machen",
      "Erfahrungen, rechtliche und technische Neuerungen zu vermitteln",
      "die Aus- und Weiterbildung der Fahrlehrer zu fördern",
      "an der Weiterentwicklung des Berufsbildes mitzuwirken und durch stete Öffentlichkeitsarbeit die Bedeutung und das Ansehen des Fahrlehrerstandes zu mehren",
      "das kollegiale Zusammenwirken zu entwickeln und zu pflegen",
      "Organisationsformen zu entwickeln und zu fördern, die eine möglichst rationelle ordnungsmäßige Führung von Fahrschulbetrieben unterschiedlicher Größe erleichtern",
      "verbandliche Vor- und Fürsorge zur sozialen Sicherung seiner Mitglieder und deren Angehörigen anzuregen und zu verwirklichen",
      "Rechtsberatung für seine Mitglieder zu organisieren und zu unterstützen",
    ],
    aufgabenGruppen: [
      {
        titel: "Interessenvertretung & Gemeinschaft",
        items: [
          "alle Fahrlehrer auf freiwilliger Basis zusammenschließen",
          "die Interessen und Belange der Verbandsmitglieder gegenüber den zuständigen Behörden vertreten",
          "das kollegiale Zusammenwirken zu entwickeln und zu pflegen",
        ],
      },
      {
        titel: "Verkehrssicherheit & Ausbildung",
        items: [
          "aktiv einen Beitrag zur Erhöhung der Verkehrssicherheit durch eine gewissenhafte Fahrschulausbildung zu leisten",
          "die Forschungsvorhaben auf dem Gebiet der Verkehrssicherheit zu unterstützen und die Ergebnisse den Fahrlehrern zugänglich zu machen",
          "Erfahrungen, rechtliche und technische Neuerungen zu vermitteln",
          "die Aus- und Weiterbildung der Fahrlehrer zu fördern",
        ],
      },
      {
        titel: "Berufsstand & Betrieb",
        items: [
          "an der Weiterentwicklung des Berufsbildes mitzuwirken und durch stete Öffentlichkeitsarbeit die Bedeutung und das Ansehen des Fahrlehrerstandes zu mehren",
          "Organisationsformen zu entwickeln und zu fördern, die eine möglichst rationelle ordnungsmäßige Führung von Fahrschulbetrieben unterschiedlicher Größe erleichtern",
        ],
      },
      {
        titel: "Mitglieder & Unterstützung",
        items: [
          "verbandliche Vor- und Fürsorge zur sozialen Sicherung seiner Mitglieder und deren Angehörigen anzuregen und zu verwirklichen",
          "Rechtsberatung für seine Mitglieder zu organisieren und zu unterstützen",
        ],
      },
    ],
  },

  // Bezirks-/Kreisverbände
  bezirke: {
    einleitung:
      "Die Bezirks- und Kreisverbände unseres Landesverbandes. Kontaktdaten und Ansprechpartner. Der Landesverband Sächsischer Fahrlehrer e.V. ist nach Bezirks- und in Kreisverbänden strukturiert. Bitte klicken Sie auf den jeweiligen Bezirk, dann werden Ihnen die Ansprechpartner und Kontaktdaten der einzelnen Bezirks- und Kreisverbände angezeigt.",
  },

  // Arbeitskreise (echte Inhalte)
  arbeitskreise: {
    intro: "Die Arbeitskreise des Landesverbandes. Mit Erfahrung und Kompetenz. Im Landesverband Sächsischer Fahrlehrer bestehen vier Arbeitskreise, in denen engagierte Kollegen ehrenamtlich und ohne Vergütung mitarbeiten. Die Ziele der Arbeitskreise sind in erster Linie die Erhöhung der Verkehrssicherheit und eine möglichst perfekte Abstimmung unserer Arbeit im Bezug auf das genannte Ziel. Alle Arbeitskreise sprechen nach der entsprechenden Problembearbeitung Empfehlungen aus. Diese Empfehlungen werden sowohl an die Verbandsfahrlehrer, die Prüforganisation und an interessierte Gruppen weiter gegeben. Nichtverbandsfahrlehrer können nicht auf die Ergebnisse der Arbeitskreise zugreifen. Wir bitten um Verständnis dafür und laden auch Sie ein Verbandsfahrlehrer zu werden.",
    kreise: [
      {
        label: "Arbeitskreis Motorrad",
        text: "Hier erfahren Sie alle Hintergründe zu bestimmten Übungen, unfallrelevanten Ausbildungssituationen, gefährlichen Verhaltenssituationen und vieles mehr. Hier werden auch die Ergebnisse von Beratungen und Veranstaltungen bezüglich der Motorradausbildung für Sie aufbereitet.",
        leiter: "Bernd Körting",
        mobil: "0172 - 3 52 88 19",
      },
      {
        label: "Arbeitskreis LKW",
        text: "Der Arbeitskreis für die LKW-Spezialisten und solche die es werden möchten, beschäftigt sich mit dem Thema einer effizienten LKW-Ausbildung, der Verknüpfung mit sich verändernden Rechtsvorschriften und einer reibungslosen Umsetzung nach den gesetzlichen Prüfungsvorgaben. Darüber hinaus wird auch hier über die Ergebnisse der Beratungen und Veranstaltungen informiert.",
        leiter: "Rainer Dohle",
        mobil: "0177 - 7 77 27 61",
      },
      {
        label: "Arbeitskreis Fahrerlaubnisprüfung",
        text: "Dieser Arbeitskreis beschäftigt sich der Thematik Prüfung in Verbindung mit realen Fahranfängergefahren und deren speziellen Unfallgefahren. Dabei werden regionale und überregionale, gesetzliche Vorgaben, sowie wissenschaftliche Hypothesen untersucht und in entsprechende Empfehlungen eingearbeitet. Hier geht es natürlich auch um organisatorische Umsetzungsprobleme und deren Lösungserarbeitung.",
        leiter: "Peter Losleben",
        mobil: "0173 - 9 56 20 52",
      },
      {
        label: "Arbeitskreis Handicap-Ausbildung und Seniorenbetreuung",
        text: "Die Betreuung und Ausbildung von Menschen mit Handicap zum Erwerb oder zur Wiedererlangung der Fahrerlaubnis stellt an uns Fahrlehrer eine besonders hohe Verantwortung. Das beginnt bei der korrekten Beratung zur Beantragung des Führerscheines bis hin zur Durchführung von einfühlsamen Fahrstunden. Damit das Zusammenspiel zwischen Fahrlehrern, Medizinern, Psychologen, Behörden und Technikern auch im Freistaat Sachsen auf einem guten Niveau stattfindet, wurde der Arbeitskreis ins Leben gerufen. Gemeinsam, die Mediziner, die Reha Kliniken, die Fahrerlaubnisbehörden, die Technischen Prüfstellen sowie Vertreter der Fahrzeugindustrie und Fahrlehrer, wollen wir im Interesse der Bewerber optimale Schritte zur Feststellung der Fahreignung vorschlagen und festlegen. Schwerpunkte: Flyer „Mobil mit Behinderung“, Verantwortungsabgrenzung für Fahreignungsgutachten im Freistaat Sachsen.",
        leiter: "Falko Schurig",
        mobil: "0177 - 2 14 76 00",
      },
    ],
  },

  // Mitgliedschaft (echte Inhalte)
  mitgliedschaft: {
    intro: "Die Mitgliedschaft im Verband. In einer Verbandsfahrschule sind Sie immer gut beraten. Laut unserer Satzung können alle von der Behörde zugelassenen Fahrlehrer Mitglied des Verbandes werden. Der Antrag ist schriftlich zu stellen. Fördernde Mitglieder können alle natürlichen und juristischen Personen werden, die die Ziele des Verbandes anerkennen und unterstützen.",
    vorteile: [
      {
        title: "Informationen",
        text: "Mitglieder des Landesverbandes Sächsischer Fahrlehrer e.V. sind stets aktuell informiert. Sie erhalten monatlich die Fachzeitschrift „Fahrschule“, 4-mal im Jahr unsere „Fahrlehrer-Info“ für Sachsen und monatlich einen Newsletter per E-Mail. Bei Gesetzesänderungen versorgen wir unsere Mitglieder kostenlos mit der entsprechenden Fachliteratur. Die Mitglieder haben auch die Möglichkeit, sich jederzeit telefonisch Rat und Informationen einzuholen.",
      },
      {
        title: "Finanzielle Vorteile",
        text: "Weitere finanzielle Vorteile ergeben sich für die Verbandsmitglieder aus dem Gruppenversicherungsvertrag mit der Fahrlehrerversicherung sowie aus weiteren Rahmenverträgen.",
      },
    ],
    /** Bento-Grid: 4 Informations-Bausteine + Telefonische Beratung darunter */
    infoItems: [
      {
        title: "Fachzeitschrift „Fahrschule“",
        text: "Monatlich erhalten Sie die Fachzeitschrift „Fahrschule“ – Ihr fachliches Nachschlagewerk.",
      },
      {
        title: "Fahrlehrer-Info für Sachsen",
        text: "4-mal im Jahr informieren wir Sie mit unserer „Fahrlehrer-Info“ zu allen relevanten Themen für Sachsen.",
      },
      {
        title: "Newsletter",
        text: "Monatlich versenden wir einen Newsletter per E-Mail – aktuell und direkt in Ihr Postfach.",
      },
      {
        title: "Fachliteratur bei Gesetzesänderungen",
        text: "Bei Gesetzesänderungen versorgen wir unsere Mitglieder kostenlos mit der entsprechenden Fachliteratur.",
      },
    ],
    telefonischeBeratung: {
      title: "Telefonische Beratung",
      text: "Sie haben jederzeit die Möglichkeit, sich telefonisch Rat und Informationen einzuholen.",
    },
    finanzielleVorteile: {
      title: "Finanzielle Vorteile",
      text: "Weitere finanzielle Vorteile ergeben sich für die Verbandsmitglieder aus dem Gruppenversicherungsvertrag mit der Fahrlehrerversicherung sowie aus weiteren Rahmenverträgen.",
    },
    beitrag: {
      headline: "Beitrag",
      regeln: [
        "Neu aufgenommene Mitglieder haben eine Aufnahmegebühr zu entrichten.",
        "Der Beitrag ist jährlich im Voraus bis zum 1. Februar des laufenden Geschäftsjahres zu entrichten.",
        "Über die Höhe des Jahresbeitrages entscheidet die Mitgliederversammlung in jedem Jahr neu.",
      ],
      saetze: [
        { label: "Aufnahmegebühr", betrag: "25,00 EUR", hinweis: null },
        { label: "Fahrschulinhaber / verantwortliche Leiter", betrag: "304,00 EUR", hinweis: null },
        { label: "Angestellte Fahrlehrer", betrag: "189,00 EUR", hinweis: null },
        { label: "Angestellte Fahrlehrer (Fahrschulinhaber bereits Mitglied)", betrag: "135,84 EUR", hinweis: "ohne Fahrlehrer-Info und Zeitschrift „Fahrschule“" },
        { label: "Fahrlehrer in Ausbildung (FLiAusB)", betrag: "beitragsfrei", hinweis: "ohne Fahrlehrer-Info und Zeitschrift „Fahrschule“ – Kontakt zum Büro erforderlich" },
      ],
    },
    beitritt: {
      headline: "Haben wir Ihr Interesse geweckt?",
      text: "Dann freuen wir uns auf Ihre Mitgliedschaft. An dieser Stelle können Sie das Beitrittsformular im PDF-Format downloaden. Bitte füllen Sie es aus und schicken Sie es anschließend per FAX an: 0351 47868-12, per Post: Landesverband Sächsischer Fahrlehrer e.V., Bernhardstr. 35, 01187 Dresden, oder per Mail an: info@fahrlehrerverband-sachsen.de an uns zurück.",
      buttonText: "Beitrittserklärung Sächsischer Fahrlehrerverband (PDF)",
    },
  },

  // Vorstand
  vorstand: {
    headline: "Der Vorstand des Landesverbandes",
    subheadline: "Wir vertreten unsere Verbandsfahrschulen landesweit und öffentlichkeitswirksam",
    mitglieder: [
      { name: "Peter Losleben", funktion: "Vorsitzender", fahrschule: "Fahrschule Peter Losleben", adresse: "Postplatz 2a, 08280 Aue-Bad Schlema", mobil: "0173 9562052", slotId: "verband.vorstand.peter-losleben" as const },
      { name: "Christina Mansfeld", funktion: "1. Stellvertreterin", fahrschule: "Fahrschule Mansfeld – Christina Mansfeld", adresse: "Arthur-Hoffmann-Straße 89, 04275 Leipzig", mobil: "0172 5498504", slotId: "verband.vorstand.christina-mansfeld" as const },
      { name: "Falko Schurig", funktion: "2. Stellvertreter", fahrschule: "Fahrschule Falko Schurig", adresse: "Am Mühlberg 17, 09669 Frankenberg/S.", mobil: "0177 2147600", slotId: "verband.vorstand.falko-schurig" as const },
    ],
    geschaeftsstelle: {
      headline: "Die Geschäftsstelle",
      subheadline: "Wir sind für Sie da! Die Service- und Kontaktstelle des Landesverbandes",
      mitarbeiter: [
        { name: "Friederike Thomas", tel: "0351 478680", email: "F.Thomas@fahrlehrerverband-sachsen.de", aufgaben: ["Büroassistenz", "Empfangsbetreuung", "Betreuung Homepage"], slotId: "verband.geschaeftsstelle.friederike-thomas" as const },
        { name: "Ulrike Zschunke", tel: "0351 478680", email: "u.zschunke@fahrlehrerverband-sachsen.de", aufgaben: ["Mitgliederbetreuung", "Verkauf von Lehrmaterial", "Verbandsverwaltung", "Fahrlehrer-Info", "Fortbildung", "Landesagentur der Fahrlehrerversicherung"], slotId: "verband.geschaeftsstelle.ulrike-zschunke" as const },
      ],
      oeffnungszeiten: [
        { tag: "Montag", zeiten: "geschlossen" },
        { tag: "Dienstag", zeiten: "08:00 - 12:00 u. 13:00 - 16:00" },
        { tag: "Mittwoch", zeiten: "08:00 - 12:00 u. 13:00 - 16:00" },
        { tag: "Donnerstag", zeiten: "08:00 - 12:00 u. 13:00 - 16:00" },
        { tag: "Freitag", zeiten: "08:00 - 13:00" },
      ],
    },
  },

  // Satzung
  satzung: {
    headline: "Satzung des LSF e.V.",
    text: "Auf der außerordentlichen Mitgliederversammlung am 11.09.2025 in Meißen verabschiedeten die anwesenden Mitglieder die neue Satzung.",
    pdfUrl: "/documents/satzung.pdf",
  },

  // Angebote des Landesverbandes
  angebote: {
    headline: "Aktuelle Angebote des Landesverbandes",
    subheadline: "Profitieren Sie von den Vorteilen einer Mitgliedschaft",
    intro: "Eine Mitgliedschaft im Landesverband lohnt sich in vielerlei Hinsicht. So können Sie als Verbandsmitglied beispielsweise von speziellen Gruppenversicherungsverträgen oder günstigen Rahmenverträgen profitieren, die zwischen dem Verband und ausgesuchten Partnern bestehen. Darüber hinaus unterstützen wir unsere Mitglieder mit kostenlosen Informationsmaterialien und sonstigen Hilfsmaterialien. Nachfolgend erhalten Sie einen Überblick auf die aktuellen Angebote des Landesverbandes.",
    items: [
      {
        title: "Rahmenvertrag mit TOTAL",
        text: "Alle selbständig tätigen Fahrschulen des Landesverbandes Sächsische Fahrlehrer e.V. erhalten attraktive Nachlässe auf Kraftstoffe, Schmierstoffe und Autowäsche. Sowohl im Inland als auch Ausland bietet Ihnen die TOTAL-Tankkarte eine einfache bargeldlose und kostensparende Abwicklung Ihrer Betankungen. Somit bleibt Ihnen das Sammeln unnötiger Belege erspart!",
      },
      {
        title: "Fahrlehrer-Info für Sachsen",
        text: "Das Rundschreiben des Landesverbandes Sächsischer Fahrlehrer e.V. erscheint vierteljährlich und wird kostenlos an alle Mitglieder verschickt. Damit informieren wir aktuell zu allen die Fahrlehrerschaft betreffenden rechtlichen Änderungen und berichten über Aktivitäten und Veranstaltungen auf Landes- und Bundesebene. Erläuterungen und Handlungsempfehlungen sollen Sie in Ihrer Tätigkeit als Fahrlehrer bzw. Fahrschulinhaber unterstützen. Wichtige Urteile und der aktuelle Fortbildungskalender sind fester Bestandteil der Fahrlehrer-Info.",
      },
      {
        title: "Rahmenvertrag mit ORLEN Deutschland - star Tankstellen",
        text: "Die star Flottenkarte bietet die Möglichkeit des bargeldlosen Zahlens an knapp 550 teilnehmenden star Tankstellen von Schleswig-Holstein bis ins Rhein-Main Gebiet. In Zusammenarbeit mit dem Landesverband Sächsischer Fahrlehrer e.V. erhalten die Mitglieder exklusiv Top-Konditionen!",
      },
      {
        title: "Flottenkundenvertrag mit ATU",
        text: "Digital, bequem und nachhaltig - das ist ATU für Geschäftskunden. Als erfahrener Partner im Bereich Flottenlösungen unterstützen wir Sie mit maßgeschneiderten Komplettservices und digitalen Fuhrparklösungen bei den täglichen Aufgaben rund um die Verwaltung Ihrer Flotte. Als Vorreiter in den Bereichen E-Mobilität, Digitalisierung und Nachhaltigkeit sind wir der perfekte Partner für moderne Fuhrparkverwaltung - heute und in Zukunft.",
      },
      {
        title: "Kostenlose Informationen und Materialien",
        text: "Selbstverständlich unterstützen wir unsere Mitglieder auch mit kostenlosen Informationsmaterialien und anderen Hilfsmitteln. Wir weisen allerdings darauf hin, dass bestimmte Angebote nicht immer verfügbar sind und gegebenenfalls auch durch andere Artikel oder aus aktuellem Anlass ersetzt werden.",
      },
      {
        title: "Kostenloser Eintrag in der Online-Fahrschulsuche",
        text: "Nicht nur Verbandsmitglieder zählen zu den Besuchern unserer Internetseite. Auch angehende Fahrschüler, Verkehrsteilnehmer oder Unternehmen informieren sich auf der Internetseite des Landesverbandes. Speziell für diese Interessenten bieten wir eine sehr komfortable Online-Fahrschulsuche an. Als Verbandsmitglied können Sie sich mit Ihrem Fahrschulunternehmen kostenlos in dieser Online-Suche eintragen lassen.",
      },
    ],
  },

  // Fahrschul-Service GmbH
  fahrschulService: {
    headline: "Angebote der Fahrschul-Service GmbH",
    subheadline: "Lehr- und Werbematerialien",
    intro: "Auf dieser Seite erhalten Sie einen aktuellen Überblick über Info-, Lehr- und Werbematerialien, die Sie über die Fahrschul-Service GmbH erwerben können. Bei Interesse nutzen Sie bitte das Kontaktformular am Ende dieser Seite.",
    kontakt: {
      tel: "0351 478 68-66",
      fax: "0351 478 68-12",
      email: "info@fs-fahrschulservice.de",
    },
    hinweis: "Alle Preise inkl. Mehrwertsteuer, zuzüglich Porto und Verpackung! Sie haben Interesse an unseren Info-, Lehr- und Werbematerialien? Dann setzen Sie sich doch einfach persönlich mit uns in Verbindung oder Sie nutzen unser Kontaktformular.",
    produkte: [
      { name: "Verbandslogo \"Gut betreut\" 10x10 cm", details: "Aufkleber 0,50 EUR | Magnet 2,50 EUR" },
      { name: "Verbandslogo \"Gut betreut\" 16x16 cm", details: "Aufkleber 1,50 EUR | Magnet 8,20 EUR" },
      { name: "Verbandslogo \"Gut betreut\" 25x25 cm", details: "Aufkleber 2,50 EUR | Magnet 10,25 EUR" },
      { name: "ASF Seminarleiter Handbuch (Ringordner)", details: "69,55 EUR", stand: "07.2024" },
      { name: "Begleitheft ASF Format A4", details: "6,00 EUR/Stück", stand: "09.2023" },
      { name: "Verträge ASF (Vogel Verlag) 25 Stück", details: "18,80 EUR", nurMitglieder: true },
      { name: "Lernstandsdokumentation zur Schlüsselzahl B197 (25 Blatt)", details: "2,50 EUR", nurMitglieder: true },
      { name: "Testfahrt zum Erwerb der Schaltkompetenz (25 Blatt)", details: "2,50 EUR", nurMitglieder: true },
      { name: "Werbung \"Mitglied im Fahrlehrerverband\" 26,5x40 cm", details: "Tafel 13,20 EUR | Aufkleber 8,20 EUR" },
      { name: "Werbeschild \"Anfänger\"", details: "Aufkleber 1,00 EUR | Magnet 1,50 EUR" },
      { name: "DVD \"Grundfahraufgaben LKW\"", details: "14,28 EUR" },
      { name: "Werbung für FES Seminare (Plakat A2)", details: "15,50 EUR" },
      { name: "Fahrerlaubnis-Verordnung Broschüre Stand 01.2021", details: "im Set mit Anlage" },
      { name: "Anlage zur Fahrerlaubnis-Verordnung Stand 01.2021", details: "10,70 EUR" },
      { name: "Fahrschüler-Ausbildungsverordnung Broschüre Stand 2004", details: "5,35 EUR" },
    ],
  },

  // Stellenangebote
  stellenangebote: {
    headline: "Stellenangebote von Verbandsfahrschulen",
    intro: "Auf dieser Seite informieren wir Sie über aktuelle Stellenangebote, die unsere Verbandsfahrschulen anbieten.",
    cta: {
      headline: "Stellenangebot veröffentlichen",
      text: "Sie sind Mitglied und suchen neue Mitarbeiter? Senden Sie uns Ihr Stellenangebot inkl. Kontaktmöglichkeiten – wir veröffentlichen es hier.",
      email: "info@fahrlehrerverband-sachsen.de",
    },
    anzeigen: [
      { text: "Fahrschule „Am Reichenturm“ in Bautzen sucht ab sofort ein/e Fahrlehrer/in. Interessenten bitte melden unter 0176 - 52 23 17 22", stand: "September 2025" },
      { text: "Stellenangebot: Fahrlehrer/ Fahrlehrerin – Mehr als nur ein Job, eine Berufung! Standort: 08280 Aue-Bad Schlema. Arbeitszeit: Vollzeit/Teilzeit. Startdatum: zum baldigen Zeitpunkt.", stand: "September 2025", link: "#" },
      { text: "Die 1A Fahrschule in Leipzig und Schkeuditz sucht Unterstützung für ihr Team. Interessenten melden sich bitte unter 01567 8 67 87 06 oder per Email: Info@1aFahrschule.com", stand: "September 2025" },
      { text: "Fahrlehrer/in von Fahrschule in Dresden gesucht. Interessenten melden sich bitte unter 0351 - 2 52 74 28. Weitere Informationen unter: https://uwesfahrschule.de/fahrlehrer-werden/", stand: "September 2025" },
      { text: "Du bist Fahrlehrer/in Klasse BE oder möchtest es noch werden? Dann bist du bei der Xcarz Fahrschul GmbH genau richtig aufgehoben. Xcarz Fahrschul GmbH, Paunsdorfer Straße 30a, 04316 Leipzig. Per E-Mail: info@xcarz.de, Telefonisch: 0341 – 6516053. https://xcarz.de/jobangebote/", stand: "September 2025" },
    ],
  },
} as const;
