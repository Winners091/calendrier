// Garden module
export class GardenManager {
  constructor(elements, storage, dataUtils, errorHandler) {
    this.elements = elements;
    this.storage = storage;
    this.dataUtils = dataUtils;
    this.errorHandler = errorHandler;
    this.aiService = null; // sera chargé dynamiquement
    this._aiLoaded = false;
  }

  // Chargement paresseux et sécurisé du service IA
  async _loadAIService() {
    if (this._aiLoaded) return;
    this._aiLoaded = true;
    try {
      const { AIService } = await import('./ai-service.js');
      this.aiService = new AIService(this.dataUtils);
    } catch (err) {
      console.warn('[GardenManager] ai-service.js non disponible, mode fallback activé.', err);
      this.aiService = null;
    }
  }

  // Génère un encouragement : via IA si disponible, sinon via les phrases codées en dur
  async _getEncouragement(i, h, e) {
    await this._loadAIService();
    if (this.aiService) {
      try {
        return await this.aiService.generateEncouragement(i, h, e);
      } catch (err) {
        console.warn('[GardenManager] Erreur IA, basculement sur les phrases locales.', err);
      }
    }
    return this._getRandomEncouragementFallback();
  }

  // Phrases de secours (identiques à l'original) — jamais supprimées
  _getRandomEncouragementFallback() {
    const encouragements = [
      "Les jours où tu te sens nulle ne valent pas tout dire.",
      "Tu es fatiguée, pas ratée.",
      "Même fatiguée, tu restes quelqu'un d'énergique.",
      "Tu n'as pas besoin d'être brillante tous les jours pour avoir de la valeur.",
      "On arrose aussi les jours compliqués. Surtout eux.",
      "Tu peux être en vrac et rester admirable.",
      "Les jours bas ne retirent rien à ce que tu sais faire.",
      "Tu as le droit d'avoir un jour nul sans te résumer à ça.",
      "Même les plus petits pas comptent.",
      "Il y a une différence entre aller mal et être nulle.",
    ];
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  }

  async renderGarden() {
    try {
      const entries = (await this.dataUtils.loadAllEntries(40)).slice(-7);
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
                     ' · ' + this.getCategory(this.dataUtils.getCategory(entry.data.i, entry.data.h)).label;
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
      await this.handleTodayEncouragement(hasSad, waterRow, message);
      
      // Update rainbow and message
      this.updateGardenMessage(entries.length, hasSad, message, rainbow);
    } catch (error) {
      this.errorHandler.handle(error, 'Garden Render');
    }
  }

  async handleTodayEncouragement(hasSad, waterRow, message) {
    try {
      const todayRes = await this.storage.get('romane-' + this.getTodayKey()).catch(() => null);
      let todayData = null;
      
      if (todayRes && todayRes.value) {
        try {
          todayData = JSON.parse(todayRes.value);
        } catch (error) {
          console.error('Error parsing today data:', error);
        }
      }
      
      const todaysCat = todayData ? this.dataUtils.getCategory(todayData.i, todayData.h) : null;
      const encouragementBox = document.getElementById('encouragement-box');
      
      if (todaysCat === 'red' || todaysCat === 'gray') {
        const b = document.createElement('button');
        b.className = 'water-btn';
        b.textContent = "Arroser d'encouragement";

        b.onclick = async () => {
          try {
            if (!todayData) return;

            b.disabled = true;
            b.textContent = "Génération en cours…";
            encouragementBox.textContent = "💧 …";

            const encouragementText = await this._getEncouragement(
              todayData.i,
              todayData.h,
              todayData.e !== undefined ? todayData.e : 2
            );

            todayData.encouraged = true;
            todayData.encouragement = encouragementText;
            await this.storage.set('romane-' + this.getTodayKey(), JSON.stringify(todayData));
            
            encouragementBox.textContent = '💧 ' + todayData.encouragement;
            b.textContent = "Arroser à nouveau";
            b.disabled = false;

            this.renderGarden();
          } catch (error) {
            this.errorHandler.handle(error, 'Garden Watering');
            b.textContent = "Arroser d'encouragement";
            b.disabled = false;
          }
        };

        waterRow.appendChild(b);
        
        encouragementBox.textContent = todayData?.encouragement ? 
          '💧 ' + todayData.encouragement : 
          "Aujourd'hui la plante a surtout besoin d'un peu d'attention.";

      } else if (todaysCat === 'teal') {
        encouragementBox.textContent = '🌸 Aujourd\'hui le jardin prend bien la lumière.';
      } else if (todaysCat === 'amber' || todaysCat === 'purple') {
        encouragementBox.textContent = "🌱 Aujourd'hui, ça pousse doucement. C'est déjà très bien.";
      } else {
        encouragementBox.textContent = 'Clique sur une humeur du jour et ton jardin poussera ici.';
      }
    } catch (error) {
      // En cas d'erreur totale, on affiche quand même le bouton si hasSad
      console.error('handleTodayEncouragement error:', error);
      if (hasSad) {
        const b = document.createElement('button');
        b.className = 'water-btn';
        b.textContent = "Arroser d'encouragement";
        b.onclick = () => {
          const encouragementBox = document.getElementById('encouragement-box');
          encouragementBox.textContent = '💧 ' + this._getRandomEncouragementFallback();
        };
        waterRow.appendChild(b);
      }
    }
  }

  updateGardenMessage(entriesLength, hasSad, message, rainbow) {
    if (entriesLength >= 7) {
      rainbow.classList.add('visible');
      const sadPart = hasSad ? ' Les jours plus bas demandent juste un peu plus de soin.' : '';
      message.textContent = "Peu importe l'humeur du jour, tu as fait pousser quelque chose de vivant." + sadPart + ' Tu es toujours intelligente et drôle à ta façon.';
    } else {
      rainbow.classList.remove('visible');
      message.textContent = "Chaque jour ajouté fait avancer le jardin, même les jours moins simples.";
    }
  }

  plantTypeFromEntry(entry) {
    try {
      const { i, h } = entry.data;
      const cat = this.dataUtils.getCategory(i, h);
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

  getCategory(key) {
    const categories = {
      teal: { label: "Génie drôle", color: "#4fba96", cssClass: "mood-teal" },
      purple: { label: "Génie ennuyeuse", color: "#8e83c9", cssClass: "mood-purple" },
      amber: { label: "Drôle mais bête", color: "#d9932a", cssClass: "mood-amber" },
      red: { label: "Bête et triste", color: "#d04f4e", cssClass: "mood-red" },
      gray: { label: "Neutre", color: "#979790", cssClass: "mood-gray" },
    };
    return categories[key] || categories.gray;
  }

  getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  setupEventListeners() {
    // Garden doesn't have specific event listeners beyond the water button
    // which is handled in renderGarden
  }
}
