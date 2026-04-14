// Bundle version of modular architecture for local use

// Config constants
const INTELL_LABELS = ["Très bête", "Pas brillante", "Correcte", "Plutôt futée", "Génie"];
const HUMOR_LABELS = ["Ennui morbide", "Pas drôle", "Ça passe", "Drôle", "Très drôle"];
const ENERGY_LABELS = ["Épuisée", "Fatiguée", "Normale", "En forme", "Au top"];
const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const DAYS_CAL = ["L", "M", "M", "J", "V", "S", "D"];
const CATEGORIES = {
  teal: { label: "Génie drôle", color: "#4fba96", cssClass: "mood-teal" },
  purple: { label: "Génie ennuyeuse", color: "#8e83c9", cssClass: "mood-purple" },
  amber: { label: "Drôle mais bête", color: "#d9932a", cssClass: "mood-amber" },
  red: { label: "Bête et triste", color: "#d04f4e", cssClass: "mood-red" },
  gray: { label: "Neutre", color: "#979790", cssClass: "mood-gray" },
};
const DAILY_QUESTIONS = [
  "Quel est un truc que tu as appris aujourd'hui, même tout petit ?",
  "Si ton humeur était une météo, quel temps ferait-il aujourd'hui ?",
  "Quel moment t'a fait sourire aujourd'hui, même un peu ?",
  "Quel est le défi que tu as surmonté aujourd'hui ?",
  "Si tu devais décrire ta journée en trois mots, ce serait lesquels ?",
  "Quel est le compliment que tu t'es fait aujourd'hui ?",
  "Quelle est la chose la plus simple qui t'a apporté du plaisir aujourd'hui ?",
  "Si tu pouvais changer une chose de ta journée, ce serait quoi ?",
  "Quel est le moment où tu t'es sentie la plus forte aujourd'hui ?",
  "Quelle est la chose que tu as hâte de faire demain ?",
  "Quel est le son qui a marqué ta journée ?",
  "Si ton humeur était une couleur, quelle serait-elle aujourd'hui ?",
  "Quel est le geste gentil que tu as fait ou reçu aujourd'hui ?",
  "Quelle est la chose que tu as bien gérée aujourd'hui ?",
  "Si tu devais donner un titre à ta journée, ce serait quoi ?",
  "Quel est le moment où tu t'es sentie la plus calme aujourd'hui ?",
  "Quelle est la chose que tu as découverte aujourd'hui ?",
  "Quel est le compliment que tu as fait à quelqu'un aujourd'hui ?",
  "Si ton humeur était une chanson, quelle serait-elle aujourd'hui ?",
  "Quel est le moment où tu as ri aujourd'hui ?",
  "Quelle est la chose que tu as laissée aller aujourd'hui ?",
  "Quel est le parfum ou le goût qui a marqué ta journée ?",
  "Si tu devais noter ta journée sur 10, ce serait combien et pourquoi ?",
  "Quel est le moment où tu t'es sentie comprise aujourd'hui ?",
  "Quelle est la chose que tu as créée aujourd'hui ?",
  "Quel est le détail que tu as remarqué aujourd'hui qui t'a plu ?",
  "Si ton humeur était une saison, laquelle serait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie fière aujourd'hui ?",
  "Quelle est la chose que tu as partagée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie écoutée aujourd'hui ?",
  "Si tu pouvais garder une seule sensation de ta journée, ce serait quoi ?",
  "Quel est le moment où tu t'es sentie libre aujourd'hui ?",
  "Quelle est la chose que tu as choisie aujourd'hui ?",
  "Quel est le moment où tu t'es sentie patiente aujourd'hui ?",
  "Si ton humeur était une texture, quelle serait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie courageuse aujourd'hui ?",
  "Quelle est la chose que tu as terminée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie curieuse aujourd'hui ?",
  "Si tu devais décrire ton énergie aujourd'hui, ce serait quoi ?",
  "Quel est le moment où tu t'es sentie douce aujourd'hui ?",
  "Quelle est la chose que tu as organisée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie inspirée aujourd'hui ?",
  "Si ton humeur était une température, combien de degrés ferait-il ?",
  "Quel est le moment où tu t'es sentie déterminée aujourd'hui ?",
  "Quelle est la chose que tu as réparée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie surprise aujourd'hui ?",
  "Si tu pouvais garder une seule émotion de ta journée, ce serait quoi ?",
  "Quel est le moment où tu t'es sentie reconnaissante aujourd'hui ?",
  "Quelle est la chose que tu as improvisée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie présente aujourd'hui ?",
  "Si ton humeur était une direction, laquelle prendrait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie authentique aujourd'hui ?",
  "Quelle est la chose que tu as protégée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie légère aujourd'hui ?",
  "Si ton humeur était une vitesse, à combien roulerait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie connectée aujourd'hui ?",
  "Quelle est la chose que tu as transformée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie audacieuse aujourd'hui ?",
  "Si ton humeur était une note de musique, laquelle serait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie sereine aujourd'hui ?",
  "Quelle est la chose que tu as débloquée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie vivante aujourd'hui ?",
  "Si tu devais résumer ton humeur en une image, ce serait quoi ?",
  "Quel est le moment où tu t'es sentie aimée aujourd'hui ?",
  "Quelle est la chose que tu as osée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie lucide aujourd'hui ?",
  "Si ton humeur était une saveur, laquelle serait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie généreuse aujourd'hui ?",
  "Quelle est la chose que tu as célébrée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie humble aujourd'hui ?",
  "Si ton humeur était une durée, combien de temps durerait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie résiliente aujourd'hui ?",
  "Quelle est la chose que tu as libérée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie joyeuse aujourd'hui ?",
  "Si ton humeur était une forme, laquelle serait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie sage aujourd'hui ?",
  "Quelle est la chose que tu as accueillie aujourd'hui ?",
  "Quel est le moment où tu t'es sentie forte aujourd'hui ?",
  "Si ton humeur était une distance, combien de kilomètres ferait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie paisible aujourd'hui ?",
  "Quelle est la chose que tu as découverte aujourd'hui ?",
  "Quel est le moment où tu t'es sentie créative aujourd'hui ?",
  "Si ton humeur était une lumière, quelle serait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie attentive aujourd'hui ?",
  "Quelle est la chose que tu as résolue aujourd'hui ?",
  "Quel est le moment où tu t'es sentie ouverte aujourd'hui ?",
  "Si ton humeur était une mélodie, à quoi ressemblerait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie alignée aujourd'hui ?",
  "Quelle est la chose que tu as honorée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie vibrante aujourd'hui ?",
  "Si ton humeur était un paysage, lequel serait-il aujourd'hui ?",
  "Quel est le moment où tu t'es sentie juste aujourd'hui ?",
  "Quelle est la chose que tu as gravée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie équilibrée aujourd'hui ?",
  "Si ton humeur était une danse, quelle serait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie épanouie aujourd'hui ?",
  "Quelle est la chose que tu as semée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie bénie aujourd'hui ?",
  "Si ton humeur était une étoile, laquelle serait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie aimante aujourd'hui ?",
  "Quelle est la chose que tu as récoltée aujourd'hui ?",
  "Quel est le moment où tu t'es sentie alignée aujourd'hui ?",
  "Si ton humeur était une prière, quelle serait-elle aujourd'hui ?",
  "Quel est le moment où tu t'es sentie sacrée aujourd'hui ?",
  "Quelle est la chose que tu auras gardée de ta journée ?",
  "Quel est le moment où tu t'es sentie toi-même aujourd'hui ?",
  "Si ton humeur était une promesse, laquelle ferais-tu aujourd'hui ?",
  "Quel est le moment où tu t'es sentie éternelle aujourd'hui ?"
];
const ENCOURAGEMENTS = [
  "Les jours où tu te sens nulle ne disent pas la vérité entière.",
  "Une graine triste reste une graine vivante. Elle pousse encore.",
  "Aujourd'hui tu as surtout besoin de douceur, pas de jugement.",
  "Même fatiguée, tu restes quelqu'un de précieux.",
  "Tu n'as pas besoin d'être brillante pour mériter de l'amour.",
  "On arrose aussi les jours compliqués. Surtout eux.",
  "Tu peux être en vrac et rester admirable.",
  "Les jours bas ne retirent rien à ce que tu sais faire."
];
const MESSAGES = {
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
const CONF_COLORS = ["#4fba96", "#8e83c9", "#d9932a", "#d04f4e", "#378ADD", "#D4537E", "#bf5b43"];
const VALIDATION_RULES = {
  slider: { min: 0, max: 4 },
  positive: { maxLength: 280, required: false },
  question: { maxLength: 400, required: false },
  note: { maxLength: 500, required: false }
};
const ERROR_MESSAGES = {
  storage: "Impossible de sauvegarder. Vérifie que ton navigateur autorise le stockage local.",
  validation: "Certaines informations sont incorrectes. Vérifie les champs.",
  network: "Erreur de connexion. Réessaie plus tard.",
  unknown: "Une erreur s'est produite. Réessaie."
};

// Utils
class Storage {
  constructor() {
    this.memory = {};
    this.isLocalStorageAvailable = this.checkLocalStorage();
  }

  checkLocalStorage() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  async get(key) {
    try {
      if (this.isLocalStorageAvailable) {
        return { value: localStorage.getItem(key) };
      } else {
        return { value: this.memory[key] || null };
      }
    } catch (error) {
      return { value: this.memory[key] || null };
    }
  }

  async set(key, value) {
    try {
      if (this.isLocalStorageAvailable) {
        localStorage.setItem(key, value);
      } else {
        this.memory[key] = value;
      }
    } catch (error) {
      this.memory[key] = value;
    }
  }
}

class Validator {
  validateSlider(value, rules) {
    const num = parseInt(value);
    if (isNaN(num) || num < rules.min || num > rules.max) {
      throw new Error(`La valeur doit être entre ${rules.min} et ${rules.max}`);
    }
    return num;
  }

  validateText(text, rules) {
    const trimmed = text.trim();
    if (rules.required && !trimmed) {
      throw new Error("Ce champ est requis");
    }
    if (trimmed.length > rules.maxLength) {
      throw new Error(`Maximum ${rules.maxLength} caractères`);
    }
    return trimmed;
  }

  validateEntry(entry) {
    if (entry.i === undefined || entry.h === undefined) {
      throw new Error("Les valeurs d'intellect et d'humour sont requises");
    }
    return true;
  }
}

class DateUtils {
  todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  formatDate(dateStr, format = 'short') {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    if (format === 'short') {
      return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    } else {
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options);
    }
  }

  getDailyQuestion(questions) {
    const d = new Date();
    const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
    return questions[dayOfYear % questions.length];
  }
}

