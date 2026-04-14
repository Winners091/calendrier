// Export functionality module
export class ExportManager {
  constructor(elements, storage, dateUtils) {
    this.elements = elements;
    this.storage = storage;
    this.dateUtils = dateUtils;
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
      
      const results = await Promise.all(allKeys.map(k => this.storage.get(k).catch(() => null)));
      
      let csv = "Date,Intellect,Humour,Energie,Categorie,FaitPositif,ReponseQuestion,NoteLibre\n";
      
      results.forEach((res, i) => {
        if (!res?.value) return;
        
        try {
          const data = JSON.parse(res.value);
          const [y, mo, d] = allKeys[i].replace("romane-", "").split("-");
          const date = this.dateUtils.formatDate(`${y}-${mo}-${d}`);
          
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
    this.elements.exportBtn.textContent = "↓ Export réussi ✓";
    setTimeout(() => {
      this.elements.exportBtn.textContent = "↓ Exporter mes données (CSV)";
    }, 2500);
  }

  showErrorMessage(error) {
    console.error('Export error:', error);
    this.elements.exportBtn.textContent = "Erreur lors de l'export";
    setTimeout(() => {
      this.elements.exportBtn.textContent = "↓ Exporter mes données (CSV)";
    }, 2500);
  }

  setupEventListeners() {
    try {
      if (this.elements.exportBtn) {
        this.elements.exportBtn.addEventListener("click", () => this.exportToCSV());
      }
    } catch (error) {
      console.error('Export event listeners setup error:', error);
    }
  }
}
