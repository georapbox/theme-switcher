// @ts-check

/**
 * The selected theme preference.
 *
 * `system` means the page follows the operating system color preference.
 *
 * @typedef {'light' | 'system' | 'dark'} Theme
 */

/**
 * The detail payload of the `theme-change` event.
 *
 * @typedef {object} ThemeChangeEventDetail
 * @property {Theme} theme - The newly selected theme preference.
 */

/** @type {readonly string[]} */
const THEME_VALUES = ['light', 'system', 'dark'];

const css = String.raw;

const styles = css`
  :host {
    --theme-switcher-padding: 0.1875rem;
    --theme-switcher-gap: 0;
    --theme-switcher-background-color: transparent;
    --theme-switcher-border-width: 1px;
    --theme-switcher-border-color: #222222;
    --theme-switcher-border-radius: 9999px;
    --theme-switcher-option-size: 2rem;
    --theme-switcher-option-font-size: calc(var(--theme-switcher-option-size) * 0.5);
    --theme-switcher-option-color: #222222;
    --theme-switcher-option-background-color: transparent;
    --theme-switcher-option-selected-color: #eeeeee;
    --theme-switcher-option-selected-background-color: #222222;
    --theme-switcher-option-border-width: 0;
    --theme-switcher-option-border-color: transparent;
    --theme-switcher-option-border-radius: 50%;
    --theme-switcher-option-focus-ring-width: 2px;
    --theme-switcher-option-focus-ring-color: #2563eb;
    --theme-switcher-option-focus-ring-offset: 2px;

    display: inline-block;
    box-sizing: border-box;
  }

  @supports (color: light-dark(#000000, #ffffff)) {
    :host {
      --theme-switcher-border-color: light-dark(#222222, #eeeeee);
      --theme-switcher-option-color: light-dark(#222222, #eeeeee);
      --theme-switcher-option-selected-color: light-dark(#eeeeee, #222222);
      --theme-switcher-option-selected-background-color: light-dark(#222222, #eeeeee);
      --theme-switcher-option-focus-ring-color: light-dark(#2563eb, #60a5fa);
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
    gap: var(--theme-switcher-gap);
    width: fit-content;
    padding: var(--theme-switcher-padding);
    border: var(--theme-switcher-border-width) solid var(--theme-switcher-border-color);
    border-radius: var(--theme-switcher-border-radius);
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
    border: var(--theme-switcher-option-border-width) solid var(--theme-switcher-option-border-color);
    border-radius: var(--theme-switcher-option-border-radius);
    width: var(--theme-switcher-option-size);
    height: var(--theme-switcher-option-size);
    color: var(--theme-switcher-option-color);
    background-color: var(--theme-switcher-option-background-color);
    font-size: var(--theme-switcher-option-font-size);
    line-height: 0;
  }

  .theme-switcher__option:focus-visible {
    outline: var(--theme-switcher-option-focus-ring-width) solid var(--theme-switcher-option-focus-ring-color);
    outline-offset: var(--theme-switcher-option-focus-ring-offset);
  }

  .theme-switcher__option:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  .theme-switcher__option:not(:disabled) {
    cursor: pointer;
  }

  .theme-switcher__option[aria-checked='true'] {
    background-color: var(--theme-switcher-option-selected-background-color);
    color: var(--theme-switcher-option-selected-color);
  }

  .theme-switcher__option-icon,
  .theme-switcher__option ::slotted(svg) {
    flex-shrink: 0;
  }
`;

const html = String.raw;
const template = document.createElement('template');

