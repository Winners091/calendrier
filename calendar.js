// Calendar module
export class CalendarManager {
  constructor(elements, storage, dataUtils, errorHandler) {
    this.elements = elements;
    this.storage = storage;
    this.dataUtils = dataUtils;
    this.errorHandler = errorHandler;
    this.state = {
      viewYear: new Date().getFullYear(),
      viewMonth: new Date().getMonth()
    };
  }

  async renderCalendar() {
    try {
      document.getElementById("month-title").textContent = `${this.getMonthName(this.state.viewMonth)} ${this.state.viewYear}`;
      const grid = document.getElementById("cal-grid");
      grid.innerHTML = "";
      
      // Add day headers
      this.addDayHeaders(grid);
      
      const firstDay = new Date(this.state.viewYear, this.state.viewMonth, 1).getDay();
      const offset = firstDay === 0 ? 6 : firstDay - 1;
      const daysInMonth = new Date(this.state.viewYear, this.state.viewMonth + 1, 0).getDate();
      const todayObj = new Date();
      const todayMidnight = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());
      
      // Add empty cells
      this.addEmptyCells(grid, offset);
      
      // Load month data
      const monthData = await this.dataUtils.loadMonthData(this.state.viewYear, this.state.viewMonth, daysInMonth);
      const countMap = this.initializeCountMap();
      
      // Add day cells
      for (let d = 1; d <= daysInMonth; d++) {
        const el = this.createDayCell(d, todayObj, todayMidnight, monthData, countMap);
        grid.appendChild(el);
      }
      
      this.renderStats(countMap);
      this.renderTrendChart();
    } catch (error) {
      this.errorHandler.handle(error, 'Calendar Render');
    }
  }

  addDayHeaders(grid) {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    days.forEach(d => {
      const el = document.createElement("div");
      el.className = "cal-day-name";
      el.textContent = d;
      el.setAttribute("role", "columnheader");
      grid.appendChild(el);
    });
  }

  addEmptyCells(grid, offset) {
    for (let i = 0; i < offset; i++) {
      const el = document.createElement("div");
      el.className = "cal-cell empty";
      el.setAttribute("role", "gridcell");
      grid.appendChild(el);
    }
  }

  createDayCell(d, todayObj, todayMidnight, monthData, countMap) {
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
      this.styleDataCell(el, data, d);
      countMap[this.dataUtils.getCategory(data.i, data.h)]++;
    }
    
    // Add click handler for past days
    const cellDate = new Date(this.state.viewYear, this.state.viewMonth, d);
    const isPastDay = cellDate < todayMidnight;
    
    if (isPastDay || (isToday && !this.state.isEditMode)) {
      el.style.cursor = "pointer";
      const dateKey = `${this.state.viewYear}-${this.state.viewMonth + 1}-${d}`;
      el.addEventListener("click", () => this.onDayClick(dateKey));
    }
    
    return el;
  }

  styleDataCell(el, data, day) {
    const catKey = this.dataUtils.getCategory(data.i, data.h);
    const cat = this.getCategory(catKey);
    el.classList.add("has-data", cat.cssClass);
    
    // Colorier directement le fond de la cellule
    el.style.backgroundColor = cat.color + "20";
    el.style.borderLeft = `3px solid ${cat.color}`;
    
    const tooltip = `${cat.label}${data.note ? " · " + data.note.slice(0, 40) : ""}${data.positive ? " · ✓ " + data.positive.slice(0, 40) : ""}`;
    el.setAttribute("title", tooltip);
    el.setAttribute("aria-label", `${day} — ${cat.label}`);
  }

  initializeCountMap() {
    return { teal: 0, purple: 0, amber: 0, red: 0, gray: 0 };
  }

  renderStats(countMap) {
    try {
      const total = Object.values(countMap).reduce((a, b) => a + b, 0);
      const topEntry = Object.entries(countMap).sort((a, b) => b[1] - a[1])[0];
      const topLabel = total > 0 ? this.getCategory(topEntry[0]).label : "—";
      const daysInMonth = new Date(this.state.viewYear, this.state.viewMonth + 1, 0).getDate();
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
      this.errorHandler.handle(error, 'Stats Render');
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
      this.errorHandler.handle(error, 'Trend Chart Render');
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
            const res = await this.storage.get(key);
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
      this.errorHandler.handle(error, 'Trend Data Load');
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

  getMonthName(monthIndex) {
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return months[monthIndex];
  }

  onDayClick(dateKey) {
    // This will be handled by the main app
    if (window.app && window.app.onDayClick) {
      window.app.onDayClick(dateKey);
    }
  }

  setupEventListeners() {
    try {
      document.getElementById("prev-btn").addEventListener("click", () => {
        this.state.viewMonth--;
        if (this.state.viewMonth < 0) {
          this.state.viewMonth = 11;
          this.state.viewYear--;
        }
        this.renderCalendar();
      });
      
      document.getElementById("next-btn").addEventListener("click", () => {
        this.state.viewMonth++;
        if (this.state.viewMonth > 11) {
          this.state.viewMonth = 0;
          this.state.viewYear++;
        }
        this.renderCalendar();
      });
    } catch (error) {
      this.errorHandler.handle(error, 'Calendar Event Listeners Setup');
    }
  }
}
