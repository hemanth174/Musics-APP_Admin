// Admin Settings JavaScript
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://crazy-musics-1.onrender.com';

// Settings state management
const settings = {
  general: {
    appName: 'Crazy-Musics',
    adminEmail: 'Admin777@gmail.com',
    timezone: 'UTC',
    language: 'en'
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    ipWhitelist: '',
    loginNotifications: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  },
  notifications: {
    emailNotifications: true,
    newUserAlerts: true,
    systemAlerts: true,
    weeklyReports: false
  },
  appearance: {
    theme: 'light',
    accentColor: '#667eea',
    compactMode: false
  },
  system: {
    apiRateLimit: 100,
    cacheDuration: 3600,
    maintenanceMode: false,
    debugMode: false
  },
  backup: {
    autoBackup: true,
    backupFrequency: 'daily',
    lastBackup: null
  }
};

// Load settings from localStorage
function loadSettings() {
  const savedSettings = localStorage.getItem('adminSettings');
  if (savedSettings) {
    Object.assign(settings, JSON.parse(savedSettings));
  }
  applySettings();
}

// Apply settings to UI
function applySettings() {
  // General settings
  document.getElementById('appName').value = settings.general.appName;
  document.getElementById('adminEmail').value = settings.general.adminEmail;
  document.getElementById('timezone').value = settings.general.timezone;
  document.getElementById('language').value = settings.general.language;

  // Security settings
  document.getElementById('twoFactorAuth').checked = settings.security.twoFactorAuth;
  document.getElementById('sessionTimeout').value = settings.security.sessionTimeout;
  document.getElementById('ipWhitelist').value = settings.security.ipWhitelist;
  document.getElementById('loginNotifications').checked = settings.security.loginNotifications;

  // Notification settings
  document.getElementById('emailNotifications').checked = settings.notifications.emailNotifications;
  document.getElementById('newUserAlerts').checked = settings.notifications.newUserAlerts;
  document.getElementById('systemAlerts').checked = settings.notifications.systemAlerts;
  document.getElementById('weeklyReports').checked = settings.notifications.weeklyReports;

  // Appearance settings
  document.getElementById('theme').value = settings.appearance.theme;
  document.getElementById('accentColor').value = settings.appearance.accentColor;
  document.querySelector('.color-value').textContent = settings.appearance.accentColor;
  document.getElementById('compactMode').checked = settings.appearance.compactMode;

  // Apply theme
  applyTheme(settings.appearance.theme);
  applyAccentColor(settings.appearance.accentColor);

  // System settings
  document.getElementById('apiRateLimit').value = settings.system.apiRateLimit;
  document.getElementById('cacheDuration').value = settings.system.cacheDuration;
  document.getElementById('maintenanceMode').checked = settings.system.maintenanceMode;
  document.getElementById('debugMode').checked = settings.system.debugMode;

  // Backup settings
  document.getElementById('autoBackup').checked = settings.backup.autoBackup;
  document.getElementById('backupFrequency').value = settings.backup.backupFrequency;
  
  if (settings.backup.lastBackup) {
    document.getElementById('lastBackupDate').textContent = new Date(settings.backup.lastBackup).toLocaleString();
  }
}

