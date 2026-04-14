import { 
  INTELL_LABELS, HUMOR_LABELS, ENERGY_LABELS, MONTHS, DAYS_CAL, CATEGORIES, 
  DAILY_QUESTIONS, ENCOURAGEMENTS, MESSAGES, CONF_COLORS, VALIDATION_RULES, ERROR_MESSAGES 
} from './config.js';
import { storage, validator, dateUtils, dataUtils, errorHandler, performanceUtils } from './utils.js';

// Application state
const state = {
  intellVal: 2,
  humorVal: 2,
  energyVal: 2,
  viewYear: new Date().getFullYear(),
  viewMonth: new Date().getMonth(),
  editingDate: null,
  isEditMode: false,
  theme: localStorage.getItem('romane-theme') || 'light'
};

// DOM elements cache
const elements = {};

// Initialize DOM elements
function initializeElements() {
  try {
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

// Theme management
function initializeTheme() {
  try {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
      if (elements.themeToggle) {
        elements.themeToggle.textContent = '☀️';
      }
    }
  } catch (error) {
    errorHandler.handle(error, 'Theme Initialization');
  }
}

function toggleTheme() {
  try {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('romane-theme', state.theme);
    
    if (elements.themeToggle) {
      elements.themeToggle.textContent = state.theme === 'dark' ? '☀️' : '🌙';
    }
  } catch (error) {
    errorHandler.handle(error, 'Theme Toggle');
  }
}

// Character count setup with validation
function setupCharCount(field, countEl, max) {
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
    errorHandler.handle(error, 'Character Count Setup');
  }
}

// Slider management with validation
function updateSliderFill(input) {
  try {
    if (!input) return;
    const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty("--pct", pct + "%");
  } catch (error) {
    errorHandler.handle(error, 'Slider Fill Update');
  }
}

function updateMessage() {
  try {
    state.intellVal = validator.validateSlider(elements.intellSlider.value, VALIDATION_RULES.slider);
    state.humorVal = validator.validateSlider(elements.humorSlider.value, VALIDATION_RULES.slider);
    state.energyVal = validator.validateSlider(elements.energySlider.value, VALIDATION_RULES.slider);
    
    // Update labels
    document.getElementById("intell-label").textContent = INTELL_LABELS[state.intellVal];
    document.getElementById("humor-label").textContent = HUMOR_LABELS[state.humorVal];
    document.getElementById("energy-label").textContent = ENERGY_LABELS[state.energyVal];
    
    // Update ARIA attributes
    elements.intellSlider.setAttribute("aria-valuenow", state.intellVal);
    elements.intellSlider.setAttribute("aria-valuetext", INTELL_LABELS[state.intellVal]);
    elements.humorSlider.setAttribute("aria-valuenow", state.humorVal);
    elements.humorSlider.setAttribute("aria-valuetext", HUMOR_LABELS[state.humorVal]);
    elements.energySlider.setAttribute("aria-valuenow", state.energyVal);
    elements.energySlider.setAttribute("aria-valuetext", ENERGY_LABELS[state.energyVal]);
    
    // Update slider fills
    updateSliderFill(elements.intellSlider);
    updateSliderFill(elements.humorSlider);
    updateSliderFill(elements.energySlider);
    
    // Update message with animation
    elements.msgBox.style.opacity = ".25";
    setTimeout(() => {
      elements.msgBox.textContent = dataUtils.getMessage(state.intellVal, state.humorVal, MESSAGES);
      elements.msgBox.style.opacity = "1";
    }, 140);
  } catch (error) {
    errorHandler.handle(error, 'Message Update');
  }
}

