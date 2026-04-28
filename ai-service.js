export class AIService {
  constructor(dataUtils) {
    this.dataUtils = dataUtils;

    // ─── Configuration API (optionnel) ───────────────────────────────────────
    this.apiKey = "";
    this.apiUrl = "https://api.openai.com/v1/chat/completions";
    this.apiModel = "gpt-4o-mini";

    // Mots interdits
    this.forbiddenWords = [
      "suicide", "mourir", "mort", "tuer", "violence",
      "sang", "dépression sévère", "automutilation"
    ];
  }

  async generateEncouragement(i, h, e, s = 2) {
    if (this.apiKey) {
      try {
        const aiMessage = await this._callRealAI(i, h, e, s);
        if (this._isSafe(aiMessage)) return aiMessage;
      } catch (err) {
        console.error("[AIService] Erreur API, basculement local :", err);
      }
    }
    return this._generateProceduralEncouragement(i, h, e, s);
  }

  async _callRealAI(i, h, e, s = 2) {
    const socialDesc = s <= 1 ? "isolée" : s >= 3 ? "bien entourée" : "liens corrects";
    const systemPrompt = `Tu es une amie virtuelle.
Génère UNE SEULE phrase d'encouragement très courte (10 mots max).
Ton but : remonter le moral de façon naturelle, sans grands discours ni clichés.
Centres d'intérêt possibles : cirque (équilibre sur les mains), féminisme, lecture.
Scores du jour (0 = bas, 4 = haut) : Intellect ${i}/4, Humour ${h}/4, Énergie ${e}/4, Liens sociaux ${s}/4 (${socialDesc}).`;

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.apiModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Mon encouragement du jour ?" }
        ],
        max_tokens: 30,
        temperature: 0.8
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  _isSafe(text) {
    const lower = text.toLowerCase();
    return !this.forbiddenWords.some(w => lower.includes(w));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GÉNÉRATEUR PROCÉDURAL LOCAL - ÉNERGIE TOUJOURS PRISE EN COMPTE
  // ═══════════════════════════════════════════════════════════════════════════

  _generateProceduralEncouragement(i, h, e, s = 2) {
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    // TOUCHE SOCIALE : uniquement pour les cas extrêmes (isolement total ou liens exceptionnels)
    // Discret — une courte incise, pas une deuxième phrase.
    const socialNote = s === 0
      ? pick([
          " Prends soin de toi.",
          " Tu comptes, même de loin.",
          ""
        ])
      : s === 4
      ? pick([
          " Tes proches sont une vraie chance.",
          "",
          ""
        ])
      : "";


    // 1. ÉNERGIE TRÈS BASSE (e <= 1)
    // Ici l'énergie dicte tout, peu importe le reste.
    if (e <= 1) {
      if (h >= 3) {
        return pick([
          "Le corps lâche, mais l'humour reste. Le mien aussi disparaît parfois, et il revient toujours.",
          "Épuisée, mais toujours prête à lancer une vanne. Garde ça.",
          "Ton autodérision est intacte malgré cette fatigue. La mienne, elle prend des congés sans prévenir.",
          "Fatiguée mais drôle. C'est mon combo préféré chez les gens."
        ]) + socialNote;
      }
      if (i >= 3) {
        return pick([
          "L'esprit tourne à 100 dans un corps à 0%. Je connais bien cet état. Dors.",
          "Tu analyses tout, même ta propre fatigue. Mets le cerveau sur pause, il sera encore là demain.",
          "Fatiguée mais lucide. Honnêtement, c'est mon état préféré pour lire."
        ]) + socialNote;
      }
      // Fatigue totale (i et h bas aussi)
      return pick([
        "Batteries à plat. La seule acrobatie permise aujourd'hui est de s'allonger.",
        "Zéro énergie, et c'est très bien. Tu as le droit d'être à vide, je le suis presque tout le temps.",
        "Le monde attendra. Ta seule mission ce soir : te reposer vraiment.",
        "Même les plus fortes s'effondrent sur le canapé parfois. Je valide complètement.",
        "Aujourd'hui tu survis, et c'est déjà beaucoup. Je dis ça sans ironie."
      ]) + socialNote;
    }

    // 2. ÉNERGIE DÉBORDANTE (e >= 3)
    if (e >= 3) {
      if (i <= 1 && h <= 1) {
        return pick([
          "L'énergie est là, mais l'humeur coince. Va marcher sur les mains pour décompresser.",
          "Pleine d'énergie mais l'esprit brouillé. Une bonne séance de sport réglera ça.",
          "Tu es une pile électrique frustrée. Canalise ça dans le mouvement."
        ]) + socialNote;
      }
      if (i >= 3 && h <= 1) {
        return pick([
          "Énergique et redoutablement sérieuse. Le patriarcat n'a qu'à bien se tenir.",
          "Une efficacité glaciale aujourd'hui. Rien ne t'arrête.",
          "Tu es là pour accomplir des choses, avec une force incroyable."
        ]) + socialNote;
      }
      if (i >= 3 && h >= 3) {
        return pick([
          "Intelligente, drôle, pleine d'énergie. L'univers est à toi aujourd'hui.",
          "Tu as craqué le code de la journée parfaite. Savoure chaque instant.",
          "Avec cette forme, tu pourrais lire, faire le poirier et refaire le monde en même temps."
        ]) + socialNote;
      }
      // Énergie haute mais i/h moyens
      return pick([
        "Une belle vitalité aujourd'hui ! Sers-t'en pour faire ce qui te plaît vraiment.",
        "L'énergie est au rendez-vous. Ne la gâche pas en corvées inutiles.",
        "Tu as la force de soulever des montagnes, ou juste de passer une super journée."
      ]) + socialNote;
    }

    // 3. ÉNERGIE MOYENNE (e = 2)
    // Ici on se concentre plus sur l'intellect et l'humour, car l'énergie n'est ni un problème ni un atout majeur.
    if (i <= 1 && h <= 1) {
      return pick([
        "L'énergie est là mais l'humeur est grise. Je connais bien cet entre-deux. Prends un bon bouquin.",
        "Journée brouillon sans éclat. Tu as le droit de te sentir en décalage, moi aussi ça m'arrive.",
        "Ni trop fatiguée, ni vraiment là. Je connais bien cet état. Lâche la pression."
      ]) + socialNote;
    }
    if (h >= 3 && i <= 1) {
      return pick([
        "Ton sens de l'humour te sauve toujours des journées compliquées.",
        "Tu ne saisis peut-être pas tout aujourd'hui, mais tu sais en rire. C'est un vrai talent.",
        "L'autodérision est une arme massive. Tu la manies à la perfection."
      ]) + socialNote;
    }
    if (i >= 3 && h <= 1) {
      return pick([
        "Ton esprit est une lame bien aiguisée aujourd'hui. Sers-t'en bien.",
        "La réflexion est là. Tu bâtis des choses solides, même sans bruit.",
        "Ton intelligence silencieuse est ta plus grande force."
      ]) + socialNote;
    }
    if (i === 2 && h === 2) {
      return pick([
        "Ni au fond du trou, ni sur le toit du monde. Juste toi. C'est souvent là que les meilleures choses se passent.",
        "Une journée tiède. Moi j'adore ça, c'est reposant.",
        "Tu navigues au milieu, tranquille. Continue comme ça."
      ]) + socialNote;
    }
    
    // Fallback de sécurité
    return pick([
      "Tu fais de ton mieux avec ce que tu as aujourd'hui. C'est parfait.",
      "Chaque jour est différent, l'important c'est de continuer à avancer.",
      "Tu trouves ton équilibre petit à petit. Sois indulgente avec toi-même."
    ]) + socialNote;
  }
}