template.innerHTML = html`
  <style>
    ${styles}
  </style>

  <div id="theme-switcher" part="base" class="theme-switcher" role="radiogroup">
    <button
      part="theme-option theme-option--light"
      class="theme-switcher__option"
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Switch to light theme"
      data-theme="light"
      data-theme-switcher-option
    >
      <slot name="light-icon">
        <svg
          part="theme-option-icon theme-option-icon--light"
          class="theme-switcher__option-icon"
          viewBox="0 0 16 16"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.75.75V0h-1.5v2h1.5V.75M3.26 4.32l-.53-.53-.35-.35-.53-.53L2.9 1.85l.53.53.35.35.53.53zm8.42-1.06.53-.53.35-.35.53-.53 1.06 1.06-.53.53-.35.35-.53.53zM8 11.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5m0 1.5a4.75 4.75 0 1 0 0-9.5 4.75 4.75 0 0 0 0 9.5m6-5.5h2v1.5h-2zm-13.25 0H0v1.5h2v-1.5H.75m1.62 5.32-.53.53 1.06 1.06.53-.53.35-.35.53-.53-1.06-1.06-.53.53zm10.2 1.06.53.53 1.06-1.06-.53-.53-.35-.35-.53-.53-1.06 1.06.53.53zM8.75 14v2h-1.5v-2z"
          ></path>
        </svg>
      </slot>
    </button>

    <button
      part="theme-option theme-option--system"
      class="theme-switcher__option"
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Switch to system theme"
      data-theme="system"
      data-theme-switcher-option
    >
      <slot name="system-icon">
        <svg
          part="theme-option-icon theme-option-icon--system"
          class="theme-switcher__option-icon"
          viewBox="0 0 16 16"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1H8.75v3h1.75V16h-5v-1.5h1.75v-3H1a1 1 0 0 1-1-1zm1.5.5V10h13V2.5z"
          ></path>
        </svg>
      </slot>
    </button>

    <button
      part="theme-option theme-option--dark"
      class="theme-switcher__option"
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Switch to dark theme"
      data-theme="dark"
      data-theme-switcher-option
    >
      <slot name="dark-icon">
        <svg
          part="theme-option-icon theme-option-icon--dark"
          class="theme-switcher__option-icon"
          viewBox="0 0 16 16"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 8a6 6 0 0 1 3.62-5.51 7 7 0 0 0 7.08 9.25A5.99 5.99 0 0 1 1.5 8M6.42.58a7.5 7.5 0 1 0 7.96 10.41l-.92-1.01a5.5 5.5 0 0 1-6.3-8.25zm6.83.42v1.75H15v1.5h-1.75V6h-1.5V4.25H10v-1.5h1.75V1z"
          ></path>
        </svg>
      </slot>
    </button>
  </div>
`;

