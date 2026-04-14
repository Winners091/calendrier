// Theme management module
export class ThemeManager {
  constructor(elements, storage) {
    this.elements = elements;
    this.storage = storage;
    this.state = {
      theme: localStorage.getItem('romane-theme') || 'light'
    };
  }

  initialize() {
    try {
      if (this.state.theme === 'dark') {
        document.documentElement.classList.add('dark');
        if (this.elements.themeToggle) {
          this.elements.themeToggle.textContent = '☀️';
        }
      }
    } catch (error) {
      console.error('Theme initialization error:', error);
    }
  }

  toggle() {
    try {
      this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('romane-theme', this.state.theme);
      
      if (this.elements.themeToggle) {
        this.elements.themeToggle.textContent = this.state.theme === 'dark' ? '☀️' : '🌙';
      }
    } catch (error) {
      console.error('Theme toggle error:', error);
    }
  }

  setupEventListeners() {
    try {
      if (this.elements.themeToggle) {
        this.elements.themeToggle.addEventListener('click', () => this.toggle());
      }
    } catch (error) {
      console.error('Theme event listeners setup error:', error);
    }
  }
}
