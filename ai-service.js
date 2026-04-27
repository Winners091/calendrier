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

  async generateEncouragement(i, h, e) {
    if (this.apiKey) {
      try {
        const aiMessage = await this._callRealAI(i, h, e);
        if (this._isSafe(aiMessage)) return aiMessage;
      } catch (err) {
        console.error("[AIService] Erreur API, basculement local :", err);
      }
    }
    return this._generateProceduralEncouragement(i, h, e);
  }

  async _callRealAI(i, h, e) {
    const systemPrompt = `Tu es une amie virtuelle.
Génère UNE SEULE phrase d'encouragement très courte (10 mots max).
Ton but : remonter le moral de façon naturelle, sans grands discours ni clichés.
Centres d'intérêt possibles : cirque (équilibre sur les mains), féminisme, lecture.
Scores du jour (0 = bas, 4 = haut) : Intellect ${i}/4, Humour ${h}/4, Énergie ${e}/4.`;

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

  _generateProceduralEncouragement(i, h, e) {
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    // 1. ÉNERGIE TRÈS BASSE (e <= 1)
    // Ici l'énergie dicte tout, peu importe le reste.
    if (e <= 1) {
      if (h >= 3) {
        return pick([
          "Le corps lâche, mais l'humour reste. Quelle belle résilience.",
          "Épuisée, mais toujours prête à lancer une vanne. Garde ça.",
          "Ton autodérision est intacte malgré cette fatigue écrasante."
        ]);
      }
      if (i >= 3) {
        return pick([
          "L'esprit tourne à 100 à l'heure dans un corps à 0%. Dors.",
          "Tu analyses tout, même ta propre fatigue. Mets le cerveau sur pause.",
          "Fatiguée mais lucide. Un bon livre et au lit, tu as fait ta part."
        ]);
      }
      // Fatigue totale (i et h bas aussi)
      return pick([
        "Batteries à plat. La seule acrobatie permise aujourd'hui est de s'allonger.",
        "Zéro énergie, et c'est très bien. Tu as le droit d'être à vide.",
        "Le monde attendra. Ta seule mission ce soir : te reposer vraiment.",
        "Même les plus fortes finissent par s'effondrer sur le canapé. Profites-en."
      ]);
    }

    // 2. ÉNERGIE DÉBORDANTE (e >= 3)
    if (e >= 3) {
      if (i <= 1 && h <= 1) {
        return pick([
          "L'énergie est là, mais l'humeur coince. Va marcher sur les mains pour décompresser.",
          "Pleine d'énergie mais l'esprit brouillé. Une bonne séance de sport réglera ça.",
          "Tu es une pile électrique frustrée. Canalise ça dans le mouvement."
        ]);
      }
      if (i >= 3 && h <= 1) {
        return pick([
          "Énergique et redoutablement sérieuse. Le patriarcat n'a qu'à bien se tenir.",
          "Une efficacité glaciale aujourd'hui. Rien ne t'arrête.",
          "Tu es là pour accomplir des choses, avec une force incroyable."
        ]);
      }
      if (i >= 3 && h >= 3) {
        return pick([
          "Intelligente, drôle, pleine d'énergie. L'univers est à toi aujourd'hui.",
          "Tu as craqué le code de la journée parfaite. Savoure chaque instant.",
          "Avec cette forme, tu pourrais lire, faire le poirier et refaire le monde en même temps."
        ]);
      }
      // Énergie haute mais i/h moyens
      return pick([
        "Une belle vitalité aujourd'hui ! Sers-t'en pour faire ce qui te plaît vraiment.",
        "L'énergie est au rendez-vous. Ne la gâche pas en corvées inutiles.",
        "Tu as la force de soulever des montagnes, ou juste de passer une super journée."
      ]);
    }

    // 3. ÉNERGIE MOYENNE (e = 2)
    // Ici on se concentre plus sur l'intellect et l'humour, car l'énergie n'est ni un problème ni un atout majeur.
    if (i <= 1 && h <= 1) {
      return pick([
        "L'énergie est normale, mais l'humeur est grise. Prends un bon bouquin et déconnecte.",
        "Journée brouillon sans éclat. Tu as le droit de te sentir en décalage.",
        "Ni trop fatiguée, ni vraiment là. Lâche la pression pour ce soir."
      ]);
    }
    if (h >= 3 && i <= 1) {
      return pick([
        "Ton sens de l'humour te sauve toujours des journées compliquées.",
        "Tu ne saisis peut-être pas tout aujourd'hui, mais tu sais en rire.",
        "L'autodérision est une arme massive. Tu la manies à la perfection."
      ]);
    }
    if (i >= 3 && h <= 1) {
      return pick([
        "Ton esprit est une lame bien aiguisée aujourd'hui. Sers-t'en bien.",
        "La réflexion est là. Tu bâtis des choses solides, même sans bruit.",
        "Ton intelligence silencieuse est ta plus grande force."
      ]);
    }
    if (i === 2 && h === 2) {
      return pick([
        "L'équilibre parfait de la normalité. C'est reposant, une journée sans vagues.",
        "Tu n'es ni au fond du trou, ni sur le toit du monde. Juste toi.",
        "Une belle journée tiède, comme une bonne tasse de thé. Profites-en."
      ]);
    }
    
    // Fallback de sécurité (normalement inatteignable avec les conditions au-dessus)
    return pick([
      "Tu fais de ton mieux avec ce que tu as aujourd'hui. C'est parfait.",
      "Chaque jour est différent, l'important c'est de continuer à avancer.",
      "Tu trouves ton équilibre petit à petit. Sois indulgente avec toi-même."
    ]);
  }
}
