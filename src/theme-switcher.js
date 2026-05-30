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
    --theme-switcher-padding: 0.1875rem;
    --theme-switcher-background-color: transparent;
    --theme-switcher-border-color: #222222;
    --theme-switcher-option-size: 2rem;
    --theme-switcher-option-font-size: calc(var(--theme-switcher-option-size) * 0.5);
    --theme-switcher-option-color: #222222;
    --theme-switcher-option-active-color: #eeeeee;
    --theme-switcher-option-active-background-color: #222222;

    display: inline-block;
    box-sizing: border-box;
  }

  @supports (color: light-dark(#000000, #ffffff)) {
    :host {
      --theme-switcher-border-color: light-dark(#222222, #eeeeee);
      --theme-switcher-option-color: light-dark(#222222, #eeeeee);
      --theme-switcher-option-active-color: light-dark(#eeeeee, #222222);
      --theme-switcher-option-active-background-color: light-dark(#222222, #eeeeee);
    }
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
    width: fit-content;
    padding: var(--theme-switcher-padding);
    border: 1px solid var(--theme-switcher-border-color);
    border-radius: 9999px;
    background-color: var(--theme-switcher-background-color);
    color-scheme: light dark;
  }

  .theme-switcher:has([data-theme='light'][aria-checked='true']) {
    color-scheme: light;
  }

  .theme-switcher:has([data-theme='system'][aria-checked='true']) {
    color-scheme: light dark;
  }

  .theme-switcher:has([data-theme='dark'][aria-checked='true']) {
    color-scheme: dark;
  }

  .theme-switcher__option {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 50%;
    width: var(--theme-switcher-option-size);
    height: var(--theme-switcher-option-size);
    color: var(--theme-switcher-option-color);
    background-color: transparent;
    font-size: var(--theme-switcher-option-font-size);
    line-height: 0;
  }

  .theme-switcher__option:not(:disabled) {
    cursor: pointer;
  }

  .theme-switcher__option[aria-checked='true'] {
    background-color: var(--theme-switcher-option-active-background-color);
    color: var(--theme-switcher-option-active-color);
  }
`;

const template = document.createElement('template');

template.innerHTML = html`
  <style>
    ${styles}
  </style>

  <div id="theme-switcher" class="theme-switcher" part="base" role="radiogroup">
    <button
      class="theme-switcher__option"
      part="theme-option theme-option--light"
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Switch to light theme"
      data-theme="light"
      data-theme-switcher-option
    >
      <slot name="theme-option-light-icon">
        <svg viewBox="0 0 16 16" width="1em" height="1em">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M8.75.75V0h-1.5v2h1.5V.75M3.26 4.32l-.53-.53-.35-.35-.53-.53L2.9 1.85l.53.53.35.35.53.53zm8.42-1.06.53-.53.35-.35.53-.53 1.06 1.06-.53.53-.35.35-.53.53zM8 11.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5m0 1.5a4.75 4.75 0 1 0 0-9.5 4.75 4.75 0 0 0 0 9.5m6-5.5h2v1.5h-2zm-13.25 0H0v1.5h2v-1.5H.75m1.62 5.32-.53.53 1.06 1.06.53-.53.35-.35.53-.53-1.06-1.06-.53.53zm10.2 1.06.53.53 1.06-1.06-.53-.53-.35-.35-.53-.53-1.06 1.06.53.53zM8.75 14v2h-1.5v-2z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </slot>
    </button>

    <button
      class="theme-switcher__option"
      part="theme-option theme-option--system"
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Switch to system theme"
      data-theme="system"
      data-theme-switcher-option
    >
      <slot name="theme-option-system-icon">
        <svg viewBox="0 0 16 16" width="1em" height="1em">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1H8.75v3h1.75V16h-5v-1.5h1.75v-3H1a1 1 0 0 1-1-1zm1.5.5V10h13V2.5z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </slot>
    </button>

    <button
      class="theme-switcher__option"
      part="theme-option theme-option--dark"
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Switch to dark theme"
      data-theme="dark"
      data-theme-switcher-option
    >
      <slot name="theme-option-dark-icon">
        <svg viewBox="0 0 16 16" width="1em" height="1em">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M1.5 8a6 6 0 0 1 3.62-5.51 7 7 0 0 0 7.08 9.25A5.99 5.99 0 0 1 1.5 8M6.42.58a7.5 7.5 0 1 0 7.96 10.41l-.92-1.01a5.5 5.5 0 0 1-6.3-8.25zm6.83.42v1.75H15v1.5h-1.75V6h-1.5V4.25H10v-1.5h1.75V1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </slot>
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
 * @property {boolean} noStorage - Whether to disable persistence of the selected theme in local storage. Defaults to false.
 * @property {string} storageKey - The local storage key used to persist the selected theme. Defaults to "theme-switcher/theme-preference".
 * @property {string} lightLabel - The accessible label for the light theme option button.
 * @property {string} systemLabel - The accessible label for the system theme option button.
 * @property {string} darkLabel - The accessible label for the dark theme option button.
 *
 * @attribute {boolean} no-storage - Whether to disable persistence of the selected theme in local storage. Defaults to false.
 * @attribute {string} storage-key - The local storage key used to persist the selected theme. Defaults to "theme-switcher/theme-preference".
 * @attribute {string} light-label - The accessible label for the light theme option button.
 * @attribute {string} system-label - The accessible label for the system theme option button.
 * @attribute {string} dark-label - The accessible label for the dark theme option button.
 *
 * @slot theme-option-light-icon - Custom icon/content for the light theme option.
 * @slot theme-option-system-icon - Custom icon/content for the system theme option.
 * @slot theme-option-dark-icon - Custom icon/content for the dark theme option.
 *
 * @csspart base - The root wrapper element of the theme switcher.
 * @csspart theme-option - A theme option button.
 * @csspart theme-option--light - The button for selecting the light theme.
 * @csspart theme-option--system - The button for selecting the system theme.
 * @csspart theme-option--dark - The button for selecting the dark theme.
 *
 * @cssproperty --theme-switcher-padding - The padding around the theme switcher content.
 * @cssproperty --theme-switcher-background-color - The background color of the theme switcher.
 * @cssproperty --theme-switcher-border-color - The border color of the theme switcher.
 * @cssproperty --theme-switcher-option-size - The width and height of each theme option button.
 * @cssproperty --theme-switcher-option-font-size - The font size of each theme option button, which can be used to scale the default SVG icons.
 * @cssproperty --theme-switcher-option-color - The text/icon color of each theme option button.
 * @cssproperty --theme-switcher-option-active-color - The text/icon color of the selected theme option button.
 * @cssproperty --theme-switcher-option-active-background-color - The background color of the selected theme option button.
 *
 * @event theme-change - Dispatched when the theme is changed by user interaction. The event detail contains the new theme value.
 * @method define - Static method. Defines the custom element by registering it with the browser's CustomElementRegistry if it hasn't been defined already.
 */
class ThemeSwitcher extends HTMLElement {
  /** @type {Theme} */
  #theme = 'system';

  /** @type {HTMLElement | null} */
  #themeSwitcherEl = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  static get observedAttributes() {
    return ['storage-key', 'light-label', 'system-label', 'dark-label'];
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

    if (name === 'light-label' && oldValue !== newValue) {
      const lightOptionButton = this.shadowRoot?.querySelector('[data-theme-switcher-option][data-theme="light"]');
      lightOptionButton?.setAttribute('aria-label', this.lightLabel);
    }

    if (name === 'system-label' && oldValue !== newValue) {
      const systemOptionButton = this.shadowRoot?.querySelector('[data-theme-switcher-option][data-theme="system"]');
      systemOptionButton?.setAttribute('aria-label', this.systemLabel);
    }

    if (name === 'dark-label' && oldValue !== newValue) {
      const darkOptionButton = this.shadowRoot?.querySelector('[data-theme-switcher-option][data-theme="dark"]');
      darkOptionButton?.setAttribute('aria-label', this.darkLabel);
    }
  }

  /**
   * Whether to disable persistence of the selected theme in local storage.
   *
   * When enabled, theme changes are applied only for the current session and
   * are not saved for future page loads.
   *
   * @type {boolean}
   * @default false
   * @attribute no-storage
   */
  get noStorage() {
    return this.hasAttribute('no-storage');
  }

  set noStorage(value) {
    this.toggleAttribute('no-storage', !!value);
  }

  /**
   * The local storage key used to persist the selected theme.
   *
   * This value is ignored when `no-storage` is enabled.
   *
   * @type {string}
   * @default 'theme-switcher/theme-preference'
   * @attribute storage-key
   */
  get storageKey() {
    return this.getAttribute('storage-key') ?? DEFAULT_STORAGE_KEY;
  }

  set storageKey(value) {
    if (value == null) {
      this.removeAttribute('storage-key');
      return;
    }
    this.setAttribute('storage-key', value);
  }

  /**
   * The aria-label for the light theme option button.
   *
   * @type {string}
   * @default 'Switch to light theme'
   * @attribute light-label
   */
  get lightLabel() {
    return this.getAttribute('light-label') ?? 'Switch to light theme';
  }

  set lightLabel(value) {
    if (value == null) {
      this.removeAttribute('light-label');
      return;
    }
    this.setAttribute('light-label', value);
  }

  /**
   * The aria-label for the system theme option button.
   *
   * @type {string}
   * @default 'Switch to system theme'
   * @attribute system-label
   */
  get systemLabel() {
    return this.getAttribute('system-label') ?? 'Switch to system theme';
  }

  set systemLabel(value) {
    if (value == null) {
      this.removeAttribute('system-label');
      return;
    }
    this.setAttribute('system-label', value);
  }

  /**
   * The aria-label for the dark theme option button.
   *
   * @type {string}
   * @default 'Switch to dark theme'
   * @attribute dark-label
   */
  get darkLabel() {
    return this.getAttribute('dark-label') ?? 'Switch to dark theme';
  }

  set darkLabel(value) {
    if (value == null) {
      this.removeAttribute('dark-label');
      return;
    }
    this.setAttribute('dark-label', value);
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('noStorage');
    this.#upgradeProperty('storageKey');
    this.#upgradeProperty('lightLabel');
    this.#upgradeProperty('systemLabel');
    this.#upgradeProperty('darkLabel');

    this.#themeSwitcherEl = this.shadowRoot?.getElementById('theme-switcher') || null;

    this.#theme = this.#getThemePreference();
    this.#reflectThemePreference();

    this.#themeSwitcherEl?.addEventListener('click', this.#handleSwitcherClick);
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    this.#themeSwitcherEl?.removeEventListener('click', this.#handleSwitcherClick);
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
   *
   * This method is called on initialization and when the theme state changes
   * (e.g. via click event).
   */
  #reflectThemePreference() {
    const optionButtons = this.#themeSwitcherEl?.querySelectorAll(`[data-theme-switcher-option]`);

    if (!optionButtons || optionButtons.length === 0) {
      return;
    }

    optionButtons.forEach(el => {
      const theme = el.getAttribute('data-theme');
      el.setAttribute('aria-checked', theme === this.#theme ? 'true' : 'false');
    });

    this.ownerDocument.documentElement.setAttribute(ROOT_ATTR, this.#theme);
  }

  /**
   * Checks whether a value is a theme option button.
   *
   * @param {unknown} value - The value to check.
   * @returns {value is HTMLButtonElement} True if the value is a theme option button, false otherwise.
   */
  #isThemeOptionButton(value) {
    return value instanceof HTMLButtonElement && value.hasAttribute('data-theme-switcher-option');
  }

  /**
   * Handles user selection of a theme option.
   *
   * When a valid, different theme is selected, this updates the internal theme
   * state, persists the preference, reflects the new state to the DOM, and
   * dispatches a `theme-change` event.
   *
   * @param {MouseEvent} evt - The click event object.
   */
  #handleSwitcherClick = evt => {
    const selectedButton = evt.composedPath().find(node => this.#isThemeOptionButton(node));

    if (!selectedButton) {
      return;
    }

    const selectedTheme = selectedButton.getAttribute('data-theme');

    if (!this.#isTheme(selectedTheme) || selectedTheme === this.#theme) {
      return;
    }

    this.#theme = selectedTheme;
    this.#setThemePreference();
    this.#reflectThemePreference();

    const changeEvent = new CustomEvent('theme-change', {
      bubbles: true,
      composed: true,
      detail: { theme: this.#theme }
    });
    this.dispatchEvent(changeEvent);
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
   * @param {'noStorage' | 'storageKey' | 'lightLabel' | 'systemLabel' | 'darkLabel'} prop - The property name to upgrade.
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
