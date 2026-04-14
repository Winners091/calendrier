# Romane du jour

Une application web de suivi d'humeur personnelle avec interface moderne et architecture modulaire.

## 🌟 Démonstration

**[➡️ Voir l'application en ligne](https://[username].github.io/Romane/)** *(remplacer [username] par votre nom d'utilisateur GitHub)*

## 🎯 Fonctionnalités principales

### Suivi quotidien
- **Évaluation d'humeur** via curseurs (intellect, humour, énergie)
- **Messages contextuels** générés selon les combinaisons d'humeur
- **Journal personnel** avec questions quotidiennes
- **Support des jours passés** pour compléter les données manquantes

### Visualisation
- **Jardin métaphorique** qui reflète les humeurs enregistrées
- **Calendrier coloré** par type d'humeur
- **Graphiques de tendance** hebdomadaires
- **Statistiques** mensuelles et hebdomadaires

### Fonctionnalités pratiques
- **Mode sombre/clair** avec persistance locale
- **Export CSV** des données
- **Suivi de streak** pour la régularité
- **Mode édition** pour modifier les entrées existantes

## 🚀 Démarrage rapide

### Option 1 : GitHub Pages (recommandé)
1. Fork ce dépôt
2. Activez GitHub Pages dans les paramètres du dépôt
3. Accédez à l'application via `https://[username].github.io/Romane/`

### Option 2 : Local
1. Clonez ce dépôt : `git clone https://github.com/[username]/Romane.git`
2. Servez les fichiers avec un serveur local : `python -m http.server 8000`
3. Ouvrez `http://localhost:8000` dans votre navigateur

### Option 3 : Bundle local
1. Ouvrez directement `app-modular-bundle.html` dans le navigateur
2. Fonctionne sans serveur mais sans modules ES6

## � Installation et déploiement

### Prérequis
- Navigateur moderne supportant les modules ES6
- Serveur web pour la version modulaire

### Déploiement sur GitHub Pages
1. **Fork ce dépôt** en cliquant sur le bouton "Fork" en haut
2. **Clonez votre fork** :
   ```bash
   git clone https://github.com/[VOTRE-USERNAME]/Romane.git
   cd Romane
   ```
3. **Activez GitHub Pages** :
   - Allez dans les paramètres de votre dépôt
   - Cliquez sur "Pages" dans le menu de gauche
   - Sous "Build and deployment", sélectionnez "Deploy from a branch"
   - Choisissez la branche `main` et le dossier `/root`
   - Cliquez sur "Save"
4. **Attendez le déploiement** (quelques minutes)
5. **Accédez à votre application** : `https://[VOTRE-USERNAME].github.io/Romane/`

### Déploiement local
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/[VOTRE-USERNAME]/Romane.git
   cd Romane
   ```
2. Servez les fichiers :
   ```bash
   # Avec Python 3
   python -m http.server 8000
   
   # Avec Node.js (si installé)
   npx serve .
   
   # Avec PHP
   php -S localhost:8000
   ```
3. Ouvrez `http://localhost:8000` dans votre navigateur

## �🏗️ Architecture du code

### Structure des fichiers
```
├── index.html              # Page principale (version bundle)
├── index-local.html        # Version pour utilisation locale
├── index-modular.html     # Version avec modules ES6
├── styles.css              # Styles complets avec variables CSS
├── config.js               # Configuration et constantes
├── utils.js               # Fonctions utilitaires réutilisables
├── app-bundle.js          # Logique compilée (version locale)
├── app.js                 # Logique principale (version modules)
├── theme.js               # Gestion du thème sombre/clair
├── export.js              # Exportation des données
├── entries.js             # Gestion des entrées (création, modification)
├── calendar.js            # Logique du calendrier et tendances
├── garden.js              # Rendu du jardin métaphorique
├── ui.js                  # Interactions UI (sliders, compteurs, etc.)
├── sw.js                  # Service Worker pour PWA
├── tests/
│   ├── utils.test.js      # Tests unitaires pour utils.js
│   └── test-runner.html    # Interface pour exécuter les tests
└── README.md               # Documentation
```

