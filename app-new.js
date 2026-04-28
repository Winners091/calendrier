import { 
  INTELL_LABELS, HUMOR_LABELS, ENERGY_LABELS, MONTHS, DAYS_CAL, CATEGORIES, 
  DAILY_QUESTIONS, ENCOURAGEMENTS, MESSAGES, CONF_COLORS, VALIDATION_RULES, ERROR_MESSAGES 
} from './config.js';
import { storage, validator, dateUtils, dataUtils, errorHandler, performanceUtils } from './utils.js';
import { ThemeManager } from './theme.js';
import { ExportManager } from './export.js';
import { EntriesManager } from './entries.js';
import { CalendarManager } from './calendar.js';
import { GardenManager } from './garden.js';
import { UIManager } from './ui.js';

// Application state
const state = {
  viewYear: new Date().getFullYear(),
  viewMonth: new Date().getMonth()
};

// DOM elements cache
const elements = {};

// Initialize DOM elements
function initializeElements() {
  try {
    elements.intellSlider = document.getElementById("intell-slider");
    elements.humorSlider = document.getElementById("humor-slider");
    elements.energySlider = document.getElementById("energy-slider");
    elements.socialSlider = document.getElementById("social-slider");
    elements.msgBox = document.getElementById("message-box");
    elements.saveBtn = document.getElementById("save-btn");
    elements.saveStatus = document.getElementById("save-status");
    elements.exportBtn = document.getElementById("export-btn");
    elements.sectionLabel = document.getElementById("section-label");
    elements.positiveField = document.getElementById("positive-field");
    elements.questionField = document.getElementById("question-field");
    elements.noteField = document.getElementById("note-field");
    elements.themeToggle = document.getElementById("theme-toggle");
    elements.addPastBtn = document.getElementById("add-past-btn");
    elements.pastEntryForm = document.getElementById("past-entry-form");
    elements.pastDatePicker = document.getElementById("past-date-picker");
    elements.selectPastDateBtn = document.getElementById("select-past-date-btn");
    
    return true;
  } catch (error) {
    errorHandler.handle(error, 'DOM Elements Initialization');
    return false;
  }
}

// Initialize managers
let themeManager, exportManager, entriesManager, calendarManager, gardenManager, uiManager;

