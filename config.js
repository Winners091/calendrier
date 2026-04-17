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
  "As-tu fait quelque chose dont tu es fière aujourd'hui ?",
  "Quel a été le meilleur moment de ta journée ?",
  "Quelque chose t'a fait peur aujourd'hui ?",
  "Quelque chose t'a surprise aujourd'hui ?",
  "À tu as pensé à quelque chose en te levant ce matin ?",
  "Quelqu'un t'a-t-il dit quelque chose de marquant aujourd'hui, drôle, agaçant, inattendu ... ?",
  "Y a-t-il quelque chose que tu aurais aimé faire différemment aujourd'hui ?",
  "Qu'est-ce qui t'a fait sourire aujourd'hui (Il peut avoir beaucoup de choses)?",
  "As-tu appris quelque chose aujourd'hui, même minuscule ?",
  "Est-ce qu'il y a quelque chose qui t'a pesé toute la journée ?",
  "Penses-tu avoir aidé quelqu'un aujourd'hui ? Comment ?",
  "Quel moment voudrais-tu recommencer de cette journée ?",
  "Qu'est-ce qui t'a mis hors de toi, même légèrement ?",
  "Quelque chose de prévu pour demain hormis aller en cours ?",
  "T'as dit quelque chose que tu regrettes ?",
  "As-tu eu un moment de calme aujourd'hui ? Quand ?",
  "Qu'est-ce qui t'a semblé plus facile qu'attendu ?",
  "T'as ri aujourd'hui ? De quoi ? De qui ? De riz ?",
  "Qu'est-ce que tu aurais voulu dire mais tu n'as pas dit ?",
  "Qu'est-ce qui a rendu cette journée différente des autres ?",
];

export const ENCOURAGEMENTS = [
  "Les jours où tu te sens nulle ne velent pas tout dire.",
  "Tu es fatiguée, pas ratée.",
  "Même fatiguée, tu restes quelqu'un d'énergique(plus qu'une certaine personne).",
  "Tu n'as pas besoin d'être brillante tous les jours pour avoir de la valeur.",
  "On arrose aussi les jours compliqués. Surtout eux.",
  "Tu peux être en vrac et rester admirable(je viens de finir un portrait de toi).",
  "Les jours bas ne retirent rien à ce que tu sais faire.(dormir, souplesse arrière, manger, danser, etc.)",
  "Je suis en panne d'inspiration, appelle-moi dès que tu peux(veux ou besoin).",
  "Tu as le droit d’avoir un jour nul sans te résumer à ça.",
  "Même les plus petits pas comptent(une allision à tes petits pieds).",
  "Un grand homme a dit un jour: tu as des belles épaules",
  "Il y a une différence entre aller mal et être nulle. Essaie de ne pas mélanger les deux.",



];

