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
  // GÉNÉRATEUR PROCÉDURAL LOCAL - CONDITIONS PRÉCISES
  // ═══════════════════════════════════════════════════════════════════════════

  _generateProceduralEncouragement(i, h, e) {
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    // 1. TOUT À ZÉRO (0-0-0) ou presque
    if (i <= 1 && h <= 1 && e <= 1) {
      return pick([
        "Le cerveau, le corps et le rire sont en pause. Autorise-toi ce silence.",
        "Même ton roman préféré serait trop lourd aujourd'hui. Ferme les yeux.",
        "Aucune énergie, aucune idée, et c'est très bien. Tu as le droit d'être à vide.",
        "Tu es littéralement à 0%. Brancher le chargeur et attendre demain.",
        "Le monde attendra. Ta seule mission ce soir : ne rien faire du tout.",
        "Même les plus grandes équilibristes finissent par s'allonger sur le tapis."
      ]);
    }

    // 2. FATIGUE MAIS HUMOUR INTACT (e <= 1, h >= 3)
    if (e <= 1 && h >= 3) {
      return pick([
        "Épuisée, mais toujours capable de lâcher une bonne vanne. Quel talent.",
        "Le corps ne suit plus, mais ton ironie est intacte. Garde ce bouclier.",
        "Faire rire alors qu'on tient à peine debout, c'est ta spécialité.",
        "Tu n'as plus la force de t'énerver, alors tu en ris. C'est brillant.",
        "Ton autodérision compense largement tes batteries à plat."
      ]);
    }

    // 3. FATIGUE MAIS CERVEAU QUI TOURNE (e <= 1, i >= 3)
    if (e <= 1 && i >= 3) {
      return pick([
        "Le corps dit stop, mais l'esprit continue d'analyser le monde.",
        "Tu es physiquement épuisée, mais tes idées sont toujours aussi claires.",
        "Laisse un peu ton cerveau se reposer avec le reste de ton corps.",
        "Ton esprit déconstruit encore le patriarcat pendant que tu t'effondres sur le canapé.",
        "Trop fatiguée pour agir, mais assez lucide pour tout comprendre."
      ]);
    }

    // 4. BEAUCOUP D'ÉNERGIE MAIS HUMEUR MAUSSADE (e >= 3, h <= 1, i <= 1)
    if (e >= 3 && h <= 1 && i <= 1) {
      return pick([
        "Tu as l'énergie de tout casser, mais pas l'envie de sourire. C'est un droit.",
        "Pleine d'énergie mais l'esprit embrumé. Va faire du sport, ça videra la tête.",
        "Tu es une pile électrique frustrée. Canalise ça dans quelque chose de physique.",
        "L'énergie est là, mais l'inspiration manque. Bouge, ça reviendra.",
        "Marche sur les mains, cours, saute. Épuise ce corps pour calmer la tête."
      ]);
    }

    // 5. TOUT VA BIEN MAIS ZÉRO HUMOUR (i >= 3, e >= 3, h <= 1)
    if (i >= 3 && e >= 3 && h <= 1) {
      return pick([
        "Tu es brillante et en forme, mais pas d'humeur à plaisanter. Redoutable.",
        "Une efficacité glaciale aujourd'hui. Rien ne t'arrête, pas même une blague.",
        "Le mode 'machine de guerre' est activé. Le fun attendra demain.",
        "Tu es là pour accomplir des choses, pas pour amuser la galerie.",
        "Intelligente, dynamique, sérieuse. Le patriarcat tremble."
      ]);
    }

    // 6. MOYEN PARTOUT (2-2-2)
    if (i === 2 && h === 2 && e === 2) {
      return pick([
        "L'équilibre parfait de la normalité. C'est reposant, une journée sans vagues.",
        "Tu n'es ni au fond du trou, ni sur le toit du monde. Juste toi.",
        "Une belle journée tiède, comme une bonne tasse de thé. Profites-en.",
        "Rien à signaler, et c'est une excellente nouvelle.",
        "Tu navigues au milieu, tranquille. Continue comme ça."
      ]);
    }

    // 7. TOUT AU TOP (4-4-4) ou presque
    if (i >= 3 && h >= 3 && e >= 3) {
      return pick([
        "Intelligente, drôle, pleine d'énergie. L'univers est à toi aujourd'hui.",
        "Tu as craqué le code de la journée parfaite. Savoure chaque instant.",
        "Avec cette forme, tu pourrais lire, faire le poirier et refaire le monde en même temps.",
        "Tu es dans un état de grâce. Garde cette étincelle précieusement.",
        "Rien ne t'arrête aujourd'hui. Fonce, tu es lumineuse."
      ]);
    }

    // 8. CAS PAR DÉFAUT (Pour les combinaisons restantes)
    const cat = this.dataUtils.getCategory(i, h);
    if (cat === "red") {
      return pick([
        "Journée brouillon. Prends un livre, déconnecte, on efface tout.",
        "Tu as le droit de te sentir en décalage. Lâche la pression.",
        "Même les plus fortes ont des jours où rien ne s'aligne.",
        "Ne te juge pas sur une journée comme ça. Demain est une autre page."
      ]);
    }
    if (cat === "amber") {
      return pick([
        "Ton sens de l'humour te sauve toujours des journées compliquées.",
        "Tu ne saisis peut-être pas tout aujourd'hui, mais tu sais en rire.",
        "L'autodérision est une arme massive. Tu la manies à la perfection."
      ]);
    }
    if (cat === "purple") {
      return pick([
        "Ton esprit est une lame bien aiguisée aujourd'hui. Sers-t'en bien.",
        "La réflexion est là. Tu bâtis des choses solides, même sans bruit.",
        "Ton intelligence silencieuse est ta plus grande force."
      ]);
    }
    if (cat === "teal") {
      return pick([
        "Tu gères sur tous les fronts. Laisse éclater ton talent.",
        "L'esprit vif, la répartie rapide. Tu es sur un nuage."
      ]);
    }

    return pick([
      "Tu fais de ton mieux avec ce que tu as aujourd'hui. C'est parfait.",
      "Chaque jour est différent, l'important c'est de continuer à avancer.",
      "Tu trouves ton équilibre petit à petit. Sois indulgente avec toi-même."
    ]);
  }
}