class DataUtils {
  getCategory(intel, humor) {
    if (intel >= 3 && humor >= 3) return 'teal';
    if (intel >= 3 && humor < 2) return 'purple';
    if (intel < 2 && humor >= 3) return 'amber';
    if (intel < 2 && humor < 2) return 'red';
    return 'gray';
  }

  getMessage(intel, humor, messages) {
    const key = `${intel}-${humor}`;
    const msgArray = messages[key] || ["Journée particulière."];
    return msgArray[Math.floor(Math.random() * msgArray.length)];
  }

  async loadMonthData(year, month, days) {
    const data = [];
    for (let day = 1; day <= days; day++) {
      const key = `romane-${year}-${month + 1}-${day}`;
      try {
        const res = await storage.get(key);
        if (res && res.value) {
          data.push(JSON.parse(res.value));
        } else {
          data.push(null);
        }
      } catch {
        data.push(null);
      }
    }
    return data;
  }

  async loadAllEntries(limit = 365) {
    const entries = [];
    const today = new Date();
    
    for (let i = 0; i < limit; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const key = `romane-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      
      try {
        const res = await storage.get(key);
        if (res && res.value) {
          entries.push({
            date: d,
            data: JSON.parse(res.value)
          });
        }
      } catch {
        // Continue
      }
    }
    
    return entries;
  }
}

class ErrorHandler {
  handle(error, context) {
    console.error(`[${context}]`, error);
    return error.message || ERROR_MESSAGES.unknown;
  }
}

class PerformanceUtils {
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  lazyLoad(element, callback) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(element);
          }
        });
      });
      observer.observe(element);
    } else {
      callback();
    }
  }
}

// Initialize utilities
const storage = new Storage();
const validator = new Validator();
const dateUtils = new DateUtils();
const dataUtils = new DataUtils();
const errorHandler = new ErrorHandler();
const performanceUtils = new PerformanceUtils();

// Theme Manager
class ThemeManager {
  constructor(elements) {
    this.elements = elements;
    this.theme = localStorage.getItem('romane-theme') || 'light';
  }

  initialize() {
    try {
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark');
        if (this.elements.themeToggle) {
          this.elements.themeToggle.textContent = '??';
        }
      }
    } catch (error) {
      console.error('Theme initialization error:', error);
    }
  }

  toggle() {
    try {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('romane-theme', this.theme);
      
      if (this.elements.themeToggle) {
        this.elements.themeToggle.textContent = this.theme === 'dark' ? '??' : '??';
      }
    } catch (error) {
      console.error('Theme toggle error:', error);
    }
  }
}

// Export Manager
class ExportManager {
  constructor(elements) {
    this.elements = elements;
  }

  async exportToCSV() {
    try {
      this.elements.exportBtn.disabled = true;
      
      const now = new Date();
      const allKeys = [];
      
      for (let m = 11; m >= 0; m--) {
        const d = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const y = d.getFullYear();
        const mo = d.getMonth() + 1;
        const days = new Date(y, mo, 0).getDate();
        
        for (let day = 1; day <= days; day++) {
          allKeys.push(`romane-${y}-${mo}-${day}`);
        }
      }
      
      const results = await Promise.all(allKeys.map(k => storage.get(k).catch(() => null)));
      
      let csv = "Date,Intellect,Humour,Energie,Categorie,FaitPositif,ReponseQuestion,NoteLibre\n";
      
      results.forEach((res, i) => {
        if (!res?.value) return;
        
        try {
          const data = JSON.parse(res.value);
          const [y, mo, d] = allKeys[i].replace("romane-", "").split("-");
          const date = dateUtils.formatDate(`${y}-${mo}-${d}`);
          
          const esc = s => `"${(s || "").replace(/"/g, '""')}"`;
          csv += `${esc(date)},${esc(data.i)},${esc(data.h)},${esc(data.e || 2)},${esc(data.cat || "")},${esc(data.positive)},${esc(data.qanswer)},${esc(data.note)}\n`;
        } catch (error) {
          console.error(`Error processing CSV row ${i}:`, error);
        }
      });
      
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `romane-humeur-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      
      this.showSuccessMessage();
    } catch (error) {
      this.showErrorMessage(error);
    } finally {
      this.elements.exportBtn.disabled = false;
    }
  }

  showSuccessMessage() {
    this.elements.exportBtn.textContent = "? Export réussi ?";
    setTimeout(() => {
      this.elements.exportBtn.textContent = "? Exporter mes données (CSV)";
    }, 2500);
  }

  showErrorMessage(error) {
    console.error('Export error:', error);
    this.elements.exportBtn.textContent = "Erreur lors de l'export";
    setTimeout(() => {
      this.elements.exportBtn.textContent = "? Exporter mes données (CSV)";
    }, 2500);
  }
}

// Entries Manager
class EntriesManager {
  constructor(elements) {
    this.elements = elements;
    this.state = {
      editingDate: null,
      isEditMode: false
    };
  }

  async saveEntry() {
    try {
      this.elements.saveBtn.disabled = true;
      this.elements.saveStatus.textContent = "";
      this.elements.saveStatus.className = "save-status";
      
      const dateKey = this.state.isEditMode ? this.state.editingDate : dateUtils.todayKey();
      
      const payload = {
        i: this.elements.intellSlider.value,
        h: this.elements.humorSlider.value,
        e: this.elements.energySlider.value,
        positive: this.elements.positiveField.value.trim(),
        qanswer: this.elements.questionField.value.trim(),
        note: this.elements.noteField.value.trim()
      };
      
      validator.validateEntry(payload);
      
      await storage.set("romane-" + dateKey, JSON.stringify(payload));
      
      if (!this.state.isEditMode) {
        this.launchConfetti();
      }
      
      const displayDate = dateUtils.formatDate(dateKey);
      if (this.state.isEditMode) {
        this.elements.saveStatus.textContent = `Humeur du ${displayDate} enregistrée ?`;
        setTimeout(() => {
          this.exitEditMode();
          this.elements.saveStatus.textContent = "";
        }, 2000);
      } else {
        this.elements.saveStatus.textContent = "Humeur du jour enregistrée ?";
        setTimeout(() => {
          this.elements.saveStatus.textContent = "";
        }, 3000);
      }
      
      return true;
    } catch (error) {
      this.elements.saveStatus.textContent = error.message || "Impossible d'enregistrer. Réessaie.";
      this.elements.saveStatus.className = "save-status error";
      return false;
    } finally {
      this.elements.saveBtn.disabled = false;
    }
  }

  async loadTodayData() {
    try {
      const res = await storage.get("romane-" + dateUtils.todayKey());
      if (res && res.value) {
        const data = JSON.parse(res.value);
        
        if (data.i !== undefined && data.h !== undefined && data.e !== undefined) {
          this.elements.intellSlider.value = data.i;
          this.elements.humorSlider.value = data.h;
          this.elements.energySlider.value = data.e;
        }
        
        this.elements.positiveField.value = data.positive || "";
        this.elements.questionField.value = data.qanswer || "";
        this.elements.noteField.value = data.note || "";
        
        ["positive", "question", "note"].forEach(name => {
          const field = document.getElementById(name + "-field");
          const countEl = document.getElementById(name + "-count");
          if (field && countEl) {
            countEl.textContent = `${field.value.length} / ${field.maxLength}`;
          }
        });
      }
    } catch (error) {
      console.error('Error loading today data:', error);
    }
  }

  async enterEditMode(dateStr) {
    try {
      this.state.editingDate = dateStr;
      this.state.isEditMode = true;
      
      const res = await storage.get("romane-" + dateStr);
      if (res && res.value) {
        const data = JSON.parse(res.value);
        this.elements.intellSlider.value = data.i;
        this.elements.humorSlider.value = data.h;
        this.elements.energySlider.value = data.e || 2;
        
        this.elements.positiveField.value = data.positive || "";
        this.elements.questionField.value = data.qanswer || "";
        this.elements.noteField.value = data.note || "";
      } else {
        this.elements.intellSlider.value = 2;
        this.elements.humorSlider.value = 2;
        this.elements.energySlider.value = 2;
        
        this.elements.positiveField.value = "";
        this.elements.questionField.value = "";
        this.elements.noteField.value = "";
      }
      
      const dateFr = dateUtils.formatDate(dateStr, 'long');
      this.elements.sectionLabel.textContent = `Modifier le ${dateFr}`;
      this.elements.saveBtn.textContent = `Enregistrer le ${dateFr}`;
      this.elements.saveBtn.classList.add('editing');
      
      document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error entering edit mode:', error);
    }
  }

  exitEditMode() {
    try {
      this.state.editingDate = null;
      this.state.isEditMode = false;
      
      this.elements.sectionLabel.textContent = "Comment tu te sens aujourd'hui ?";
      this.elements.saveBtn.textContent = "Enregistrer mon humeur du jour";
      this.elements.saveBtn.classList.remove('editing');
      
      this.loadTodayData();
    } catch (error) {
      console.error('Error exiting edit mode:', error);
    }
  }

  launchConfetti() {
    try {
      const confCanvas = document.getElementById("confetti-canvas");
      const confCtx = confCanvas.getContext("2d");
      let particles = [];
      let animating = false;
      
      const resizeCanvas = () => {
        confCanvas.width = window.innerWidth;
        confCanvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      
      const colors = ["#4fba96", "#8e83c9", "#d9932a", "#d04f4e", "#378ADD", "#D4537E", "#bf5b43"];
      
      for (let i = 0; i < 140; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * 7 + 3;
        particles.push({
          x: window.innerWidth / 2,
          y: window.innerHeight * .42,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 3,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - .5) * 10,
          alpha: 1,
          shape: Math.random() > .5 ? "rect" : "circle"
        });
      }
      
      const animateConfetti = () => {
        confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height);
        let alive = false;
        
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += .2;
          p.vx *= .99;
          p.rotation += p.rotSpeed;
          p.alpha -= .013;
          
          if (p.alpha <= 0) continue;
          alive = true;
          
          confCtx.save();
          confCtx.globalAlpha = p.alpha;
          confCtx.translate(p.x, p.y);
          confCtx.rotate(p.rotation * Math.PI / 180);
          confCtx.fillStyle = p.color;
          
          if (p.shape === "rect") {
            confCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          } else {
            confCtx.beginPath();
            confCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            confCtx.fill();
          }
          
          confCtx.restore();
        }
        
        if (alive) {
          requestAnimationFrame(animateConfetti);
        } else {
          confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height);
          animating = false;
        }
      };
      
      if (!animating) {
        animating = true;
        animateConfetti();
      }
    } catch (error) {
      console.error('Error launching confetti:', error);
    }
  }
}

// Calendar Manager
class CalendarManager {
  constructor(elements) {
    this.elements = elements;
    this.state = {
      viewYear: new Date().getFullYear(),
      viewMonth: new Date().getMonth()
    };
  }

  async renderCalendar() {
    try {
      document.getElementById("month-title").textContent = `${MONTHS[this.state.viewMonth]} ${this.state.viewYear}`;
      const grid = document.getElementById("cal-grid");
      grid.innerHTML = "";
      
      // Add day headers
      DAYS_CAL.forEach(d => {
        const el = document.createElement("div");
        el.className = "cal-day-name";
        el.textContent = d;
        el.setAttribute("role", "columnheader");
        grid.appendChild(el);
      });
      
      const firstDay = new Date(this.state.viewYear, this.state.viewMonth, 1).getDay();
      const offset = firstDay === 0 ? 6 : firstDay - 1;
      const daysInMonth = new Date(this.state.viewYear, this.state.viewMonth + 1, 0).getDate();
      const todayObj = new Date();
      const todayMidnight = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());
      
      // Add empty cells
      for (let i = 0; i < offset; i++) {
        const el = document.createElement("div");
        el.className = "cal-cell empty";
        el.setAttribute("role", "gridcell");
        grid.appendChild(el);
      }
      
      // Load month data
      const monthData = await dataUtils.loadMonthData(this.state.viewYear, this.state.viewMonth, daysInMonth);
      const countMap = { teal: 0, purple: 0, amber: 0, red: 0, gray: 0 };
      
      // Add day cells
      for (let d = 1; d <= daysInMonth; d++) {
        const el = document.createElement("div");
        el.className = "cal-cell";
        el.textContent = d;
        el.setAttribute("role", "gridcell");
        
        const isToday = d === todayObj.getDate() && 
                       this.state.viewMonth === todayObj.getMonth() && 
                       this.state.viewYear === todayObj.getFullYear();
        
        if (isToday) el.classList.add("today");
        
        const data = monthData[d - 1];
        if (data) {
          const catKey = dataUtils.getCategory(data.i, data.h);
          const cat = CATEGORIES[catKey];
          el.classList.add("has-data", cat.cssClass);
          
          // Colorier directement le fond de la cellule
          el.style.backgroundColor = cat.color + "20";
          el.style.borderLeft = `3px solid ${cat.color}`;
          
          const tooltip = `${cat.label}${data.note ? " · " + data.note.slice(0, 40) : ""}${data.positive ? " · ? " + data.positive.slice(0, 40) : ""}`;
          el.setAttribute("title", tooltip);
          el.setAttribute("aria-label", `${d} - ${cat.label}`);
          
          countMap[catKey]++;
        }
        
        // Add click handler for past days
        const cellDate = new Date(this.state.viewYear, this.state.viewMonth, d);
        const isPastDay = cellDate < todayMidnight;
        
        if (isPastDay || (isToday && !entriesManager.state.isEditMode)) {
          el.style.cursor = "pointer";
          const dateKey = `${this.state.viewYear}-${this.state.viewMonth + 1}-${d}`;
          el.addEventListener("click", () => {
            entriesManager.enterEditMode(dateKey);
          });
        }
        
        grid.appendChild(el);
      }
      
      this.renderStats(countMap);
      this.renderTrendChart();
    } catch (error) {
      errorHandler.handle(error, 'Calendar Render');
    }
  }

  renderStats(countMap) {
    try {
      const total = Object.values(countMap).reduce((a, b) => a + b, 0);
      const topEntry = Object.entries(countMap).sort((a, b) => b[1] - a[1])[0];
      const topLabel = total > 0 ? CATEGORIES[topEntry[0]].label : "-";
      const daysInMonth = new Date(this.state.viewYear, this.state.viewMonth + 1, 0).getDate();
      const percentage = total > 0 ? Math.round(total / daysInMonth * 100) + '%' : '-';
      
      document.getElementById("stats-grid").innerHTML = `
        <div class="stat-card">
          <div class="stat-label">Jours enregistrés</div>
          <div class="stat-val">${total}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Humeur dominante</div>
          <div class="stat-val small">${topLabel}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Ce mois-ci</div>
          <div class="stat-val small">${percentage}</div>
        </div>
      `;
    } catch (error) {
      errorHandler.handle(error, 'Stats Render');
    }
  }

  async renderTrendChart() {
    try {
      const data = await this.loadTrendData();
      const canvas = document.getElementById("trend-chart");
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth || 360;
      const h = 110;
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      
      const c = canvas.getContext("2d");
      c.scale(dpr, dpr);
      
      const pad = { top: 6, right: 12, bottom: 20, left: 12 };
      const cw = w - pad.left - pad.right;
      const ch = h - pad.top - pad.bottom;
      const step = cw / (data.length - 1 || 1);
      
      // Draw grid lines
      c.strokeStyle = "rgba(30,20,10,.05)";
      c.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + (ch / 4) * i;
        c.beginPath();
        c.moveTo(pad.left, y);
        c.lineTo(pad.left + cw, y);
        c.stroke();
      }
      
      // Draw curves
      this.drawCurve(c, data.map(d => d.intellect), "#4fba96", pad, cw, ch, step);
      this.drawCurve(c, data.map(d => d.humor), "#8e83c9", pad, cw, ch, step);
      this.drawCurve(c, data.map(d => d.energy), "#4a8fd4", pad, cw, ch, step);
      
      // Draw week labels
      c.fillStyle = "rgba(120,112,106,.6)";
      c.font = "10px DM Sans,system-ui,sans-serif";
      c.textAlign = "center";
      c.textBaseline = "top";
      data.forEach((pt, i) => {
        c.fillText(pt.week, pad.left + step * i, pad.top + ch + 5);
      });
    } catch (error) {
      errorHandler.handle(error, 'Trend Chart Render');
    }
  }

  async loadTrendData() {
    try {
      const now = new Date();
      const result = [];
      
      // Charge les données par semaine pour le mois en cours
      const year = now.getFullYear();
      const month = now.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      // Déterminer le nombre de semaines dans le mois
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month, daysInMonth);
      const startWeek = Math.ceil((firstDay.getDate() + firstDay.getDay()) / 7);
      const endWeek = Math.ceil((lastDay.getDate() + lastDay.getDay()) / 7);
      const weeksInMonth = endWeek - startWeek + 1;
      
      // Charger les données pour chaque semaine
      for (let week = 0; week < weeksInMonth; week++) {
        const weekStart = week * 7;
        const weekEnd = Math.min((week + 1) * 7, daysInMonth);
        
        const weekData = [];
        for (let day = weekStart; day < weekEnd; day++) {
          const date = new Date(year, month, day + 1);
          const key = `romane-${year}-${month + 1}-${day + 1}`;
          
          try {
            const res = await storage.get(key);
            if (res && res.value) {
              const data = JSON.parse(res.value);
              weekData.push(data);
            }
          } catch (error) {
            // Ignorer les erreurs de chargement individuelles
          }
        }
        
        if (weekData.length > 0) {
          result.push({
            week: `S${week + 1}`,
            intellect: weekData.reduce((s, v) => s + v.i, 0) / weekData.length,
            humor: weekData.reduce((s, v) => s + v.h, 0) / weekData.length,
            energy: weekData.filter(v => v.e !== undefined).length > 0 ? 
                    weekData.filter(v => v.e !== undefined).reduce((s, v) => s + (v.e || 2), 0) / weekData.filter(v => v.e !== undefined).length : null,
          });
        } else {
          result.push({
            week: `S${week + 1}`,
            intellect: null,
            humor: null,
            energy: null
          });
        }
      }
      
      return result;
    } catch (error) {
      errorHandler.handle(error, 'Trend Data Load');
      return [];
    }
  }

  drawCurve(ctx, values, color, pad, cw, ch, step) {
    const pts = values.map((v, i) => ({
      x: pad.left + step * i,
      y: v === null ? null : pad.top + ch - (v / 4) * ch
    }));
    
    const valid = pts.filter(p => p.y !== null);
    
    // Draw area
    if (valid.length > 1) {
      ctx.beginPath();
      ctx.moveTo(valid[0].x, pad.top + ch);
      valid.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(valid[valid.length - 1].x, pad.top + ch);
      ctx.closePath();
      ctx.fillStyle = color + "22";
      ctx.fill();
    }
    
    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    
    let started = false;
    pts.forEach(p => {
      if (p.y === null) {
        started = false;
        return;
      }
      if (!started) {
        ctx.moveTo(p.x, p.y);
        started = true;
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.stroke();
    
    // Draw points
    pts.forEach(p => {
      if (p.y === null) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,.85)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }
}

// Garden Manager
class GardenManager {
  constructor(elements) {
    this.elements = elements;
  }

  async renderGarden() {
    try {
      const entries = (await dataUtils.loadAllEntries(40)).slice(-7);
      const bed = document.getElementById('garden-bed');
      const stage = document.getElementById('garden-stage');
      const rainbow = document.getElementById('garden-rainbow');
      const waterRow = document.getElementById('water-row');
      const message = document.getElementById('garden-message');
      
      bed.innerHTML = '';
      waterRow.innerHTML = '';
      stage.textContent = `${entries.length} / 7 jours`;
      
      let hasSad = false;
      
      entries.forEach((entry, idx) => {
        const type = this.plantTypeFromEntry(entry);
        if (type === 'low') hasSad = true;
        const watered = !!entry.data.encouraged;
        
        const slot = document.createElement('div');
        slot.className = 'plant-slot';
        slot.innerHTML = this.plantHTML(type, watered, idx);
        slot.title = entry.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) + 
                     ' · ' + CATEGORIES[dataUtils.getCategory(entry.data.i, entry.data.h)].label;
        bed.appendChild(slot);
      });
      
      // Fill empty slots
      while (bed.children.length < 7) {
        const slot = document.createElement('div');
        slot.className = 'plant-slot';
        slot.innerHTML = '<div class="soil"></div>';
        bed.appendChild(slot);
      }
      
      // Handle today's encouragement
      await this.handleTodayEncouragement(hasSad, waterRow);
      
      // Update rainbow and message
      this.updateGardenMessage(entries.length, hasSad, message, rainbow);
    } catch (error) {
      errorHandler.handle(error, 'Garden Render');
    }
  }

  async handleTodayEncouragement(hasSad, waterRow) {
    const todayRes = await storage.get('romane-' + dateUtils.todayKey()).catch(() => null);
    let todayData = null;
    
    if (todayRes && todayRes.value) {
      try {
        todayData = JSON.parse(todayRes.value);
      } catch (error) {
        console.error('Error parsing today data:', error);
      }
    }
    
    const todaysCat = todayData ? dataUtils.getCategory(todayData.i, todayData.h) : null;
    const encouragementBox = document.getElementById('encouragement-box');
    
    if (todaysCat === 'red' || todaysCat === 'gray') {
      const b = document.createElement('button');
      b.className = 'water-btn';
      b.textContent = 'Arroser d\'encouragement';
      b.onclick = async () => {
        try {
          if (!todayData) return;
          
          todayData.encouraged = true;
          todayData.encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
          await storage.set('romane-' + dateUtils.todayKey(), JSON.stringify(todayData));
          encouragementBox.textContent = '? ' + todayData.encouragement;
          this.renderGarden();
        } catch (error) {
          errorHandler.handle(error, 'Garden Watering');
        }
      };
      waterRow.appendChild(b);
      
      encouragementBox.textContent = todayData?.encouragement ? 
        '? ' + todayData.encouragement : 
        'Aujourd\'hui la plante a besoin d\'un peu d\'eau et de douceur.';
    } else if (todaysCat === 'teal') {
      encouragementBox.textContent = '?? Aujourd\'hui une fleur brillante pousse dans le jardin.';
    } else if (todaysCat === 'amber' || todaysCat === 'purple') {
      encouragementBox.textContent = '?? Aujourd\'hui ça pousse tranquillement. Pas besoin d\'être parfaite pour fleurir.';
    } else {
      encouragementBox.textContent = 'Clique sur une humeur du jour et ton jardin poussera ici.';
    }
  }

  updateGardenMessage(entriesLength, hasSad, message, rainbow) {
    if (entriesLength >= 7) {
      rainbow.classList.add('visible');
      const sadPart = hasSad ? ' Les jours où tu te sens bête, ce sont les graines qui ont le plus besoin d\'amour.' : '';
      message.textContent = 'Peu importe ton humeur, tu as fait pousser ce beau jardin.' + sadPart + ' Tu es toujours intelligente et drôle à ma façon.';
    } else {
      rainbow.classList.remove('visible');
      message.textContent = 'Chaque jour ajouté fait pousser un peu plus ton jardin. Les bons comme les mauvais.';
    }
  }

  plantTypeFromEntry(entry) {
    try {
      const { i, h } = entry.data;
      const cat = dataUtils.getCategory(i, h);
      if (cat === 'teal') return 'good';
      if (cat === 'red') return 'low';
      return 'ok';
    } catch (error) {
      return 'ok';
    }
  }

  plantHTML(type, watered = false, idx = 0) {
    try {
      if (type === 'good') {
        return `<div class="plant good" style="transform:translateY(${idx % 2 ? 4 : 0}px)">
          <div class="stem"></div>
          <div class="leaf" style="left:4px"></div>
          <div class="leaf r" style="right:4px"></div>
          <div class="flower-petal p1"></div>
          <div class="flower-petal p2"></div>
          <div class="flower-petal p3"></div>
          <div class="flower-petal p4"></div>
          <div class="flower-petal p5"></div>
          <div class="flower-core"></div>
          <div class="soil"></div>
        </div>`;
      }
      
      if (type === 'low') {
        return `<div class="plant low ${watered ? 'watered' : ''}" style="transform:translateY(${idx % 2 ? 6 : 0}px)">
          <div class="stem"></div>
          <div class="leaf" style="left:5px;bottom:28px"></div>
          <div class="sad-head"></div>
          <div class="droop"></div>
          <div class="soil"></div>
        </div>`;
      }
      
      return `<div class="plant ok" style="transform:translateY(${idx % 2 ? 3 : 0}px)">
        <div class="stem"></div>
        <div class="leaf" style="left:4px"></div>
        <div class="leaf r" style="right:4px"></div>
        <div class="bud"></div>
        <div class="soil"></div>
      </div>`;
    } catch (error) {
      return '<div class="soil"></div>';
    }
  }
}

// UI Manager
class UIManager {
  constructor(elements) {
    this.elements = elements;
    this.state = {
      intellVal: 2,
      humorVal: 2,
      energyVal: 2
    };
  }

  updateMessage() {
    try {
      this.state.intellVal = validator.validateSlider(this.elements.intellSlider.value, { min: 0, max: 4 });
      this.state.humorVal = validator.validateSlider(this.elements.humorSlider.value, { min: 0, max: 4 });
      this.state.energyVal = validator.validateSlider(this.elements.energySlider.value, { min: 0, max: 4 });
      
      // Update labels
      const labels = {
        intell: INTELL_LABELS,
        humor: HUMOR_LABELS,
        energy: ENERGY_LABELS
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
        const key = `${this.state.intellVal}-${this.state.humorVal}`;
        const msgArray = MESSAGES[key] || ["Journée particulière."];
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
      
      const updateCount = performanceUtils.debounce(() => {
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
          validator.validateText(field.value, { maxLength: max, required: false });
          field.classList.remove('error');
        } catch (error) {
          field.classList.add('error');
        }
      });
    } catch (error) {
      console.error('Error setting up character count:', error);
    }
  }

  setupDailyQuestion() {
    try {
      document.getElementById("daily-question").textContent = dateUtils.getDailyQuestion(DAILY_QUESTIONS);
    } catch (error) {
      console.error('Error setting up daily question:', error);
    }
  }
}

// Initialize managers
let themeManager, exportManager, entriesManager, calendarManager, gardenManager, uiManager;

// Initialize DOM elements
function initializeElements() {
  try {
    const elements = {};
    elements.intellSlider = document.getElementById("intell-slider");
    elements.humorSlider = document.getElementById("humor-slider");
    elements.energySlider = document.getElementById("energy-slider");
    elements.msgBox = document.getElementById("message-box");
    elements.saveBtn = document.getElementById("save-btn");
    elements.saveStatus = document.getElementById("save-status");
    elements.exportBtn = document.getElementById("export-btn");
    elements.sectionLabel = document.getElementById("section-label");
    elements.positiveField = document.getElementById("positive-field");
    elements.questionField = document.getElementById("question-field");
    elements.noteField = document.getElementById("note-field");
    elements.themeToggle = document.getElementById("theme-toggle");
    
    return elements;
  } catch (error) {
    errorHandler.handle(error, 'DOM Elements Initialization');
    return null;
  }
}

// Streak functionality
async function computeStreak() {
  try {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const key = `romane-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      const res = await storage.get(key).catch(() => null);
      
      if (res && res.value) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  } catch (error) {
    errorHandler.handle(error, 'Streak Computation');
    return 0;
  }
}