export const MESSAGES = {
  "4-4": ["Je pense que c'est le jour parfait pour essayer un double salto arrière avec réception en grand écart.", "On dirait que tu es en pleine forme cérébrale ET comique. Les autres n'ont aucune chance.", "Aujourd'hui tu es à la fois intelligente ET drôle. Je pense que c'est un bug de l'univers." ,"Grosse journée de victoire intellectuelle et sociale. Rien à signaler, à part l'excès de talent.", "Intelligente et drôle le même jour. L'univers abuse un peu."],
  "4-3": ["Machine à faire rire les autres sans rien faire. Honnêtement, c'est presque énervant.", "Un cerveau ET de l'humour. Ne peux-tu donc pas nous laisser un peu de ressources ?"],
  "4-2": ["J'ai l'impression que tu es en mode génie discrète aujourd'hui. Tu vois tout, dis peu, calcules en silence.", "Tu penses trop vite pour faire de bonnes blagues. Les autres suivent à peine.", "Tu es clairement en mode réflexion. Pour le rire, il faudra patienter.", "Tu comprends tout très vite aujourd'hui. Pas forcément envie d'en faire un spectacle."],
  "4-1": ["Intelligente, oui. Mais côté humour, on repassera demain.", "Aujourd'hui tu analyses tout. Même les blagues n'osent pas entrer.", "Le cerveau tourne très bien. L'humour, lui, a posé une RTT.", "Tu es clairement en mode réflexion. Pour le rire, il faudra patienter.", "Beaucoup d'esprit, peu de légèreté. Journée sérieuse."],
  "4-0": ["Beaucoup de cerveau, très peu de fantaisie. Journée austère.", "Aujourd'hui, ton intelligence fait tout le travail et l'humour s'est mis en retrait.", "Tu es brillante, mais l'ambiance reste sévère.", "Le niveau intellectuel est haut. Le niveau humour, beaucoup moins et c'est OK.", "On sent une grande clarté d'esprit, mais zéro envie de faire rire qui que ce soit."],
  "3-4": ["Aujourd'hui drôle ET plutôt futée. Voilà une combinaison dangereuse.", "Plutôt intelligente et très drôle. Voilà l'illusion à la perfection.", "Tu tiens une combinaison redoutable.",],
  "3-3": ["On peut dire qu'aujourd'hui c'est mi-intelligence mi-humour. Un bon équilibre.", "Journée équilibrée. Ni le prix Nobel ni le Jamel Comedy Club. Et c'est bien."],
  "3-2": ["Plutôt futée et calme aujourd'hui. Tu observes. Tu retiens. Méfiance.", "Mode « je comprends tout mais je dis rien ». Tu accumules des munitions."],
  "3-1": ["Tu réfléchis et ne rigoles pas. C'est que tu prépares quelque chose.", "Journée sérieuse. Les blagues attendront demain."],
  "3-0": ["Futée mais dans un ennui profond. Le genre d'ennui philosophique.", "Tu penses, donc tu t'ennuies."],
  "2-4": ["Tu es hilarante aujourd'hui malgré toi. Les meilleures blagues sont accidentelles.", "Très drôle mais pas sûre de pourquoi. Mode comique instinctif."],
  "2-3": ["Tu es drôle et normale aujourd'hui. C'est une bonne journée, tout simplement.", "Rien d'extraordinaire mais l'humour est là. C'est déjà beaucoup."],
  "2-2": ["Ni génie ni bouffonne. Une version confort de toi-même finalement.", "C'est ok d'être dans le confort parfois. C'est même bien."],
  "2-1": ["La journée d'une personne normale finalement. Ça va aller.", "Neutre comme du pain de mie. Mais le pain de mie c'est plus assassin.","Journée moyenne, énergie moyenne, rien d'alarmant.", "C'est pas parfait mais c'est pas la fin du monde.", "Rien de spécial, mais rien de grave non plus.", "C'est juste une journée comme les autres."],
  "2-0": ["Dans la moyenne intellectuelle et ennui ferme. État classique du mercredi(et autres jour finissant en di).", "Le niveau « je fixe le plafond depuis 20 minutes ». C'est pas glorieux mais ça arrive à tout le monde."],
  "1-4": ["Tu te sens bête mais fais rire tout le monde. C'est le summum de l'intelligence sociale, en fait.", "Les gens les plus drôles sont souvent ceux qui se croient pas malins. Tu en es la preuve."],
  "1-3": ["Pas brillante mais drôle. Tu as trouvé la meilleure stratégie de survie sociale.", "Tu compenses brillamment. Personne ne voit rien."],
  "1-2": ["Tu te sens pas au top aujourd'hui. C'est ok, même les cellules ont besoin de mitose pour se régénérer.", "Journée un peu molle. Demain tu seras de retour.", "Tu n'es pas au sommet aujourd'hui, et ce n'est pas dramatique."],
  "1-1": ["En veille prolongée. Le système redémarrera quand la motivation aura fini sa sieste.", "Ni drôle ni futée, mais toujours Romane(romanesque). C'est déjà pas mal."],
  "1-0": ["Même si ton cerveau fait parfois des pauses syndicales et ton humour semble avoir été livré sans mode d'emploi, tu es quand même une personne rayonnante.", "On est sur un service minimum côté énergie mentale comme côté humeur."],
  "0-4": ["Si j'ai bien compris tu te sens très bête mais es absolument hilarante.C'est un bon superpouvoir.", "Se sentir bête et faire rire tout le monde : c'est du talent."],
  "0-3": ["Tu compenses ton cerveau en mode veille avec un humour de qualité. Bonne stratégie.", "Drôle malgré tout. Tu as le sens des priorités."],
  "0-2": ["Tu te sens nulle aujourd'hui, alors je te rappelle gentiment que tu as tort. Je suis très sérieux.", "Aujourd'hui semble avoir été une dûr journée pour ton cerceau, une peu de repos te ferait du bien."],
  "0-1": ["Commence petit : boire de l'eau, respirer, attendre que ça redescende.", "Ce n'est pas ton grand jour. Ça arrive, et ça passera."," L'inspiration est une vertue qui se perd, mais tu peux la retrouver en pensant à Abdoula"],
  "0-0": ["Aujourd'hui n'a rien d'un chef-d'œuvre. On fera mieux demain.", "Jour compliqué. Le seul objectif, c'est de tenir sans te juger.", "On a connu plus glorieux, mais survivre à la journée est déjà un programme."],
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