// Save functionality with validation
async function saveToday() {
  try {
    elements.saveBtn.disabled = true;
    elements.saveStatus.textContent = "";
    elements.saveStatus.className = "save-status";
    
    const dateKey = state.isEditMode ? state.editingDate : dateUtils.todayKey();
    
    // Validate and prepare data
    const payload = {
      i: state.intellVal,
      h: state.humorVal,
      e: state.energyVal,
      positive: validator.validateText(elements.positiveField.value, VALIDATION_RULES.positive),
      qanswer: validator.validateText(elements.questionField.value, VALIDATION_RULES.question),
      note: validator.validateText(elements.noteField.value, VALIDATION_RULES.note)
    };
    
    // Validate complete entry
    validator.validateEntry(payload);
    
    // Save to storage
    await storage.set("romane-" + dateKey, JSON.stringify(payload));
    
    // Success feedback
    if (!state.isEditMode) {
      launchConfetti();
    }
    
    const displayDate = dateUtils.formatDate(dateKey);
    if (state.isEditMode) {
      elements.saveStatus.textContent = `Humeur du ${displayDate} enregistrée ✓`;
      setTimeout(() => {
        exitEditMode();
        elements.saveStatus.textContent = "";
      }, 2000);
    } else {
      elements.saveStatus.textContent = "Humeur du jour enregistrée ✓";
      setTimeout(() => {
        elements.saveStatus.textContent = "";
      }, 3000);
    }
    
    // Refresh UI components
    await refreshAllComponents();
    
  } catch (error) {
    const message = errorHandler.handle(error, 'Save Operation');
    elements.saveStatus.textContent = message;
    elements.saveStatus.className = "save-status error";
  } finally {
    elements.saveBtn.disabled = false;
  }
}

// Load today's data
async function loadTodayData() {
  try {
    const res = await storage.get("romane-" + dateUtils.todayKey());
    if (res && res.value) {
      const data = JSON.parse(res.value);
      
      // Validate loaded data
      if (data.i !== undefined && data.h !== undefined && data.e !== undefined) {
        elements.intellSlider.value = data.i;
        elements.humorSlider.value = data.h;
        elements.energySlider.value = data.e;
        state.intellVal = data.i;
        state.humorVal = data.h;
        state.energyVal = data.e;
      }
      
      elements.positiveField.value = data.positive || "";
      elements.questionField.value = data.qanswer || "";
      elements.noteField.value = data.note || "";
      
      // Update character counts
      ["positive", "question", "note"].forEach(name => {
        const field = document.getElementById(name + "-field");
        const countEl = document.getElementById(name + "-count");
        if (field && countEl) {
          countEl.textContent = `${field.value.length} / ${field.maxLength}`;
        }
      });
    }
    updateMessage();
  } catch (error) {
    errorHandler.handle(error, 'Load Today Data');
  }
}

// Calendar functionality
async function renderCalendar() {
  try {
    document.getElementById("month-title").textContent = `${MONTHS[state.viewMonth]} ${state.viewYear}`;
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
    
    const firstDay = new Date(state.viewYear, state.viewMonth, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();
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
    const monthData = await dataUtils.loadMonthData(state.viewYear, state.viewMonth, daysInMonth);
    const countMap = { teal: 0, purple: 0, amber: 0, red: 0, gray: 0 };
    
    // Add day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const el = document.createElement("div");
      el.className = "cal-cell";
      el.textContent = d;
      el.setAttribute("role", "gridcell");
      
      const isToday = d === todayObj.getDate() && 
                     state.viewMonth === todayObj.getMonth() && 
                     state.viewYear === todayObj.getFullYear();
      
      if (isToday) el.classList.add("today");
      
      const data = monthData[d - 1];
      if (data) {
        const catKey = dataUtils.getCategory(data.i, data.h);
        const cat = CATEGORIES[catKey];
        el.classList.add("has-data", cat.cssClass);
        
        // Colorier directement le fond de la cellule
        el.style.backgroundColor = cat.color + "20"; // Couleur avec transparence
        el.style.borderLeft = `3px solid ${cat.color}`; // Bordure gauche colorée
        
        const tooltip = `${cat.label}${data.note ? " · " + data.note.slice(0, 40) : ""}${data.positive ? " · ✓ " + data.positive.slice(0, 40) : ""}`;
        el.setAttribute("title", tooltip);
        el.setAttribute("aria-label", `${d} — ${cat.label}`);
        
        countMap[catKey]++;
      }
      
      // Add click handler for past days
      const cellDate = new Date(state.viewYear, state.viewMonth, d);
      const isPastDay = cellDate < todayMidnight;
      
      if (isPastDay || (isToday && !state.isEditMode)) {
        el.style.cursor = "pointer";
        const dateKey = `${state.viewYear}-${state.viewMonth + 1}-${d}`;
        el.addEventListener("click", () => enterEditMode(dateKey));
      }
      
      grid.appendChild(el);
    }
    
    renderStats(countMap);
    renderTrendChart();
  } catch (error) {
    errorHandler.handle(error, 'Calendar Render');
  }
}