async function renderStreak() {
  try {
    const streak = await computeStreak();
    const banner = document.getElementById("streak-banner");
    const icon = document.getElementById("streak-icon");
    const text = document.getElementById("streak-text");
    
    if (streak === 0) {
      banner.classList.add("hidden");
      return;
    }
    
    banner.classList.remove("hidden");
    
    if (streak >= 30) {
      icon.textContent = "??";
    } else if (streak >= 14) {
      icon.textContent = "??";
    } else if (streak >= 7) {
      icon.textContent = "??";
    } else {
      icon.textContent = "??";
    }
    
    if (streak === 7 || streak === 14 || streak === 30 || streak === 100) {
      text.innerHTML = `<strong>${streak} jours de suite</strong> - Incroyable, tu tiens le cap ! ?`;
    } else if (streak === 1) {
      text.innerHTML = `C'est parti pour <strong>le jour 1</strong> - chaque grand streak commence comme ça.`;
    } else {
      text.innerHTML = `<strong>${streak} jours</strong> d'affilée - t'es régulière, c'est rare.`;
    }
  } catch (error) {
    errorHandler.handle(error, 'Streak Render');
  }
}

// Weekly recap
async function renderRecap() {
  try {
    const today = new Date();
    const dow = today.getDay() === 0 ? 6 : today.getDay() - 1;
    const days = [];
    
    for (let i = dow; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      days.push(d);
    }
    
    const container = document.getElementById("recap-content");
    container.innerHTML = "";
    
    const entries = await Promise.all(days.map(d => {
      const k = `romane-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      return storage.get(k).catch(() => null);
    }));
    
    const filled = entries.filter(e => e && e.value);
    
    if (filled.length === 0) {
      container.innerHTML = `<p class="recap-empty">Aucune entrée cette semaine encore - commence aujourd'hui !</p>`;
      return;
    }
    
    let positives = [];
    
    days.forEach((d, i) => {
      const res = entries[i];
      const div = document.createElement("div");
      div.className = "recap-day";
      const isToday = i === dow;
      const dayName = d.toLocaleDateString("fr-FR", { weekday: "long" });
      
      let moodLabel = "-", dotColor = "#b5aca5", noteText = "", posText = "";
      
      if (res && res.value) {
        try {
          const data = JSON.parse(res.value);
          const catKey = dataUtils.getCategory(data.i, data.h);
          const cat = CATEGORIES[catKey];
          moodLabel = cat.label;
          dotColor = cat.color;
          const energyLabel = data.e !== undefined ? ` · Énergie : ${ENERGY_LABELS[data.e]}` : "";
          
          if (data.note) noteText = data.note;
          if (data.positive) {
            posText = data.positive;
            positives.push(data.positive);
          }
          
          div.innerHTML = `
            <div class="recap-day-header">
              <div class="recap-day-dot" style="background:${dotColor}"></div>
              <span class="recap-day-name">${dayName}${isToday ? " (aujourd'hui)" : ""}</span>
              <span class="recap-day-mood">${moodLabel}${energyLabel}</span>
            </div>
            ${posText ? `<p class="recap-day-note">? ${posText}</p>` : ""}
            ${noteText ? `<p class="recap-day-note">${noteText}</p>` : `<p class="recap-day-note empty">Pas de note ce jour-là.</p>`}
          `;
        } catch (error) {
          div.innerHTML = `<div class="recap-day-header"><span class="recap-day-name">${dayName}</span></div>`;
        }
      } else {
        div.innerHTML = `
          <div class="recap-day-header">
            <div class="recap-day-dot" style="background:#e8e5e0"></div>
            <span class="recap-day-name">${dayName}${isToday ? " (aujourd'hui)" : ""}</span>
            <span class="recap-day-mood" style="color:var(--text-faint)">Non renseigné</span>
          </div>
        `;
      }
      
      container.appendChild(div);
    });
    
    // Generate recap phrase from positive actions
    if (positives.length > 0) {
      const phrases = [
        `Cette semaine, t'as quand même réussi à : « ${positives[0]} ». C'est pas rien.`,
        `Le moment le plus honnête de ta semaine : « ${positives[0]} ». Garde ça.`,
        `Tu as écrit ça toi-même : « ${positives[positives.length - 1]} ». C'était toi.`
      ];
      
      const phraseEl = document.createElement("div");
      phraseEl.className = "recap-phrase";
      phraseEl.textContent = phrases[Math.floor(Math.random() * phrases.length)];
      container.appendChild(phraseEl);
    }
  } catch (error) {
    errorHandler.handle(error, 'Weekly Recap Render');
  }
}

// Tab management
function setupTabs() {
  try {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Deactivate all tabs
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Activate selected tab
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
        
        // Refresh components when switching tabs
        if (targetTab === 'garden') {
          gardenManager.renderGarden();
        } else if (targetTab === 'history') {
          calendarManager.renderCalendar();
          renderRecap();
        }
      });
    });
  } catch (error) {
    errorHandler.handle(error, 'Tab Setup');
  }
}