### Modules spécialisés

#### `config.js`
Configuration centralisée :
- Constantes de l'application
- Labels et messages
- Règles de validation
- Catégories d'humeur

#### `utils.js`
Fonctions utilitaires testables :
- **Storage** : Abstraction du stockage local
- **Validator** : Validation des entrées utilisateur
- **DateUtils** : Manipulation et formatage de dates
- **DataUtils** : Traitement des données d'humeur
- **ErrorHandler** : Gestion centralisée des erreurs
- **PerformanceUtils** : Optimisations (debounce, throttle, lazy loading)

#### Modules métier
- **`theme.js`** : Gestion du thème clair/sombre
- **`export.js`** : Exportation CSV des données
- **`entries.js`** : Création et modification des entrées
- **`calendar.js`** : Calendrier, statistiques et tendances
- **`garden.js`** : Jardin métaphorique et encouragements
- **`ui.js`** : Interactions utilisateur (sliders, messages)

#### `app.js` / `app-new.js`
Orchestrateur principal :
- Initialisation des modules
- Coordination inter-modules
- Gestion du cycle de vie de l'application

## 🎨 Améliorations apportées

### 1. Architecture modulaire
- **Séparation des responsabilités** : Chaque fichier a un rôle clair
- **Modules ES6** : Import/export pour une meilleure maintenabilité
- **Configuration centralisée** : Toutes les constantes dans un fichier dédié

### 2. Gestion des erreurs robuste
- **Try/catch détaillés** dans toutes les fonctions critiques
- **Messages d'erreur conviviaux** pour l'utilisateur
- **Fallbacks multiples** pour le stockage (localStorage → mémoire)
- **Logging structuré** pour le débogage

### 3. Validation des entrées
- **Validation en temps réel** des champs de texte
- **Limites de caractères** avec feedback visuel
- **Validation des curseurs** avec plages définies
- **Messages d'erreur contextuels**

### 4. Optimisation des performances
- **Lazy loading** pour les composants lourds (jardin, calendrier)
- **Debounce/throttle** pour les événements fréquents
- **Mise en cache des éléments DOM**
- **Chargement asynchrone** des données

### 5. Mode sombre
- **Variables CSS** pour les thèmes clair/sombre
- **Toggle persistant** dans localStorage
- **Transitions fluides** entre les thèmes
- **Accessibilité** préservée

### 6. Séparation logique/présentation
- **Architecture MVC** implicite
- **Fonctions pures** pour le traitement des données
- **Gestion d'état centralisée**
- **Components réutilisables**

## 🚀 Utilisation

### Démarrage
- **Version locale** : Ouvrir `index-local.html` directement dans le navigateur
- **Version serveur** : Servir les fichiers via un serveur web HTTP(S)
- Les données sont sauvegardées localement dans le navigateur

### Tests
- Ouvrir `tests/test-runner.html` pour exécuter les tests unitaires
- Les tests valident les fonctions utilitaires et la logique métier

### Raccourcis clavier
- `Ctrl/Cmd + S` : Enregistrer l'humeur du jour
- `Ctrl/Cmd + E` : Exporter les données en CSV
- `Échap` : Fermer le formulaire d'ajout de jour passé

## ⚠️ Limitations techniques

### Navigateurs
- **Modules ES6** : Nécessite un navigateur moderne (Chrome 61+, Firefox 60+, Safari 10.1+)
- **Service Worker** : Support PWA partiel (cache uniquement)
- **Stockage local** : Limité par le navigateur (~5-10 Mo)

### Architecture
- **Version bundle** : `app-bundle.js` pour compatibilité maximale
- **Version modulaire** : `app-new.js` + modules séparés pour maintenance
- **Pas de serveur** : Application entièrement client-side