// Stats rendering
function renderStats(countMap) {
  try {
    const total = Object.values(countMap).reduce((a, b) => a + b, 0);
    const topEntry = Object.entries(countMap).sort((a, b) => b[1] - a[1])[0];
    const topLabel = total > 0 ? CATEGORIES[topEntry[0]].label : "—";
    const daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();
    const percentage = total > 0 ? Math.round(total / daysInMonth * 100) + '%' : '—';
    
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

// Trend chart rendering
async function renderTrendChart() {
  try {
    const data = await loadTrendData();
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
    drawCurve(c, data.map(d => d.intellect), "#4fba96", pad, cw, ch, step);
    drawCurve(c, data.map(d => d.humor), "#8e83c9", pad, cw, ch, step);
    drawCurve(c, data.map(d => d.energy), "#4a8fd4", pad, cw, ch, step);
    
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

function drawCurve(ctx, values, color, pad, cw, ch, step) {
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

async function loadTrendData() {
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

// Edit mode functions
function enterEditMode(dateStr) {
  try {
    state.editingDate = dateStr;
    state.isEditMode = true;
    
    storage.get("romane-" + dateStr).then(res => {
      if (res && res.value) {
        const data = JSON.parse(res.value);
        elements.intellSlider.value = data.i;
        elements.humorSlider.value = data.h;
        elements.energySlider.value = data.e || 2;
        state.intellVal = data.i;
        state.humorVal = data.h;
        state.energyVal = data.e || 2;
        
        elements.positiveField.value = data.positive || "";
        elements.questionField.value = data.qanswer || "";
        elements.noteField.value = data.note || "";
      } else {
        elements.intellSlider.value = 2;
        elements.humorSlider.value = 2;
        elements.energySlider.value = 2;
        state.intellVal = 2;
        state.humorVal = 2;
        state.energyVal = 2;
        
        elements.positiveField.value = "";
        elements.questionField.value = "";
        elements.noteField.value = "";
      }
      
      updateMessage();
      
      const dateFr = dateUtils.formatDate(dateStr, 'long');
      elements.sectionLabel.textContent = `Modifier le ${dateFr}`;
      elements.saveBtn.textContent = `Enregistrer le ${dateFr}`;
      elements.saveBtn.classList.add('editing');
      
      document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
    }).catch(error => {
      errorHandler.handle(error, 'Enter Edit Mode');
    });
  } catch (error) {
    errorHandler.handle(error, 'Enter Edit Mode');
  }
}

function exitEditMode() {
  try {
    state.editingDate = null;
    state.isEditMode = false;
    
    elements.sectionLabel.textContent = "Comment tu te sens aujourd'hui ?";
    elements.saveBtn.textContent = "Enregistrer mon humeur du jour";
    elements.saveBtn.classList.remove('editing');
    
    // Reset past entry form visibility
    hidePastEntryForm();
    
    loadTodayData();
  } catch (error) {
    errorHandler.handle(error, 'Exit Edit Mode');
  }
}

// Past entry functions
function showPastEntryForm() {
  try {
    elements.pastEntryForm.style.display = 'block';
    elements.addPastBtn.style.display = 'none';
    
    // Set max date to yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    elements.pastDatePicker.max = yesterday.toISOString().split('T')[0];
    
    // Set default date to yesterday
    elements.pastDatePicker.value = yesterday.toISOString().split('T')[0];
    
    // Scroll to form
    elements.pastEntryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (error) {
    errorHandler.handle(error, 'Show Past Entry Form');
  }
}

function hidePastEntryForm() {
  try {
    elements.pastEntryForm.style.display = 'none';
    elements.addPastBtn.style.display = 'block';
  } catch (error) {
    errorHandler.handle(error, 'Hide Past Entry Form');
  }
}

function selectPastDate() {
  try {
    const selectedDate = elements.pastDatePicker.value;
    if (!selectedDate) {
      elements.saveStatus.textContent = "Veuillez sélectionner une date";
      elements.saveStatus.className = "save-status error";
      return;
    }
    
    // Convert to YYYY-M-D format for our system
    const date = new Date(selectedDate);
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    
    // Check if entry already exists
    storage.get("romane-" + dateKey).then(res => {
      if (res && res.value) {
        elements.saveStatus.textContent = "Une entrée existe déjà pour cette date. Utilisez le calendrier pour la modifier.";
        elements.saveStatus.className = "save-status error";
        return;
      }
      
      // Enter add mode for past date
      enterAddPastMode(dateKey, selectedDate);
    }).catch(error => {
      errorHandler.handle(error, 'Check Past Entry');
    });
  } catch (error) {
    errorHandler.handle(error, 'Select Past Date');
  }
}

function enterAddPastMode(dateKey, displayDate) {
  try {
    state.editingDate = dateKey;
    state.isEditMode = true;
    
    // Clear form for new entry
    elements.intellSlider.value = 2;
    elements.humorSlider.value = 2;
    elements.energySlider.value = 2;
    state.intellVal = 2;
    state.humorVal = 2;
    state.energyVal = 2;
    
    elements.positiveField.value = "";
    elements.questionField.value = "";
    elements.noteField.value = "";
    
    // Update UI for past date
    const dateFr = dateUtils.formatDate(dateKey, 'long');
    elements.sectionLabel.textContent = `Ajouter une entrée pour le ${dateFr}`;
    elements.saveBtn.textContent = `Enregistrer le ${dateFr}`;
    elements.saveBtn.classList.add('editing');
    
    // Hide the date selector form
    hidePastEntryForm();
    
    // Scroll to main form
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
    
    updateMessage();
  } catch (error) {
    errorHandler.handle(error, 'Enter Add Past Mode');
  }
}

// Export functionality
async function exportToCSV() {
  try {
    elements.exportBtn.disabled = true;
    
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
        csv += `${esc(date)},${esc(INTELL_LABELS[data.i])},${esc(HUMOR_LABELS[data.h])},${esc(ENERGY_LABELS[data.e || 2])},${esc(CATEGORIES[dataUtils.getCategory(data.i, data.h)].label)},${esc(data.positive)},${esc(data.qanswer)},${esc(data.note)}\n`;
      } catch (error) {
        console.error(`Error processing CSV row ${i}:`, error);
      }
    });
    
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `romane-humeur-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    
    elements.exportBtn.textContent = "↓ Export réussi ✓";
    setTimeout(() => {
      elements.exportBtn.textContent = "↓ Exporter mes données (CSV)";
    }, 2500);
  } catch (error) {
    const message = errorHandler.handle(error, 'CSV Export');
    elements.exportBtn.textContent = message;
    setTimeout(() => {
      elements.exportBtn.textContent = "↓ Exporter mes données (CSV)";
    }, 2500);
  } finally {
    elements.exportBtn.disabled = false;
  }
}

// Confetti animation
function launchConfetti() {
  try {
    const confCanvas = document.getElementById("confetti-canvas");
    const confCtx = confCanvas.getContext("2d");
    let particles = [];
    let animating = false;
    
    function resizeCanvas() {
      confCanvas.width = window.innerWidth;
      confCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    
    for (let i = 0; i < 140; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 7 + 3;
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight * .42,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 5,
        color: CONF_COLORS[Math.floor(Math.random() * CONF_COLORS.length)],
        size: Math.random() * 8 + 3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - .5) * 10,
        alpha: 1,
        shape: Math.random() > .5 ? "rect" : "circle"
      });
    }
    
    function animateConfetti() {
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
    }
    
    if (!animating) {
      animating = true;
      animateConfetti();
    }
  } catch (error) {
    errorHandler.handle(error, 'Confetti Animation');
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
    const dow = today.getDay() === 0 ? 6 : today.getDay() - 1; // lundi=0
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
          moodLabel = CATEGORIES[catKey].label;
          dotColor = CATEGORIES[catKey].color;
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

// Garden functionality
function plantTypeFromEntry(entry) {
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

function plantHTML(type, watered = false, idx = 0) {
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

async function renderGarden() {
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
      const type = plantTypeFromEntry(entry);
      if (type === 'low') hasSad = true;
      const watered = !!entry.data.encouraged;
      
      const slot = document.createElement('div');
      slot.className = 'plant-slot';
      slot.innerHTML = plantHTML(type, watered, idx);
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
          encouragementBox.textContent = '💧 ' + todayData.encouragement;
          renderGarden();
        } catch (error) {
          errorHandler.handle(error, 'Garden Watering');
        }
      };
      waterRow.appendChild(b);
      
      encouragementBox.textContent = todayData?.encouragement ? 
        '💧 ' + todayData.encouragement : 
        'Aujourd\'hui la plante a besoin d\'un peu d\'eau et de douceur.';
    } else if (todaysCat === 'teal') {
      encouragementBox.textContent = '🌸 Aujourd\'hui une fleur brillante pousse dans le jardin.';
    } else if (todaysCat === 'amber' || todaysCat === 'purple') {
      encouragementBox.textContent = '🌱 Aujourd\'hui ça pousse tranquillement. Pas besoin d\'être parfaite pour fleurir.';
    } else {
      encouragementBox.textContent = 'Clique sur une humeur du jour et ton jardin poussera ici.';
    }
    
    // Update rainbow and message
    if (entries.length >= 7) {
      rainbow.classList.add('visible');
      const sadPart = hasSad ? ' Les jours où tu te sens bête, ce sont les graines qui ont le plus besoin d\'amour.' : '';
      message.textContent = 'Peu importe ton humeur, tu as fait pousser ce beau jardin.' + sadPart + ' Tu es toujours intelligente et drôle à ma façon.';
    } else {
      rainbow.classList.remove('visible');
      message.textContent = 'Chaque jour ajouté fait pousser un peu plus ton jardin. Les bons comme les mauvais.';
    }
  } catch (error) {
    errorHandler.handle(error, 'Garden Render');
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
            renderGarden();
          });
        } else if (targetTab === 'history') {
          performanceUtils.lazyLoad(document.querySelector('.cal-grid'), () => {
            renderCalendar();
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
      renderCalendar(),
      renderRecap(),
      renderStreak(),
      renderGarden()
    ]);
  } catch (error) {
    errorHandler.handle(error, 'Refresh All Components');
  }
}

// Event listeners setup
function setupEventListeners() {
  try {
    // Slider events
    elements.intellSlider.addEventListener("input", updateMessage);
    elements.humorSlider.addEventListener("input", updateMessage);
    elements.energySlider.addEventListener("input", updateMessage);
    
    // Button events
    elements.saveBtn.addEventListener("click", saveToday);
    elements.exportBtn.addEventListener("click", exportToCSV);
    
    // Past entry buttons
    if (elements.addPastBtn) {
      elements.addPastBtn.addEventListener("click", showPastEntryForm);
    }
    if (elements.selectPastDateBtn) {
      elements.selectPastDateBtn.addEventListener("click", selectPastDate);
    }
    
    // Navigation events
    document.getElementById("prev-btn").addEventListener("click", () => {
      state.viewMonth--;
      if (state.viewMonth < 0) {
        state.viewMonth = 11;
        state.viewYear--;
      }
      renderCalendar();
    });
    
    document.getElementById("next-btn").addEventListener("click", () => {
      state.viewMonth++;
      if (state.viewMonth > 11) {
        state.viewMonth = 0;
        state.viewYear++;
      }
      renderCalendar();
    });
    
    // Theme toggle
    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            if (!elements.saveBtn.disabled) {
              saveToday();
            }
            break;
          case 'e':
            e.preventDefault();
            if (!elements.exportBtn.disabled) {
              exportToCSV();
            }
            break;
        }
      }
      
      // Escape key to exit past entry form
      if (e.key === 'Escape' && elements.pastEntryForm.style.display === 'block') {
        hidePastEntryForm();
      }
    });
    
  } catch (error) {
    errorHandler.handle(error, 'Event Listeners Setup');
  }
}

// Application initialization
async function init() {
  try {
    console.log('Initializing Romane du jour...');
    
    // Initialize elements
    if (!initializeElements()) {
      throw new Error('Failed to initialize DOM elements');
    }
    
    // Initialize theme
    initializeTheme();
    
    // Setup character counts
    setupCharCount(elements.positiveField, document.getElementById("positive-count"), 280);
    setupCharCount(elements.questionField, document.getElementById("question-count"), 400);
    setupCharCount(elements.noteField, document.getElementById("note-count"), 500);
    
    // Set initial values
    document.getElementById("daily-question").textContent = dateUtils.getDailyQuestion(DAILY_QUESTIONS);
    updateTodayDate();
    
    // Load initial data
    await loadTodayData();
    
    // Setup event listeners
    setupEventListeners();
    
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

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(r => console.log('SW ok:', r.scope))
      .catch(e => console.log('SW erreur:', e));
  });
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
