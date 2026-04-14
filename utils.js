import { ERROR_MESSAGES } from './config.js';

// Storage utility with fallback and error handling for GitHub Pages
export const storage = (() => {
  // Check if custom storage is available
  if (typeof window.storage !== "undefined" && typeof window.storage.get === "function") {
    return window.storage;
  }
  
  // Test localStorage availability
  let storageAvailable = false;
  let memoryStorage = {};
  
  try {
    const testKey = '__romane_storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    storageAvailable = true;
    console.log('localStorage is available');
  } catch (error) {
    console.warn('localStorage not available, using memory storage:', error.message);
    storageAvailable = false;
  }
  
  return {
    async get(k) {
      try {
        if (storageAvailable) {
          const v = localStorage.getItem(k);
          return v ? { value: v } : null;
        } else {
          const v = memoryStorage[k];
          return v ? { value: v } : null;
        }
      } catch (error) {
        console.error('Storage get error:', error);
        // Fallback to memory storage
        try {
          const v = memoryStorage[k];
          return v ? { value: v } : null;
        } catch (memoryError) {
          console.error('Memory storage fallback failed:', memoryError);
          return null;
        }
      }
    },
    
    async set(k, v) {
      try {
        if (storageAvailable) {
          localStorage.setItem(k, v);
        } else {
          memoryStorage[k] = v;
        }
        return true;
      } catch (error) {
        console.error('Storage set error:', error);
        // Fallback to memory storage
        try {
          memoryStorage[k] = v;
          console.log('Data saved to memory storage instead');
          return true;
        } catch (memoryError) {
          console.error('Memory storage fallback failed:', memoryError);
          throw new Error(ERROR_MESSAGES.STORAGE_UNAVAILABLE);
        }
      }
    },
    
    // Helper method to check storage type
    getStorageType() {
      return storageAvailable ? 'localStorage' : 'memory';
    },
    
    // Helper method to clear all data
    async clear() {
      try {
        if (storageAvailable) {
          localStorage.clear();
        } else {
          memoryStorage = {};
        }
        return true;
      } catch (error) {
        console.error('Storage clear error:', error);
        throw new Error(ERROR_MESSAGES.STORAGE_UNAVAILABLE);
      }
    }
  };
})();

// Validation utilities
export const validator = {
  validateSlider(value, rules) {
    const num = parseInt(value);
    if (isNaN(num) || num < rules.min || num > rules.max) {
      throw new Error(`La valeur doit être entre ${rules.min} et ${rules.max}`);
    }
    return num;
  },

  validateText(value, rules) {
    if (rules.required && !value.trim()) {
      throw new Error('Ce champ est requis');
    }
    if (value.length > rules.maxLength) {
      throw new Error(`Ce champ ne peut pas dépasser ${rules.maxLength} caractères`);
    }
    return value.trim();
  },

  validateEntry(data) {
    const errors = [];
    
    try {
      this.validateSlider(data.i, { min: 0, max: 4 });
    } catch (e) {
      errors.push(`Intellect: ${e.message}`);
    }
    
    try {
      this.validateSlider(data.h, { min: 0, max: 4 });
    } catch (e) {
      errors.push(`Humour: ${e.message}`);
    }
    
    try {
      this.validateSlider(data.e, { min: 0, max: 4 });
    } catch (e) {
      errors.push(`Énergie: ${e.message}`);
    }
    
    if (errors.length > 0) {
      throw new Error(ERROR_MESSAGES.VALIDATION_FAILED + ' ' + errors.join(' '));
    }
    
    return true;
  }
};

// Date utilities
export const dateUtils = {
  todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  },

  getDailyQuestion(questions) {
    try {
      const d = new Date();
      const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
      return questions[dayOfYear % questions.length];
    } catch (error) {
      console.error('Error getting daily question:', error);
      return "Comment te sens-tu aujourd'hui ?";
    }
  },

  formatDate(dateStr, format = 'short') {
    try {
      const [y, mo, d] = dateStr.split('-');
      const date = new Date(+y, +mo - 1, +d);
      
      if (format === 'long') {
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      return `${d.padStart(2, '0')}/${mo.padStart(2, '0')}/${y}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateStr;
    }
  }
};

// Data processing utilities
export const dataUtils = {
  getCategory(i, h) {
    try {
      const ai = i / 4, ah = h / 4;
      if (ai >= .6 && ah >= .6) return "teal";
      if (ai >= .6 && ah < .4) return "purple";
      if (ai < .4 && ah >= .6) return "amber";
      if (ai < .4 && ah < .4) return "red";
      return "gray";
    } catch (error) {
      console.error('Error getting category:', error);
      return "gray";
    }
  },

  getMessage(i, h, messages) {
    try {
      const key = `${i}-${h}`;
      const msgArray = messages[key] || ["Journée particulière."];
      return msgArray[Math.floor(Math.random() * msgArray.length)];
    } catch (error) {
      console.error('Error getting message:', error);
      return "Journée particulière.";
    }
  },

  async loadAllEntries(limitDays = 60) {
    try {
      const out = [];
      const now = new Date();
      
      for (let i = 0; i < limitDays; i++) {
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        const key = `romane-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        
        try {
          const res = await storage.get(key);
          if (res && res.value) {
            const data = JSON.parse(res.value);
            out.push({ date: d, key, data });
          }
        } catch (error) {
          console.error(`Error loading entry ${key}:`, error);
        }
      }
      
      return out.reverse();
    } catch (error) {
      console.error('Error loading all entries:', error);
      return [];
    }
  },

  async loadMonthData(year, month, days) {
    try {
      const keys = Array.from({ length: days }, (_, i) => `romane-${year}-${month + 1}-${i + 1}`);
      const results = await Promise.all(keys.map(k => storage.get(k).catch(() => null)));
      return results.map(r => {
        try {
          return r?.value ? JSON.parse(r.value) : null;
        } catch {
          return null;
        }
      });
    } catch (error) {
      console.error('Error loading month data:', error);
      return Array(days).fill(null);
    }
  }
};

// Error handling utility
export const errorHandler = {
  handle(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);
    
    // User-friendly error messages
    if (error.message.includes('Storage')) {
      return ERROR_MESSAGES.STORAGE_UNAVAILABLE;
    }
    if (error.message.includes('JSON')) {
      return ERROR_MESSAGES.LOAD_FAILED;
    }
    
    return error.message || ERROR_MESSAGES.SAVE_FAILED;
  },

  async safeExecute(fn, context = 'Operation') {
    try {
      return await fn();
    } catch (error) {
      const message = this.handle(error, context);
      throw new Error(message);
    }
  }
};

// Performance utilities
export const performanceUtils = {
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  lazyLoad(element, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(element);
        }
      });
    });
    observer.observe(element);
  }
};