// Utility functions
function updateTodayDate() {
  try {
    document.getElementById("today-date").textContent = 
      new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  } catch (error) {
    errorHandler.handle(error, 'Update Today Date');
  }
}

async function refreshAllComponents() {
  try {
    await Promise.all([
      calendarManager.renderCalendar(),
      renderRecap(),
      renderStreak(),
      gardenManager.renderGarden()
    ]);
  } catch (error) {
    errorHandler.handle(error, 'Refresh All Components');
  }
}

// Application initialization
async function init() {
  try {
    console.log('Initializing Romane du jour (modular bundle)...');
    
    // Initialize elements
    const elements = initializeElements();
    if (!elements) {
      throw new Error('Failed to initialize DOM elements');
    }
    
    // Initialize managers
    themeManager = new ThemeManager(elements);
    exportManager = new ExportManager(elements);
    entriesManager = new EntriesManager(elements);
    calendarManager = new CalendarManager(elements);
    gardenManager = new GardenManager(elements);
    uiManager = new UIManager(elements);
    
    // Initialize theme
    themeManager.initialize();
    
    // Setup character counts
    uiManager.setupCharCount(elements.positiveField, document.getElementById("positive-count"), 280);
    uiManager.setupCharCount(elements.questionField, document.getElementById("question-count"), 400);
    uiManager.setupCharCount(elements.noteField, document.getElementById("note-count"), 500);
    
    // Set initial values
    uiManager.setupDailyQuestion();
    updateTodayDate();
    
    // Load initial data
    await entriesManager.loadTodayData();
    
    // Setup event listeners
    elements.intellSlider.addEventListener("input", () => uiManager.updateMessage());
    elements.humorSlider.addEventListener("input", () => uiManager.updateMessage());
    elements.energySlider.addEventListener("input", () => uiManager.updateMessage());
    
    elements.saveBtn.addEventListener("click", () => entriesManager.saveEntry());
    elements.exportBtn.addEventListener("click", () => exportManager.exportToCSV());
    
    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', () => themeManager.toggle());
    }
    
    document.getElementById("prev-btn").addEventListener("click", () => {
      calendarManager.state.viewMonth--;
      if (calendarManager.state.viewMonth < 0) {
        calendarManager.state.viewMonth = 11;
        calendarManager.state.viewYear--;
      }
      calendarManager.renderCalendar();
    });
    
    document.getElementById("next-btn").addEventListener("click", () => {
      calendarManager.state.viewMonth++;
      if (calendarManager.state.viewMonth > 11) {
        calendarManager.state.viewMonth = 0;
        calendarManager.state.viewYear++;
      }
      calendarManager.renderCalendar();
    });
    
    // Setup tabs
    setupTabs();
    
    // Initial render
    await refreshAllComponents();
    
    console.log('Romane du jour initialized successfully');
    
  } catch (error) {
    const message = errorHandler.handle(error, 'Application Initialization');
    console.error('Initialization failed:', message);
    
    // Show user-friendly error message
    const saveStatus = document.getElementById("save-status");
    if (saveStatus) {
      saveStatus.textContent = "Erreur lors de l'initialisation. Actualisez la page.";
      saveStatus.className = "save-status error";
    }
  }
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