function initializeManagers() {
  try {
    themeManager = new ThemeManager(elements, storage);
    exportManager = new ExportManager(elements, storage, dateUtils);
    entriesManager = new EntriesManager(elements, storage, validator, dataUtils, dateUtils);
    calendarManager = new CalendarManager(elements, storage, dataUtils, errorHandler);
    gardenManager = new GardenManager(elements, storage, dataUtils, errorHandler);
    uiManager = new UIManager(elements, dataUtils, validator, performanceUtils);
    
    // Set up calendar state
    calendarManager.state = state;
    
    return true;
  } catch (error) {
    errorHandler.handle(error, 'Managers Initialization');
    return false;
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
      icon.textContent = "🏆";
    } else if (streak >= 14) {
      icon.textContent = "⚡";
    } else if (streak >= 7) {
      icon.textContent = "🔥";
    } else {
      icon.textContent = "✨";
    }
    
    if (streak === 7 || streak === 14 || streak === 30 || streak === 100) {
      text.innerHTML = `<strong>${streak} jours de suite</strong> — Incroyable, tu tiens le cap ! 🎉`;
    } else if (streak === 1) {
      text.innerHTML = `C'est parti pour <strong>le jour 1</strong> — chaque grand streak commence comme ça.`;
    } else {
      text.innerHTML = `<strong>${streak} jours</strong> d'affilée — t'es régulière, c'est rare.`;
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
      container.innerHTML = `<p class="recap-empty">Aucune entrée cette semaine encore — commence aujourd'hui !</p>`;
      return;
    }
    
    let positives = [];
    
    days.forEach((d, i) => {
      const res = entries[i];
      const div = document.createElement("div");
      div.className = "recap-day";
      const isToday = i === dow;
      const dayName = d.toLocaleDateString("fr-FR", { weekday: "long" });
      
      let moodLabel = "—", dotColor = "#b5aca5", noteText = "", posText = "";
      
      if (res && res.value) {
        try {
          const data = JSON.parse(res.value);
          const catKey = dataUtils.getCategory(data.i, data.h);
          const cat = CATEGORIES[catKey];
          moodLabel = cat.label;
          dotColor = cat.color;
          const SOCIAL_LABELS = ["Isolée", "Peu entourée", "Correcte", "Bien entourée", "Liens forts"];
          const energyLabel = data.e !== undefined ? ` · Énergie : ${ENERGY_LABELS[data.e]}` : "";
          const socialLabel = data.s !== undefined ? ` · Liens : ${SOCIAL_LABELS[data.s]}` : "";
          
          if (data.note) noteText = data.note;
          if (data.positive) {
            posText = data.positive;
            positives.push(data.positive);
          }
          
          div.innerHTML = `
            <div class="recap-day-header">
              <div class="recap-day-dot" style="background:${dotColor}"></div>
              <span class="recap-day-name">${dayName}${isToday ? " (aujourd'hui)" : ""}</span>
              <span class="recap-day-mood">${moodLabel}${energyLabel}${socialLabel}</span>
            </div>
            ${posText ? `<p class="recap-day-note">✓ ${posText}</p>` : ""}
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
        
        // Refresh components when switching tabs (with lazy loading)
        if (targetTab === 'garden') {
          performanceUtils.lazyLoad(document.querySelector('.garden-scene'), () => {
            gardenManager.renderGarden();
          });
        } else if (targetTab === 'history') {
          performanceUtils.lazyLoad(document.querySelector('.cal-grid'), () => {
            calendarManager.renderCalendar();
            renderRecap();
          });
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

function scheduleNextDayRefresh() {
  try {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
    setTimeout(() => {
      updateTodayDate();
      refreshAllComponents();
      scheduleNextDayRefresh();
    }, midnight - now);
  } catch (error) {
    errorHandler.handle(error, 'Schedule Next Day Refresh');
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

// Global app object for inter-module communication
window.app = {
  onDayClick: (dateKey) => {
    entriesManager.enterEditMode(dateKey);
  }
};

// Application initialization
async function init() {
  try {
    console.log('Initializing Romane du jour...');
    
    // Initialize elements
    if (!initializeElements()) {
      throw new Error('Failed to initialize DOM elements');
    }
    
    // Initialize managers
    if (!initializeManagers()) {
      throw new Error('Failed to initialize managers');
    }
    
    // Initialize theme
    themeManager.initialize();
    
    // Setup character counts
    uiManager.setupCharCount(elements.positiveField, document.getElementById("positive-count"), 280);
    uiManager.setupCharCount(elements.questionField, document.getElementById("question-count"), 400);
    uiManager.setupCharCount(elements.noteField, document.getElementById("note-count"), 500);
    
    // Set initial values
    uiManager.setupDailyQuestion(DAILY_QUESTIONS);
    updateTodayDate();
    
    // Load initial data
    await entriesManager.loadTodayData();
    
    // Setup event listeners
    uiManager.setupEventListeners();
    themeManager.setupEventListeners();
    exportManager.setupEventListeners();
    calendarManager.setupEventListeners();
    gardenManager.setupEventListeners();
    
    // Setup tabs
    setupTabs();
    
    // Initial render
    await refreshAllComponents();
    
    // Schedule periodic updates
    scheduleNextDayRefresh();
    
    console.log('Romane du jour initialized successfully');
    
  } catch (error) {
    const message = errorHandler.handle(error, 'Application Initialization');
    console.error('Initialization failed:', message);
    
    // Show user-friendly error message
    if (elements.saveStatus) {
      elements.saveStatus.textContent = "Erreur lors de l'initialisation. Actualisez la page.";
      elements.saveStatus.className = "save-status error";
    }
  }
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
