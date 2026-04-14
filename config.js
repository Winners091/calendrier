// Configuration constants for Romane du jour
export const INTELL_LABELS = ["Très bête", "Pas brillante", "Correcte", "Plutôt futée", "Génie"];
export const HUMOR_LABELS = ["Ennui morbide", "Pas drôle", "Ça passe", "Drôle", "Très drôle"];
export const ENERGY_LABELS = ["Épuisée", "Fatiguée", "Normale", "En forme", "Au top"];
export const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
export const DAYS_SHORT = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
export const DAYS_CAL = ["L", "M", "M", "J", "V", "S", "D"];

export const CATEGORIES = {
  teal: { label: "Génie drôle", color: "#4fba96", cssClass: "mood-teal" },
  purple: { label: "Génie ennuyeuse", color: "#8e83c9", cssClass: "mood-purple" },
  amber: { label: "Drôle mais bête", color: "#d9932a", cssClass: "mood-amber" },
  red: { label: "Bête et triste", color: "#d04f4e", cssClass: "mood-red" },
  gray: { label: "Neutre", color: "#979790", cssClass: "mood-gray" },
};

export const DAILY_QUESTIONS = [
  "T'as fait quelque chose dont tu es fière aujourd'hui ?",
  "C'était quoi le meilleur moment de ta journée ?",
  "T'as eu peur de quoi aujourd'hui ?",
  "Qu'est-ce qui t'a surprise aujourd'hui ?",
  "À quoi tu as pensé en te levant ce matin ?",
  "Quelqu'un t'a dit quelque chose de bien aujourd'hui ?",
  "C'est quoi une chose que tu aurais fait différemment ?",
  "Qu'est-ce qui t'a fait sourire aujourd'hui ?",
  "T'as appris quelque chose aujourd'hui, même petit ?",
  "Qu'est-ce qui t'a pesé aujourd'hui ?",
  "T'as aidé quelqu'un aujourd'hui ? Comment ?",
  "C'est quoi une chose que tu as évitée et qui t'aurait peut-être fait du bien ?",
  "Quel moment voudrais-tu revivre de cette journée ?",
  "T'as été courageuse à un moment aujourd'hui ?",
  "Qu'est-ce qui t'a mis hors de toi, même un peu ?",
  "T'as pensé à quelqu'un en particulier aujourd'hui ? Pourquoi ?",
  "C'est quoi quelque chose que tu veux faire demain ?",
  "T'as pris soin de toi aujourd'hui, comment ?",
  "Qu'est-ce qui t'a rendue curieuse aujourd'hui ?",
  "T'as dit quelque chose que tu regrettes ?",
  "C'est quoi une décision que tu as prise aujourd'hui, grande ou petite ?",
  "T'as eu un moment de calme aujourd'hui ? Quand ?",
  "Qu'est-ce qui t'a semblé plus facile qu'attendu ?",
  "T'as eu envie d'abandonner quelque chose aujourd'hui ?",
  "C'est quoi une chose que tu attends avec impatience ?",
  "T'as ri aujourd'hui ? De quoi ?",
  "Qu'est-ce que tu aurais voulu dire mais tu n'as pas dit ?",
  "T'as été gentille avec toi-même aujourd'hui ?",
  "C'est quoi quelque chose de petit que tu as accompli ?",
  "Qu'est-ce qui a rendu cette journée différente des autres ?",
];

export const ENCOURAGEMENTS = [
  "Les jours où tu te sens nulle ne disent pas la vérité entière.",
  "Une graine triste reste une graine vivante. Elle pousse encore.",
  "Aujourd'hui tu as surtout besoin de douceur, pas de jugement.",
  "Même fatiguée, tu restes quelqu'un de précieux.",
  "Tu n'as pas besoin d'être brillante pour mériter de l'amour.",
  "On arrose aussi les jours compliqués. Surtout eux.",
  "Tu peux être en vrac et rester admirable.",
  "Les jours bas ne retirent rien à ce que tu sais faire.",
];

export const MESSAGES = {
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
  "2-1": ["La journée d'une personne normale finalement. Ça va aller.", "Neutre comme du pain de mie. Mais le pain de mie c'est quand même plus utile."],
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
  "0-0": ["On dirait que tu touches le fond. La seule direction possible maintenant, c'est le haut.", "Heureusement que tu as des gens qui pensent à toi même dans ces moments-là."],
};

export const CONF_COLORS = ["#4fba96", "#8e83c9", "#d9932a", "#d04f4e", "#378ADD", "#D4537E", "#bf5b43"];

// Validation rules
export const VALIDATION_RULES = {
  positive: { maxLength: 280, required: false },
  question: { maxLength: 400, required: false },
  note: { maxLength: 500, required: false },
  slider: { min: 0, max: 4, required: true }
};

// Error messages
export const ERROR_MESSAGES = {
  SAVE_FAILED: "Impossible d'enregistrer. Réessaie.",
  LOAD_FAILED: "Impossible de charger les données.",
  EXPORT_FAILED: "Erreur lors de l'export",
  STORAGE_UNAVAILABLE: "Le stockage n'est pas disponible sur cet appareil.",
  VALIDATION_FAILED: "Veuillez vérifier les champs saisis.",
  NETWORK_FAILED: "Erreur de connexion.",
  UNKNOWN: "Une erreur s'est produite."
};
