var data = {
  title: 'Alexander Von Humboldt Jeopardy',
  description:
    'Willkommen\n' +
    '1.\tJede Gruppe muss ein Thema auswӓhlen\n' +
    '2.\tDie Gruppe muss auf Frage antworten.\n' +
    '3.\tDie Gruppe, die mehr Fragen antworten, gewinnt',
  button: 'Spiel',
  player1: 'Spieler 1',
  player2: 'Spieler 2',
  points: 'punkte',
  turn: 'dran sein',
  winnerMessage: 'is the winner!',
  restartButton: 'play again',
  game: [
    {
      category: 'FAKTEN',
      questions: [
        {
          points: 100,
          question:
            'Mit wem war Alexander V.H. befreundet?',
          options: ['David Hume', 'Johann Wolfgang Goethe', 'Gottfried Wilhelm Leibniz', 'Jean Jacques Rousseau'],
          answer: 1
        },
        {
          points: 200,
          question:
            'Wer begleitete Alexander V.H. auf seiner Südamerikaneise?',
          options: ['Der Ureinwohner Freitag', 'Sein Bruder', 'Der Entdecker Marco Polo', 'Der Botaniker Aimé Bonpland'],
          answer: 3
        },
        {
          points: 300,
          question:
            'Wer hat finanziert Alexander V.H. Reise nach Amerika?',
          options: ['Er ebte nach dem Tod seiner Mutter', 'Er gewann in der königlichen Lotterie', 'Er bekam eine hohe Prämie für seine Entwicklung einer Grubenlampe', 'Er spekulierte geschicht mit Aktien'],
          answer: 0
        }
      ]
    },
    {
      category: 'LEBEN',
      questions: [
        {
          points: 100,
          question:
            'Wo und wann Alexander von Humboldt geboren wurde?',
          options: ['In Frankfurt, 14. September 1769', 'In Berlin, 14. September 1789', 'In Berlin, 14. Oktober 1769', 'In Berlin, 1. September 1769'],
          answer: 1
        },
        {
          points: 200,
          question:
            'Wo und wann Alexander von Humboldt gestorben ist',
          options: ['In Berlin, 6. Mai 1900', 'In Berlin, 6. Juli 1859', 'In Frankfurt, 6. Mai 1859', 'In Berlin, 6. Mai 1859'],
          answer: 3
        },
        {
          points: 300,
          question:
            'Welche amerikanischen Länder haben Sie während Ihrer Reise besucht?',
          options: ['Mexiko, Venezuela, Kolumbien, Ecuador, Peru, USA', 'Mexiko, Venezuela, Guatemala, Ecuador, Peru, USA', 'Argentinien, Venezuela, Kolumbien, Ecuador, Peru', 'Brassilien, Venezuela, Ecuador, Peru, USA'],
          answer: 0
        }
      ]
    },
    {
      category: 'ARBEIT',
      questions: [
        {
          points: 100,
          question:
            'Alexander von Humboldt schrieb en Gesamtschau der wissenschaftlichen Welterforschung. Unter welchem Title erschien das fünfbändige Werk?',
          options: ['Universum', 'All', 'Kosmo', 'Sphäre'],
          answer: 2
        },
        {
          points: 200,
          question:
            'Nach dem Studium verschidener Disziplinen arbeitete Alexander von humboldt zunächst im Staatsdienst. In welchem Bereich?',
          options: ['Recht', 'Medizin', 'Bergbau', 'Politik'],
          answer: 2
        },
        {
          points: 300,
          question:
            'In welchem der folgender Romane ist Alexander von Humboldt einer der Protagonisten?',
          options: ['Aldous Huxley: Schöne neue Welt', 'Daniel Defoe: Robinson Crusoe', 'Naomi J. Williams: Die letzten Entdecker', 'Daniel Kehlmann: Die Vermessung der Welt'],
          answer: 3
        }
      ]
    }
  ]
};
