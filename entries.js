// Entries management module
export class EntriesManager {
  constructor(elements, storage, validator, dataUtils, dateUtils) {
    this.elements = elements;
    this.storage = storage;
    this.validator = validator;
    this.dataUtils = dataUtils;
    this.dateUtils = dateUtils;
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
      
      const dateKey = this.state.isEditMode ? this.state.editingDate : this.dateUtils.todayKey();
      
      // Validate and prepare data
      const payload = {
        i: parseInt(this.elements.intellSlider.value) || 2,
        h: parseInt(this.elements.humorSlider.value) || 2,
        e: parseInt(this.elements.energySlider.value) || 2,
        positive: this.elements.positiveField.value.trim(),
        qanswer: this.elements.questionField.value.trim(),
        note: this.elements.noteField.value.trim()
      };
      
      // Simple validation
      if (payload.i < 0 || payload.i > 4) payload.i = 2;
      if (payload.h < 0 || payload.h > 4) payload.h = 2;
      if (payload.e < 0 || payload.e > 4) payload.e = 2;
      
      console.log('Saving entry:', payload);
      
      // Save to storage
      await this.storage.set("romane-" + dateKey, JSON.stringify(payload));
      console.log('Entry saved successfully');
      
      // Success feedback
      if (!this.state.isEditMode) {
        this.launchConfetti();
      }
      
      const displayDate = this.dateUtils.formatDate(dateKey);
      if (this.state.isEditMode) {
        this.elements.saveStatus.textContent = `Humeur du ${displayDate} enregistrée ✓`;
        setTimeout(() => {
          this.exitEditMode();
          this.elements.saveStatus.textContent = "";
        }, 2000);
      } else {
        this.elements.saveStatus.textContent = "Humeur du jour enregistrée ✓";
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
      const res = await this.storage.get("romane-" + this.dateUtils.todayKey());
      if (res && res.value) {
        const data = JSON.parse(res.value);
        
        // Validate loaded data
        if (data.i !== undefined && data.h !== undefined && data.e !== undefined) {
          this.elements.intellSlider.value = data.i;
          this.elements.humorSlider.value = data.h;
          this.elements.energySlider.value = data.e;
        }
        
        this.elements.positiveField.value = data.positive || "";
        this.elements.questionField.value = data.qanswer || "";
        this.elements.noteField.value = data.note || "";
        
        // Update character counts
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
      
      const res = await this.storage.get("romane-" + dateStr);
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
      
      const dateFr = this.dateUtils.formatDate(dateStr, 'long');
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

  showPastEntryForm() {
    try {
      this.elements.pastEntryForm.style.display = 'block';
      this.elements.addPastBtn.style.display = 'none';
      
      // Set max date to yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.elements.pastDatePicker.max = yesterday.toISOString().split('T')[0];
      
      // Set default date to yesterday
      this.elements.pastDatePicker.value = yesterday.toISOString().split('T')[0];
      
      this.elements.pastEntryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      console.error('Error showing past entry form:', error);
    }
  }

  hidePastEntryForm() {
    try {
      this.elements.pastEntryForm.style.display = 'none';
      this.elements.addPastBtn.style.display = 'block';
    } catch (error) {
      console.error('Error hiding past entry form:', error);
    }
  }

  async selectPastDate() {
    try {
      const selectedDate = this.elements.pastDatePicker.value;
      if (!selectedDate) {
        this.elements.saveStatus.textContent = "Veuillez sélectionner une date";
        this.elements.saveStatus.className = "save-status error";
        return;
      }
      
      // Convert to YYYY-M-D format for our system
      const date = new Date(selectedDate);
      const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      
      // Check if entry already exists
      const res = await this.storage.get("romane-" + dateKey);
      if (res && res.value) {
        this.elements.saveStatus.textContent = "Une entrée existe déjà pour cette date. Utilisez le calendrier pour la modifier.";
        this.elements.saveStatus.className = "save-status error";
        return;
      }
      
      // Enter add mode for past date
      this.enterAddPastMode(dateKey, selectedDate);
    } catch (error) {
      console.error('Error selecting past date:', error);
    }
  }

  enterAddPastMode(dateKey, displayDate) {
    try {
      this.state.editingDate = dateKey;
      this.state.isEditMode = true;
      
      // Clear form for new entry
      this.elements.intellSlider.value = 2;
      this.elements.humorSlider.value = 2;
      this.elements.energySlider.value = 2;
      
      this.elements.positiveField.value = "";
      this.elements.questionField.value = "";
      this.elements.noteField.value = "";
      
      // Update UI for past date
      const dateFr = this.dateUtils.formatDate(dateKey, 'long');
      this.elements.sectionLabel.textContent = `Ajouter une entrée pour le ${dateFr}`;
      this.elements.saveBtn.textContent = `Enregistrer le ${dateFr}`;
      this.elements.saveBtn.classList.add('editing');
      
      // Hide date selector form
      this.hidePastEntryForm();
      
      // Scroll to main form
      document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error entering add past mode:', error);
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

  setupEventListeners() {
    try {
      // Main save button
      this.elements.saveBtn.addEventListener("click", () => this.saveEntry());
      
      // Past entry buttons
      if (this.elements.addPastBtn) {
        this.elements.addPastBtn.addEventListener("click", () => this.showPastEntryForm());
      }
      if (this.elements.selectPastDateBtn) {
        this.elements.selectPastDateBtn.addEventListener("click", () => this.selectPastDate());
      }
      
      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault();
          if (!this.elements.saveBtn.disabled) {
            this.saveEntry();
          }
        }
        
        // Escape key to exit past entry form
        if (e.key === 'Escape' && this.elements.pastEntryForm?.style.display === 'block') {
          this.hidePastEntryForm();
        }
      });
    } catch (error) {
      console.error('Entries event listeners setup error:', error);
    }
  }
}