// Save all settings
function saveAllSettings() {
  try {
    // Collect all settings from form
    settings.general.appName = document.getElementById('appName').value;
    settings.general.adminEmail = document.getElementById('adminEmail').value;
    settings.general.timezone = document.getElementById('timezone').value;
    settings.general.language = document.getElementById('language').value;

    settings.security.twoFactorAuth = document.getElementById('twoFactorAuth').checked;
    settings.security.sessionTimeout = parseInt(document.getElementById('sessionTimeout').value);
    settings.security.ipWhitelist = document.getElementById('ipWhitelist').value;
    settings.security.loginNotifications = document.getElementById('loginNotifications').checked;

    settings.notifications.emailNotifications = document.getElementById('emailNotifications').checked;
    settings.notifications.newUserAlerts = document.getElementById('newUserAlerts').checked;
    settings.notifications.systemAlerts = document.getElementById('systemAlerts').checked;
    settings.notifications.weeklyReports = document.getElementById('weeklyReports').checked;

    settings.appearance.theme = document.getElementById('theme').value;
    settings.appearance.accentColor = document.getElementById('accentColor').value;
    settings.appearance.compactMode = document.getElementById('compactMode').checked;

    settings.system.apiRateLimit = parseInt(document.getElementById('apiRateLimit').value);
    settings.system.cacheDuration = parseInt(document.getElementById('cacheDuration').value);
    settings.system.maintenanceMode = document.getElementById('maintenanceMode').checked;
    settings.system.debugMode = document.getElementById('debugMode').checked;

    settings.backup.autoBackup = document.getElementById('autoBackup').checked;
    settings.backup.backupFrequency = document.getElementById('backupFrequency').value;

    // Save to localStorage
    localStorage.setItem('adminSettings', JSON.stringify(settings));

    // Apply theme changes
    applyTheme(settings.appearance.theme);
    applyAccentColor(settings.appearance.accentColor);

    showToast('All settings saved successfully!', 'success');
  } catch (error) {
    console.error('Error saving settings:', error);
    showToast('Failed to save settings', 'error');
  }
}

// Apply theme
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}

// Apply accent color
function applyAccentColor(color) {
  document.documentElement.style.setProperty('--primary-color', color);
}

// Change password
async function changePassword() {
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!currentPassword || !newPassword || !confirmPassword) {
    showToast('Please fill in all password fields', 'error');
    return;
  }

  if (newPassword !== confirmPassword) {
    showToast('New passwords do not match', 'error');
    return;
  }

  if (newPassword.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }

  // For now, just simulate password change
  // In production, this would call an API endpoint
  showToast('Password changed successfully!', 'success');
  
  // Clear password fields
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
}

// Create backup
function createBackup() {
  try {
    const backupData = {
      timestamp: new Date().toISOString(),
      settings: settings,
      version: '1.0.0'
    };

    // Create downloadable JSON file
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `crazy-musics-backup-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Update last backup time
    settings.backup.lastBackup = new Date().toISOString();
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    document.getElementById('lastBackupDate').textContent = new Date(settings.backup.lastBackup).toLocaleString();

    showToast('Backup created successfully!', 'success');
  } catch (error) {
    console.error('Error creating backup:', error);
    showToast('Failed to create backup', 'error');
  }
}

// Download existing backup
function downloadBackup() {
  if (!settings.backup.lastBackup) {
    showToast('No backup available. Create a new backup first.', 'error');
    return;
  }
  createBackup();
}

// Settings navigation
document.querySelectorAll('.settings-nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.settings-nav-item.active')?.classList.remove('active');
    item.classList.add('active');
    
    const target = item.getAttribute('href').substring(1);
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Save all button
document.getElementById('saveAllBtn')?.addEventListener('click', saveAllSettings);

// Toggle switch change notifications
document.querySelectorAll('.toggle-switch input').forEach(toggle => {
  toggle.addEventListener('change', (e) => {
    const settingItem = e.target.closest('.setting-item');
    const setting = settingItem?.querySelector('h3')?.textContent || 'Setting';
    const status = e.target.checked ? 'enabled' : 'disabled';
    showToast(`${setting} ${status}`, 'info');
  });
});

// Color picker
const colorInput = document.querySelector('.color-input');
const colorValue = document.querySelector('.color-value');

if (colorInput && colorValue) {
  colorInput.addEventListener('input', (e) => {
    colorValue.textContent = e.target.value;
    applyAccentColor(e.target.value);
  });
}

// Change password button
const changePasswordBtn = document.getElementById('changePasswordBtn');
if (changePasswordBtn) {
  changePasswordBtn.addEventListener('click', changePassword);
}

// Backup buttons
const downloadBackupBtn = document.getElementById('downloadBackupBtn');
const createBackupBtn = document.getElementById('createBackupBtn');

if (downloadBackupBtn) {
  downloadBackupBtn.addEventListener('click', downloadBackup);
}

if (createBackupBtn) {
  createBackupBtn.addEventListener('click', createBackup);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
});

// Auto-save on input change (debounced)
let autoSaveTimeout;
document.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('change', () => {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      const savedSettings = localStorage.getItem('adminSettings');
      if (savedSettings) {
        saveAllSettings();
      }
    }, 1000);
  });
});

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

