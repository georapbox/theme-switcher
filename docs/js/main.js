import '../lib/browser-window.js';

const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/theme-switcher.js' : '../lib/theme-switcher.js';

const { ThemeSwitcher } = await import(componentUrl);
ThemeSwitcher.define();

const demo = document.getElementById('demo');
const form = document.getElementById('demo-controls');
const output = document.getElementById('size-value');
const themeSwitchers = demo.querySelectorAll('theme-switcher');

themeSwitchers.forEach(el => {
  el.setAttribute('storage-key', window.__THEME_TOGGLE_DEMO_STORAGE_KEY__);
});

form.addEventListener('input', evt => {
  const input = evt.target;

  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  if (input.name === 'theme-switcher-theme' && input.type === 'radio') {
    demo.dataset.themeSwitcherTheme = input.value;
    return;
  }

  if (input.id === 'size-control' && input.type === 'range') {
    const value = input.valueAsNumber;
    const min = Number(input.min);
    const max = Number(input.max);
    const progress = (value - min) / (max - min);
    const scale = 1 + progress;

    output.value = `${Math.round(scale * 100)}%`;

    themeSwitchers.forEach(el => {
      el.style.setProperty('--theme-switcher-option-size', `${2 * scale}rem`);
      el.style.setProperty('--theme-switcher-padding', `${0.1875 * scale}rem`);
    });
  }
});
