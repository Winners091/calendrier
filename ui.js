// UI management module
export class UIManager {
  constructor(elements, dataUtils, validator, performanceUtils) {
    this.elements = elements;
    this.dataUtils = dataUtils;
    this.validator = validator;
    this.performanceUtils = performanceUtils;
    this.state = {
      intellVal: 2,
      humorVal: 2,
      energyVal: 2
    };
  }

  updateMessage() {
    try {
      this.state.intellVal = this.validator.validateSlider(this.elements.intellSlider.value, { min: 0, max: 4 });
      this.state.humorVal = this.validator.validateSlider(this.elements.humorSlider.value, { min: 0, max: 4 });
      this.state.energyVal = this.validator.validateSlider(this.elements.energySlider.value, { min: 0, max: 4 });
      
      // Update labels
      const labels = {
        intell: ["Très bête", "Pas brillante", "Correcte", "Plutôt futée", "Génie"],
        humor: ["Ennui morbide", "Pas drôle", "Ça passe", "Drôle", "Très drôle"],
        energy: ["Épuisée", "Fatiguée", "Normale", "En forme", "Au top"]
      };
      
      document.getElementById("intell-label").textContent = labels.intell[this.state.intellVal];
      document.getElementById("humor-label").textContent = labels.humor[this.state.humorVal];
      document.getElementById("energy-label").textContent = labels.energy[this.state.energyVal];
      
      // Update ARIA attributes
      this.elements.intellSlider.setAttribute("aria-valuenow", this.state.intellVal);
      this.elements.intellSlider.setAttribute("aria-valuetext", labels.intell[this.state.intellVal]);
      this.elements.humorSlider.setAttribute("aria-valuenow", this.state.humorVal);
      this.elements.humorSlider.setAttribute("aria-valuetext", labels.humor[this.state.humorVal]);
      this.elements.energySlider.setAttribute("aria-valuenow", this.state.energyVal);
      this.elements.energySlider.setAttribute("aria-valuetext", labels.energy[this.state.energyVal]);
      
      // Update slider fills
      this.updateSliderFill(this.elements.intellSlider);
      this.updateSliderFill(this.elements.humorSlider);
      this.updateSliderFill(this.elements.energySlider);
      
      // Update message with animation
      this.elements.msgBox.style.opacity = ".25";
      setTimeout(() => {
        const messages = {
          "4-4": ["Je pense que c'est le jour parfait pour essayer un double salto arrière avec réception en grand écart.", "On dirait que tu es en pleine forme cérébrale ET comique. Les autres n'ont aucune chance.", "Aujourd'hui tu es à la fois intelligente ET drôle. Je pense que c'est un bug de l'univers."],
          "4-3": ["Machine à faire rire les autres sans rien faire. Honnêtement, c'est presque énervant.", "Un cerveau ET de l'humour. Ne peux-tu donc pas nous laisser un peu de ressources ?"],
          "4-2": ["J'ai l'impression que tu es en mode génie discrète aujourd'hui. Tu vois tout, dis peu, calcules en silence.", "Tu penses trop vite pour faire de bonnes blagues. Les autres suivent à peine."],
          "4-1": ["Tu es intelligente, certes, mais même Abdoula est plus drôle.", "Einstein n'était pas drôle non plus. Quoique plus intelligent."],
          "4-0": ["Je ne comprends toujours pas comment on peut puer l'intelligence et le pigeon en même temps.", "Heureusement qu'être belle et intelligente remplace l'humour."],
          "3-4": ["Aujourd'hui drôle ET plutôt futée. Voilà une combinaison dangereuse.", "Plutôt intelligente et très drôle. Voilà l'illusion à la perfection."],
          "3-3": ["On peut dire qu'aujourd'hui c'est mi-intelligence mi-humour. Un bon équilibre.", "Journée équilibrée. Ni le prix Nobel ni le Jamel Comedy Club. Et c'est bien."],
          "3-2": ["Plutôt futée et calme aujourd'hui. Tu observes. Tu retiens. Méfiance.", "Mode « je comprends tout mais je dis rien ». Tu accumules des munitions."],
          "3-1": ["Tu réfléchis et ne rigoles pas. C'est que tu prépares quelque chose.", "Journée sérieuse. Les blagues attendront demain."],
          "3-0": ["Futée mais dans un ennui profond. Le genre d'ennui philosophique.", "Tu penses, donc tu t'ennuies."],
          "2-4": ["Tu es hilarante aujourd'hui malgré toi. Les meilleures blagues sont accidentelles.", "Très drôle mais pas sûre de pourquoi. Mode comique instinctif."],
          "2-3": ["Tu es drôle et normale aujourd'hui. C'est une bonne journée, tout simplement.", "Rien d'extraordinaire mais l'humour est là. C'est déjà beaucoup."],
          "2-2": ["Ni génie ni bouffonne. Une version confort de toi-même aujourd'hui.", "C'est ok d'être dans le confort parfois. C'est même bien."],
          "2-1": ["Tu te sens pas au top aujourd'hui. C'est ok, même les cellules ont besoin de mitose pour se régénérer.", "Journée un peu molle. Demain tu seras de retour."],
          "2-0": ["Dans la moyenne intellectuelle et ennui ferme. État classique du mercredi.", "Le niveau « je fixe le plafond depuis 20 minutes ». C'est pas glorieux mais ça arrive à tout le monde."],
          "1-4": ["Tu te sens bête mais fais rire tout le monde. C'est le summum de l'intelligence sociale, en fait.", "Les gens les plus drôles sont souvent ceux qui se croient pas malins. Tu en es la preuve."],
          "1-3": ["Pas brillante mais drôle. Tu as trouvé la meilleure stratégie de survie sociale.", "Tu compenses brillamment. Personne ne voit rien."],
          "1-2": ["Tu te sens pas au top aujourd'hui. C'est ok, même les cellules ont besoin de mitose pour se régénérer.", "Journée un peu molle. Demain tu seras de retour."],
          "1-1": ["En veille prolongée. Le système redémarrera quand la motivation aura fini sa sieste.", "Ni drôle ni futée, mais toujours Romane. C'est déjà pas mal."],
          "1-0": ["Même si ton cerveau fait parfois des pauses syndicales et ton humour semble avoir été livré sans mode d'emploi, tu es quand même une personne rayonnante.", "L'ennui plus la flemme intellectuelle. Il te faut un canapé et une série."],
          "0-4": ["Si j'ai bien compris tu te sens très bête mais es absolument hilarante. C'est un bon superpouvoir.", "Se sentir bête et faire rire tout le monde : c'est du talent."],
          "0-3": ["Tu compenses ton cerveau en mode veille avec un humour de qualité. Bonne stratégie.", "Drôle malgré tout. Tu as le sens des priorités."],
          "0-2": ["Tu te sens nulle aujourd'hui, alors je te rappelle gentiment que tu as tort. Je suis très sérieux.", "Journée difficile pour le cerveau. On te laisse le bénéfice du doute."],
          "0-1": ["On dirait bien que tu te sens bête et pas drôle en ce moment, mais ces moments-là passent toujours. Et toi tu évolues.", "Petits conseils : bois un verre d'eau, mange une pomme et essaie de faire des squats."],
          "0-0": ["On dirait que tu touches le fond. La seule direction possible maintenant, c'est le haut.", "Heureusement que tu as des gens qui pensent à toi même dans ces moments-là."]
        };
        
        const key = `${this.state.intellVal}-${this.state.humorVal}`;
        const msgArray = messages[key] || ["Journée particulière."];
        this.elements.msgBox.textContent = msgArray[Math.floor(Math.random() * msgArray.length)];
        this.elements.msgBox.style.opacity = "1";
      }, 140);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  }

  updateSliderFill(input) {
    try {
      if (!input) return;
      const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
      input.style.setProperty("--pct", pct + "%");
    } catch (error) {
      console.error('Error updating slider fill:', error);
    }
  }

  setupCharCount(field, countEl, max) {
    try {
      if (!field || !countEl) return;
      
      const updateCount = this.performanceUtils.debounce(() => {
        const length = field.value.length;
        countEl.textContent = `${length} / ${max}`;
        countEl.classList.toggle("warn", length > max * 0.85);
        
        // Validation feedback
        if (length > max) {
          field.classList.add('error');
          countEl.classList.add('error');
        } else {
          field.classList.remove('error');
          countEl.classList.remove('error');
        }
      }, 100);
      
      field.addEventListener("input", updateCount);
      field.addEventListener('blur', () => {
        try {
          this.validator.validateText(field.value, { maxLength: max, required: false });
          field.classList.remove('error');
        } catch (error) {
          field.classList.add('error');
        }
      });
    } catch (error) {
      console.error('Error setting up character count:', error);
    }
  }

  updateTodayDate() {
    try {
      document.getElementById("today-date").textContent = 
        new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    } catch (error) {
      console.error('Error updating today date:', error);
    }
  }

  setupDailyQuestion(questions) {
    try {
      document.getElementById("daily-question").textContent = this.getDailyQuestion(questions);
    } catch (error) {
      console.error('Error setting up daily question:', error);
    }
  }

  getDailyQuestion(questions) {
    try {
      const d = new Date();
      const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
      return questions[dayOfYear % questions.length];
    } catch (error) {
      console.error('Error getting daily question:', error);
      return "Comment te sens-tu aujourd'hui ?";
    }
  }

  setupEventListeners() {
    try {
      // Slider events
      this.elements.intellSlider.addEventListener("input", () => this.updateMessage());
      this.elements.humorSlider.addEventListener("input", () => this.updateMessage());
      this.elements.energySlider.addEventListener("input", () => this.updateMessage());
    } catch (error) {
      console.error('Error setting up UI event listeners:', error);
    }
  }
}
