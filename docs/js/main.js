import '../lib/browser-window.js';

const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/theme-switcher.js' : '../lib/theme-switcher.js';

const { ThemeSwitcher } = await import(componentUrl);
ThemeSwitcher.define();

document.querySelectorAll('theme-switcher').forEach(el => {
  el.setAttribute('storage-key', window.__THEME_TOGGLE_DEMO_STORAGE_KEY__);
});

const demo = document.getElementById('demo');
const picker = document.getElementById('theme-picker');

picker.addEventListener('change', event => {
  const input = event.target;

  if (!(input instanceof HTMLInputElement) || input.type !== 'radio') {
    return;
  }

  demo.dataset.themeSwitcherTheme = input.value;
});
