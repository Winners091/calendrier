export class AIService {
  constructor(dataUtils) {
    this.dataUtils = dataUtils;

    // ─── Configuration API (optionnel) ───────────────────────────────────────
    // Remplir cette clé pour activer la génération via OpenAI.
    // ATTENTION : ne jamais committer une vraie clé dans un dépôt public.
    this.apiKey = "";
    this.apiUrl = "https://api.openai.com/v1/chat/completions";
    this.apiModel = "gpt-4o-mini";
    // ─────────────────────────────────────────────────────────────────────────

    // Mots interdits — garde-fou pour les réponses API
    this.forbiddenWords = [
      "suicide", "mourir", "mort", "tuer", "violence",
      "sang", "dépression sévère", "automutilation"
    ];
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // POINT D'ENTRÉE PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Génère un encouragement personnalisé.
   * @param {number} i  Intellect (0–4)
   * @param {number} h  Humour (0–4)
   * @param {number} e  Énergie (0–4)
   * @returns {Promise<string>}
   */
  async generateEncouragement(i, h, e) {
    if (this.apiKey) {
      try {
        const aiMessage = await this._callRealAI(i, h, e);
        if (this._isSafe(aiMessage)) return aiMessage;
        console.warn("[AIService] Message IA rejeté par le filtre. Basculement local.");
      } catch (err) {
        console.error("[AIService] Erreur API, basculement local :", err);
      }
    }
    return this._generateProceduralEncouragement(i, h, e);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // APPEL API LLM (optionnel)
  // ═══════════════════════════════════════════════════════════════════════════

  async _callRealAI(i, h, e) {
    const systemPrompt = `Tu es une amie virtuelle bienveillante mais franchement taquine.
Génère UNE SEULE phrase d'encouragement (15 mots max).
Ton ton : direct, pas mièvre, légèrement sarcastique mais jamais blessant.
Scores du jour (0 = très bas, 4 = excellent) :
- Intellect : ${i}/4
- Humour : ${h}/4
- Énergie : ${e}/4
Adapte ta phrase à ces scores. Sois drôle si l'humour est haut, compatissante si l'énergie est basse.`;

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
        max_tokens: 60,
        temperature: 0.85
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FILTRE DE SÉCURITÉ
  // ═══════════════════════════════════════════════════════════════════════════

  _isSafe(text) {
    const lower = text.toLowerCase();
    return !this.forbiddenWords.some(w => lower.includes(w));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GÉNÉRATEUR PROCÉDURAL LOCAL
  // Produit des centaines de combinaisons différentes selon les 3 scores.
  // ═══════════════════════════════════════════════════════════════════════════

  _generateProceduralEncouragement(i, h, e) {
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const cat  = this.dataUtils.getCategory(i, h);

    // ── Banques de fragments ──────────────────────────────────────────────

    // A. Observation sur l'énergie
    const energyObs = {
      0: [
        "L'énergie est en mode hibernation totale.",
        "Tu as l'entrain d'une huître un dimanche soir.",
        "Même tes cellules ont l'air fatiguées.",
        "Niveau batterie : 2 %. Brancher dès que possible.",
        "Si l'énergie était un feu, là c'est juste une braise humide."
      ],
      1: [
        "L'énergie est en service minimum.",
        "Tu tournes au ralenti, mais tu tournes.",
        "Mode économie d'énergie activé.",
        "Pas au top, mais pas à plat non plus."
      ],
      2: [
        "Énergie correcte, ni molle ni survoltée.",
        "Tu survis, c'est déjà respectable.",
        "Journée banale sur le front de la fatigue.",
        "Ni épuisée ni pétillante. La moyenne, quoi."
      ],
      3: [
        "Plutôt en forme aujourd'hui.",
        "L'énergie est là, c'est une bonne nouvelle.",
        "Tu pourrais presque faire quelque chose d'utile."
      ],
      4: [
        "Tu as mangé des piles au petit-déjeuner ?",
        "Avec cette énergie, calme-toi un peu.",
        "Tu pourrais alimenter une petite ville.",
        "Trop d'énergie, c'est presque suspect."
      ]
    };

    // B. Observation sur l'intellect + humour (combinée)
    const brainHumorObs = (() => {
      if (i <= 1 && h <= 1) return [
        "Le cerveau a pris des RTT et l'humour est resté au lit.",
        "Ni génie ni comique aujourd'hui. Journée de transition.",
        "On ne peut pas être brillante ET drôle tous les jours. Aujourd'hui, ni l'un ni l'autre.",
        "Cerveau en veille, humour introuvable. C'est pas glorieux, mais ça arrive."
      ];
      if (i >= 3 && h >= 3) return [
        "Génie ET drôle le même jour ? Laisse-en un peu aux autres.",
        "Cerveau en ébullition et blagues au top. Tu es insupportable de perfection.",
        "Tu as piraté le système aujourd'hui.",
        "Intelligente et drôle simultanément, c'est presque énervant."
      ];
      if (i <= 1 && h >= 3) return [
        "Tu compenses tes neurones fatigués par un humour de qualité.",
        "Pas très futée aujourd'hui, mais au moins tu fais rire.",
        "L'intelligence a fui, mais la comédie te sauve.",
        "Se sentir bête et faire rire tout le monde : c'est du talent, en fait."
      ];
      if (i >= 3 && h <= 1) return [
        "Tu as tout compris, mais tu as oublié de sourire.",
        "Cerveau à 100 %, capital sympathie à 0.",
        "Trop occupée à être intelligente pour faire des blagues.",
        "Grande clarté d'esprit, humour introuvable. On ne peut pas tout avoir."
      ];
      if (i === 2 && h === 2) return [
        "Ton cerveau fait le minimum syndical, et c'est OK.",
        "Rien de transcendant, mais rien de catastrophique non plus.",
        "Journée 50/50. C'est honnête.",
        "Ni génie ni bouffonne. Une version confort de toi-même."
      ];
      if (h > i) return [
        "Plus drôle que futée aujourd'hui. La comédie compense.",
        "L'humour prend le dessus sur la réflexion. Bonne stratégie de survie.",
        "Tu réfléchis moins, mais tu fais plus rire. Équilibre discutable, mais équilibre quand même."
      ];
      return [
        "Plus futée que drôle aujourd'hui. Le sérieux a ses mérites.",
        "Cerveau actif, humour en retrait. Mode analytique.",
        "Tu penses trop vite pour faire de bonnes blagues. Les autres suivent à peine."
      ];
    })();

    // C. Conclusion selon la catégorie globale
    const conclusions = {
      red: [
        "Mais bon, on t'aime bien quand même.",
        "Allez, demain tu seras peut-être moins nulle. Ou pas.",
        "Bois de l'eau, va dormir, et arrête de te juger.",
        "Survis à cette journée. On fera les comptes plus tard.",
        "Même les plantes vertes ont des jours sans.",
        "Repose-toi. Le monde tournera sans tes fulgurances aujourd'hui.",
        "C'est pas la fin du monde, juste une journée à oublier.",
        "Tiens le coup. C'est tout ce qu'on te demande.",
        "Un jour nul ne résume pas qui tu es. Heureusement."
      ],
      gray: [
        "Journée grise, mais tu es là. C'est déjà quelque chose.",
        "Le néant, c'est reposant parfois.",
        "Ni bien ni mal. C'est une journée, pas un verdict.",
        "Continue. Même à vitesse réduite.",
        "La neutralité, c'est sous-côté comme état d'esprit."
      ],
      amber: [
        "Drôle mais bête, c'est un charme particulier.",
        "Tu fais rire les gens sans trop savoir pourquoi. C'est un don.",
        "Continue comme ça, ou presque.",
        "Ne prends pas trop la grosse tête non plus."
      ],
      purple: [
        "Intelligente mais pas drôle aujourd'hui. Les gens te respectent, au moins.",
        "Sérieuse et efficace. Pas la plus fun, mais la plus fiable.",
        "Continue comme ça, ou presque.",
        "Bravo, tu as gagné le droit de te la péter un peu."
      ],
      teal: [
        "Profite, ça ne durera pas éternellement.",
        "Ne prends pas trop la grosse tête non plus.",
        "Bravo, tu as gagné le droit de te la péter un peu.",
        "Continue comme ça, ou presque.",
        "L'univers abuse un peu avec toi aujourd'hui."
      ]
    };

    // ── Construction de la phrase ─────────────────────────────────────────

    // On choisit le niveau d'énergie le plus proche
    const eLevel = Math.round(Math.max(0, Math.min(4, e)));
    const energyPart   = pick(energyObs[eLevel]);
    const brainPart    = pick(brainHumorObs);
    const conclusionPart = pick(conclusions[cat] || conclusions.gray);

    // Assemblage : on varie la structure pour éviter la répétition
    const structures = [
      `${energyPart} ${brainPart} ${conclusionPart}`,
      `${brainPart} ${energyPart} ${conclusionPart}`,
      `${energyPart} ${conclusionPart}`,
      `${brainPart} ${conclusionPart}`
    ];

    // On favorise la structure complète (3 parties) mais on varie parfois
    const weights = [0.4, 0.3, 0.15, 0.15];
    const rand = Math.random();
    let cumul = 0;
    for (let s = 0; s < structures.length; s++) {
      cumul += weights[s];
      if (rand < cumul) return structures[s];
    }

    return structures[0];
  }
}
