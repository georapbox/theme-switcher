// @ts-check

/**
 * @typedef {'light' | 'system' | 'dark'} Theme
 */

const html = String.raw;
const css = String.raw;

const DEFAULT_STORAGE_KEY = 'theme-switcher/theme-preference';
const ROOT_ATTR = 'data-theme';
const THEME_VALUES = ['light', 'system', 'dark'];

const styles = css`
  :host {
    --theme-switcher-background-color: transparent;
    --theme-switcher-border-color: canvastext;
    --theme-switcher-padding: 0.1875rem;
    --theme-switcher-switch-color: canvastext;
    --theme-switcher-switch-active-color: canvas;
    --theme-switcher-switch-active-background-color: canvastext;

    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  :host([hidden]),
  [hidden],
  ::slotted([hidden]) {
    display: none !important;
  }

  .hidden {
    display: none !important;
  }

  .theme-switcher {
    display: flex;
    border: 1px solid var(--theme-switcher-border-color);
    border-radius: 9999px;
    width: fit-content;
    padding: var(--theme-switcher-padding);
    background-color: var(--theme-switcher-background-color);
  }

  .theme-switcher__switch {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    color: var(--theme-switcher-switch-color);
    background-color: transparent;
    font-size: 1rem;
  }

  .theme-switcher__switch:not(:disabled) {
    cursor: pointer;
  }

  .theme-switcher__switch[aria-checked='true'] {
    background-color: var(--theme-switcher-switch-active-background-color);
    color: var(--theme-switcher-switch-active-color);
  }
`;

const template = document.createElement('template');

template.innerHTML = html`
  <style>
    ${styles}
  </style>

  <div class="theme-switcher" part="base" role="radiogroup">
    <button
      class="theme-switcher__switch"
      part="theme-switch theme-switch--light"
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Switch to light theme"
      data-theme="light"
    >
      <svg viewBox="0 0 16 16" width="1em" height="1em">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M8.75.75V0h-1.5v2h1.5V.75M3.26 4.32l-.53-.53-.35-.35-.53-.53L2.9 1.85l.53.53.35.35.53.53zm8.42-1.06.53-.53.35-.35.53-.53 1.06 1.06-.53.53-.35.35-.53.53zM8 11.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5m0 1.5a4.75 4.75 0 1 0 0-9.5 4.75 4.75 0 0 0 0 9.5m6-5.5h2v1.5h-2zm-13.25 0H0v1.5h2v-1.5H.75m1.62 5.32-.53.53 1.06 1.06.53-.53.35-.35.53-.53-1.06-1.06-.53.53zm10.2 1.06.53.53 1.06-1.06-.53-.53-.35-.35-.53-.53-1.06 1.06.53.53zM8.75 14v2h-1.5v-2z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>

    <button
      class="theme-switcher__switch"
      part="theme-switch theme-switch--system"
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Switch to system theme"
      data-theme="system"
    >
      <svg viewBox="0 0 16 16" width="1em" height="1em">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1H8.75v3h1.75V16h-5v-1.5h1.75v-3H1a1 1 0 0 1-1-1zm1.5.5V10h13V2.5z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>

    <button
      class="theme-switcher__switch"
      part="theme-switch theme-switch--dark"
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Switch to dark theme"
      data-theme="dark"
    >
      <svg viewBox="0 0 16 16" width="1em" height="1em">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M1.5 8a6 6 0 0 1 3.62-5.51 7 7 0 0 0 7.08 9.25A5.99 5.99 0 0 1 1.5 8M6.42.58a7.5 7.5 0 1 0 7.96 10.41l-.92-1.01a5.5 5.5 0 0 1-6.3-8.25zm6.83.42v1.75H15v1.5h-1.75V6h-1.5V4.25H10v-1.5h1.75V1z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
`;

/**
 * @summary A custom element that allows you to switch between light, dark, and system theme.
 * @documentation https://github.com/georapbox/theme-switcher
 *
 * @tagname theme-switcher - The default custom element tag name, unless overridden by the `define` method.
 * @extends HTMLElement
 *
 * @property {boolean} noStorage - Indicates whether the theme state should be persisted to local storage.
 * @property {string} storageKey - The key used to store the theme state in local storage.
 *
 * @attribute {boolean} no-storage - Indicates whether the theme state should be persisted to local storage.
 * @attribute {string} storage-key - The key used to store the theme state in local storage.
 *
 * @csspart base - The wrapper element of the theme switcher.
 * @csspart theme-switch - The individual theme switch buttons.
 * @csspart theme-switch--light - The light theme switch button.
 * @csspart theme-switch--system - The system theme switch button.
 * @csspart theme-switch--dark - The dark theme switch button.
 *
 * @cssproperty --theme-switcher-background-color - The background color of the theme switcher.
 * @cssproperty --theme-switcher-border-color - The border color of the theme switcher.
 * @cssproperty --theme-switcher-padding - The padding of the theme switcher.
 * @cssproperty--theme-switcher-switch-color - The color of the theme switch buttons.
 * @cssproperty --theme-switcher-switch-active-color - The color of the active theme switch button.
 * @cssproperty --theme-switcher-switch-active-background-color - The background color of the active theme switch button.
 *
 * @method define - Static method. Defines the custom element by registering it with the browser's CustomElementRegistry if it hasn't been defined already.
 */