### Navigation
- **Onglets** : Basculer entre Aujourd'hui, Jardin, et Historique
- **Calendrier** : Naviguer entre les mois avec les flèches
- **Édition** : Cliquer sur un jour passé pour le modifier

## 🔧 Personnalisation

### Thèmes
Les thèmes sont définis avec des variables CSS dans `styles.css` :
```css
:root {
  --bg: #faf9f6;           /* Fond principal */
  --surface: #ffffff;       /* Surface des cartes */
  --text: #1c1710;         /* Texte principal */
  --accent: #bf5b43;       /* Couleur d'accent */
}

:root.dark {
  --bg: #1a1815;
  --surface: #2a2520;
  --text: #f5f0e8;
  --accent: #e67e5c;
}
```

### Messages personnalisés
Modifier les constantes dans `config.js` :
- `DAILY_QUESTIONS` : Questions quotidiennes
- `MESSAGES` : Messages selon les combinaisons d'humeur
- `ENCOURAGEMENTS` : Messages d'encouragement pour le jardin

## 📊 Données

### Format de stockage
Les données sont sauvegardées au format JSON :
```json
{
  "i": 3,                    // Intellect (0-4)
  "h": 2,                    // Humour (0-4)
  "e": 3,                    // Énergie (0-4)
  "positive": "Texte...",    // Fait positif
  "qanswer": "Réponse...",   // Réponse à la question
  "note": "Note libre...",    // Note libre
  "encouraged": true,        // Jardin arrosé
  "encouragement": "Message" // Message d'encouragement
}
```

### Export CSV
L'export génère un fichier CSV avec :
- Date
- Niveaux d'intellect, humour, énergie
- Catégorie d'humeur
- Réponses aux questions
- Notes personnelles

## 🌐 Accessibilité

### ARIA labels
- Rôles sémantiques (`tablist`, `tabpanel`, `grid`)
- Labels descriptifs pour les lecteurs d'écran
- États `aria-live` pour les mises à jour dynamiques

### Navigation clavier
- Tabulation logique entre les éléments
- Raccourcis clavier pour les actions principales
- Focus visible sur tous les éléments interactifs

### Contraste et lisibilité
- Variables CSS pour un contraste optimal
- Tailles de police adaptatives
- Support du mode réduit mouvement

## 🔒 Confidentialité

### Stockage local
- **Aucune donnée envoyée à des serveurs externes**
- **Stockage entièrement local** dans le navigateur
- **Export possible** pour sauvegarder les données

### Service Worker
- Support PWA pour utilisation hors ligne
- Mise en cache des ressources statiques

## 🛠️ Développement

### Technologies utilisées
- **HTML5** sémantique et accessible
- **CSS3** avec variables et animations
- **JavaScript ES6+** avec modules
- **Canvas API** pour les graphiques et animations
- **Service Worker** pour PWA

### Outils de développement
- **Modules ES6** pour une meilleure organisation
- **Gestion d'erreurs structurée**
- **Performance monitoring** intégré
- **Validation automatique** des entrées

## 📝 Notes de version

### v2.0 - Version améliorée
- ✅ Architecture modulaire complète
- ✅ Gestion d'erreurs robuste
- ✅ Validation des entrées utilisateur
- ✅ Mode sombre avec toggle
- ✅ Lazy loading des composants
- ✅ Optimisation des performances
- ✅ Séparation logique/présentation
- ✅ Documentation complète

### v1.0 - Version originale
- Application monolithique
- Fonctionnalités de base
- Stockage local simple

## 🤝 Contribuer

### Structure de code
- Suivre les patterns établis dans les modules existants
- Utiliser les fonctions utilitaires de `utils.js`
- Ajouter la gestion d'erreurs pour toute nouvelle fonctionnalité

### Tests
- Tester dans différents navigateurs
- Vérifier l'accessibilité avec les lecteurs d'écran
- Valider le mode sombre/clair

---

**Développé avec ❤️ pour un suivi d'humeur personnel et bienveillant**