/**
 * @summary A custom element for switching between light, dark, and system color themes.
 * @documentation https://github.com/georapbox/theme-switcher
 *
 * @tagname theme-switcher - The default custom element tag name, unless overridden by the `define` method.
 * @extends HTMLElement
 *
 * @property {boolean} noStorage - Whether to disable persistence of the selected theme in local storage.
 * @property {string} storageKey - The local storage key used to persist the selected theme.
 * @property {string} lightLabel - The accessible label for the light theme option button.
 * @property {string} systemLabel - The accessible label for the system theme option button.
 * @property {string} darkLabel - The accessible label for the dark theme option button.
 * @property {boolean} disabled - Whether the theme switcher is disabled.
 *
 * @attribute {boolean} no-storage - Whether to disable persistence of the selected theme in local storage.
 * @attribute {string} storage-key - The local storage key used to persist the selected theme.
 * @attribute {string} light-label - The accessible label for the light theme option button.
 * @attribute {string} system-label - The accessible label for the system theme option button.
 * @attribute {string} dark-label - The accessible label for the dark theme option button.
 * @attribute {boolean} disabled - Whether the theme switcher is disabled.
 *
 * @slot light-icon - Custom icon for the light theme option.
 * @slot system-icon - Custom icon for the system theme option.
 * @slot dark-icon - Custom icon for the dark theme option.
 *
 * @csspart base - The base element of the component.
 * @csspart theme-option - The theme option button.
 * @csspart theme-option--light - The button for selecting the light theme.
 * @csspart theme-option--system - The button for selecting the system theme.
 * @csspart theme-option--dark - The button for selecting the dark theme.
 * @csspart theme-option--selected - The button for the currently selected theme.
 * @csspart theme-option-icon - The icon inside a theme option button.
 * @csspart theme-option-icon--light - The icon inside the light theme option button.
 * @csspart theme-option-icon--system - The icon inside the system theme option button.
 * @csspart theme-option-icon--dark - The icon inside the dark theme option button.
 *
 * @cssproperty --theme-switcher-padding - The padding around the theme switcher content.
 * @cssproperty --theme-switcher-gap - The space between theme option buttons.
 * @cssproperty --theme-switcher-background-color - The background color of the theme switcher.
 * @cssproperty --theme-switcher-border-width - The border width of the theme switcher.
 * @cssproperty --theme-switcher-border-color - The border color of the theme switcher.
 * @cssproperty --theme-switcher-border-radius - The border radius of the theme switcher.
 * @cssproperty --theme-switcher-option-size - The width and height of each theme option button.
 * @cssproperty --theme-switcher-option-font-size - The font size of each theme option button, which can be used to scale the default SVG icons.
 * @cssproperty --theme-switcher-option-color - The color of each theme option button.
 * @cssproperty --theme-switcher-option-background-color - The background color of each theme option button.
 * @cssproperty --theme-switcher-option-selected-color - The color of the selected theme option button.
 * @cssproperty --theme-switcher-option-selected-background-color - The background color of the selected theme option button.
 * @cssproperty --theme-switcher-option-border-width - The border width of each theme option button.
 * @cssproperty --theme-switcher-option-border-color - The border color of each theme option button.
 * @cssproperty --theme-switcher-option-border-radius - The border radius of each theme option button.
 * @cssproperty --theme-switcher-option-focus-ring-width - The width of the focus ring.
 * @cssproperty --theme-switcher-option-focus-ring-color - The color of the focus ring.
 * @cssproperty --theme-switcher-option-focus-ring-offset - The offset of the focus ring from the theme option button.
 *
 * @event theme-change - Dispatched when the theme is changed by user interaction. The event detail contains the new theme value.
 *
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
    return ['storage-key', 'light-label', 'system-label', 'dark-label', 'disabled'];
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

    if (name === 'disabled') {
      this.#reflectDisabledState();
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
    return this.getAttribute('storage-key') || 'theme-switcher/theme-preference';
  }

  set storageKey(value) {
    if (value == null) {
      this.removeAttribute('storage-key');
      return;
    }
    this.setAttribute('storage-key', value);
  }

  /**
   * The accessible label for the light theme option button.
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
   * The accessible label for the system theme option button.
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
   * The accessible label for the dark theme option button.
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
   * Whether the theme switcher is disabled.
   *
   * @type {boolean}
   * @default false
   * @attribute disabled
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this.toggleAttribute('disabled', !!value);
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
    this.#upgradeProperty('disabled');

    this.#themeSwitcherEl = this.shadowRoot?.getElementById('theme-switcher') || null;

    this.#theme = this.#getThemePreference();
    this.#reflectThemePreference();
    this.#reflectDisabledState();

    this.#themeSwitcherEl?.addEventListener('click', this.#handleSwitcherClick);
    this.#themeSwitcherEl?.addEventListener('keydown', this.#handleSwitcherKeyDown);
    this.ownerDocument.addEventListener('theme-change', this.#handleThemeChange);
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    this.#themeSwitcherEl?.removeEventListener('click', this.#handleSwitcherClick);
    this.#themeSwitcherEl?.removeEventListener('keydown', this.#handleSwitcherKeyDown);
    this.ownerDocument.removeEventListener('theme-change', this.#handleThemeChange);
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

    try {
      const savedTheme = localStorage.getItem(this.storageKey);

      if (this.#isTheme(savedTheme)) {
        return savedTheme;
      }
    } catch {
      // Fail silently...
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
      localStorage.setItem(this.storageKey, this.#theme);
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
    const optionButtons = this.#themeSwitcherEl?.querySelectorAll('[data-theme-switcher-option]');

    if (!optionButtons || optionButtons.length === 0) {
      return;
    }

    optionButtons.forEach(el => {
      const theme = el.getAttribute('data-theme');
      const isSelected = theme === this.#theme;

      el.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      el.part?.toggle('theme-option--selected', isSelected);
      el.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    this.ownerDocument.documentElement.setAttribute('data-theme', this.#theme);
  }

  /**
   * Changes the theme if the value is valid and different from the current theme.
   *
   * @param {unknown} theme - The new theme to switch to.
   * @param {{emit?: boolean, persist?: boolean}} [options] - Additional options for changing the theme.
   * @return {boolean} True if the theme was changed, false if the new theme is invalid or the same as the current theme.
   */
  #changeTheme(theme, options = {}) {
    const { emit = false, persist = true } = options;

    if (!this.#isTheme(theme) || theme === this.#theme) {
      return false;
    }

    this.#theme = theme;

    if (persist) {
      this.#setThemePreference();
    }

    this.#reflectThemePreference();

    if (emit) {
      this.#emitEvent('theme-change', { theme: this.#theme });
    }

    return true;
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
   * Reflects the disabled state of the theme switcher based on the `disabled` property.
   */
  #reflectDisabledState() {
    const optionButtons = this.#themeSwitcherEl?.querySelectorAll('[data-theme-switcher-option]') || [];

    optionButtons.forEach(button => {
      if (!this.#isThemeOptionButton(button)) {
        return;
      }
      button.disabled = this.disabled;
    });
  }

  /**
   * Handles user selection of a theme option.
   *
   * @param {MouseEvent} evt - The click event object.
   */
  #handleSwitcherClick = evt => {
    const selectedButton = evt.composedPath().find(node => this.#isThemeOptionButton(node));

    if (!selectedButton) {
      return;
    }

    const selectedTheme = selectedButton.getAttribute('data-theme');

    this.#changeTheme(selectedTheme, { emit: true });
  };

  /**
   * Handles keyboard navigation and selection of theme options.
   *
   * @param {KeyboardEvent} evt - The keyboard event object.
   */
  #handleSwitcherKeyDown = evt => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(evt.key)) {
      return;
    }

    const optionButtons = Array.from(
      this.#themeSwitcherEl?.querySelectorAll('[data-theme-switcher-option]') || []
    ).filter(this.#isThemeOptionButton);

    if (optionButtons.length === 0) {
      return;
    }

    const currentIndex = optionButtons.findIndex(button => button.getAttribute('aria-checked') === 'true');
    let nextIndex = currentIndex;

    if (evt.key === 'ArrowLeft' || evt.key === 'ArrowUp') {
      nextIndex = currentIndex <= 0 ? optionButtons.length - 1 : currentIndex - 1;
    }

    if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
      nextIndex = currentIndex === optionButtons.length - 1 ? 0 : currentIndex + 1;
    }

    if (evt.key === 'Home') {
      nextIndex = 0;
    }

    if (evt.key === 'End') {
      nextIndex = optionButtons.length - 1;
    }

    const nextButton = optionButtons[nextIndex];
    const nextTheme = nextButton.getAttribute('data-theme');

    evt.preventDefault();

    if (this.#changeTheme(nextTheme, { emit: true })) {
      nextButton.focus();
    }
  };

  /**
   * Syncs this instance when another theme switcher changes the theme.
   *
   * @param {Event} evt - The theme change event object.
   */
  #handleThemeChange = evt => {
    if (evt.target === this || !(evt instanceof CustomEvent)) {
      return;
    }

    const theme = /** @type CustomEvent<ThemeChangeEventDetail> */ (evt).detail?.theme;

    this.#changeTheme(theme, { persist: false });
  };

  /**
   * Emit a custom event with the given name and detail.
   *
   * @template D
   * @param {string} eventName - The name of the event.
   * @param {D} [detail] - The detail payload of the event.
   * @param {CustomEventInit<D>} [init] - Override the default event initialization options.
   * @returns {boolean} - Returns false if at least one event listener called `preventDefault()`, otherwise true.
   */
  #emitEvent(eventName, detail, init) {
    const options = {
      bubbles: true,
      composed: true,
      cancelable: false,
      ...init,
      detail
    };
    const evt = new CustomEvent(eventName, options);
    return this.dispatchEvent(evt);
  }

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
   * @param {'noStorage' | 'storageKey' | 'lightLabel' | 'systemLabel' | 'darkLabel' | 'disabled'} prop - The property name to upgrade.
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