class ThemeSwitcher extends HTMLElement {
  /** @type {Theme} */
  #theme = 'system';

  /** @type {HTMLElement | null} */
  #themeSwitcher = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  static get observedAttributes() {
    return ['storage-key'];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'storage-key' && oldValue !== newValue) {
      this.#theme = this.#getThemePreference();
      this.#reflectThemePreference();
    }
  }

  /**
   * Indicates whether the theme state should be persisted to local storage.
   *
   * @type {boolean}
   * @default false
   * @attribute no-storage - Reflects the noStorage property.
   */
  get noStorage() {
    return this.hasAttribute('no-storage');
  }

  set noStorage(value) {
    if (value) {
      this.setAttribute('no-storage', '');
    } else {
      this.removeAttribute('no-storage');
    }
  }

  /**
   * The key used to store the theme state in local storage.
   *
   * @type {string | null}
   * @default 'theme-toggle/theme-preference'
   * @attribute storage-key - Reflects the storageKey property.
   */
  get storageKey() {
    return this.getAttribute('storage-key');
  }

  set storageKey(value) {
    if (value != null) {
      this.setAttribute('storage-key', value);
    }
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('noStorage');
    this.#upgradeProperty('storageKey');

    this.#themeSwitcher = this.shadowRoot?.querySelector('[part="base"]') || null;

    this.#theme = this.#getThemePreference();
    this.#reflectThemePreference();

    this.#themeSwitcher?.addEventListener('click', this.#handleSwitcherClick);
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    this.#themeSwitcher?.removeEventListener('click', this.#handleSwitcherClick);
  }

  /**
   * Checks whether a value is a valid theme.
   *
   * @param {unknown} value - The value to check.
   * @returns {value is Theme} True if the value is a valid theme, false otherwise.
   */
  #isTheme(value) {
    return typeof value === 'string' && THEME_VALUES.includes(value);
  }

  /**
   * Gets the current theme state from local storage.
   *
   * @returns {Theme} Current theme state. Defaults to 'system' if no value is found.
   */
  #getThemePreference() {
    if (this.noStorage) {
      return 'system';
    }

    let valueFromStorage = '';

    try {
      valueFromStorage = localStorage.getItem(this.storageKey || DEFAULT_STORAGE_KEY) || '';
    } catch {
      // Fail silently...
    }

    if (this.#isTheme(valueFromStorage)) {
      return valueFromStorage;
    }

    return 'system';
  }

  /**
   * Save the current theme state to local storage.
   */
  #setThemePreference() {
    if (this.noStorage) {
      return;
    }

    try {
      localStorage.setItem(this.storageKey || DEFAULT_STORAGE_KEY, this.#theme);
    } catch {
      // Fail silently...
    }
  }

  /**
   * Reflects the current theme state.
   * This method is called on initialization and when the theme state changes (e.g. via click event).
   */
  #reflectThemePreference() {
    this.#themeSwitcher?.querySelectorAll(`[data-theme]`)?.forEach(el => {
      const theme = el.getAttribute('data-theme');
      el.setAttribute('aria-checked', theme === this.#theme ? 'true' : 'false');
    });

    this.ownerDocument.documentElement.setAttribute(ROOT_ATTR, this.#theme);
  }

  /**
   * Handles click events on the theme switcher buttons.
   * Updates the theme state based on the clicked button and reflects the change.
   *
   * @param {MouseEvent} evt - The click event object.
   */
  #handleSwitcherClick = evt => {
    const target = /** @type {HTMLElement | null} */ (evt.target);
    const closestSwitch = target?.closest('button');
    const selectedTheme = closestSwitch?.getAttribute('data-theme');

    if (!selectedTheme || !this.#isTheme(selectedTheme)) {
      return;
    }

    this.#theme = selectedTheme;
    this.#setThemePreference();
    this.#reflectThemePreference();
  };

  /**
   * Re-applies a property value that may have been set on the element
   * instance before the custom element was defined.
   *
   * This handles cases where a framework sets a property on the element
   * before its definition is loaded. Without this step, the own property
   * on the instance would shadow the class setter and prevent it from
   * running after upgrade.
   *
   * @see https://web.dev/articles/custom-elements-best-practices#make_properties_lazy
   *
   * @param {'noStorage' | 'storageKey'} prop - The property name to upgrade.
   */
  #upgradeProperty(prop) {
    const instance = /** @type {HTMLElement & Record<string, unknown>} */ (this);

    if (Object.prototype.hasOwnProperty.call(instance, prop)) {
      const value = instance[prop];
      delete instance[prop];
      instance[prop] = value;
    }
  }

  /**
   * Defines the custom element by registering it with the browser's
   * CustomElementRegistry if it hasn't been defined already.
   *
   * @param {string} [tagName='theme-switcher'] - The tag name to use for the custom element. Must include a hyphen.
   */
  static define(tagName = 'theme-switcher') {
    if (typeof window === 'undefined' || window.customElements.get(tagName)) {
      return;
    }
    window.customElements.define(tagName, ThemeSwitcher);
  }
}

export { ThemeSwitcher };
