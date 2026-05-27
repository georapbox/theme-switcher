import '../lib/browser-window.js';

const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/theme-switcher.js' : '../lib/theme-switcher.js';

const { ThemeSwitcher } = await import(componentUrl);
ThemeSwitcher.define();

document.querySelectorAll('theme-switcher').forEach(el => {
  el.setAttribute('storage-key', window.__THEME_TOGGLE_DEMO_STORAGE_KEY__);
});

document.querySelectorAll('h3[id^="example-"]').forEach((el, index) => {
  el.insertAdjacentHTML('afterbegin', `<a href="#${el.getAttribute('id')}">#</a> Example ${index + 1} - `);
});

document.querySelectorAll('.card').forEach(el => {
  el.insertAdjacentHTML('afterend', `<div class="back-top"><a href="#">↑ Back to top</a></div>`);
});

// Custom styling demo
(function () {
  const demo = document.querySelector('.custom-styling-demo');
  const picker = document.querySelector('.theme-palette-picker');

  picker.addEventListener('change', event => {
    const input = event.target;

    if (!(input instanceof HTMLInputElement) || input.type !== 'radio') {
      return;
    }

    demo.dataset.themeSwitcherTheme = input.value;
  });
})();
