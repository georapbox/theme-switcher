// @ts-check

const html = String.raw;
const css = String.raw;

const styles = css`
  :host {
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
`;

const template = document.createElement('template');

template.innerHTML = html`
  <style>
    ${styles}
  </style>

  <div>This is a custom element.</div>
`;

/**
 * @summary foo-bar description goes here
 * @documentation https://github.com/georapbox/foo-bar
 *
 * @tagname foo-bar - The default custom element tag name, unless overridden by the `define` method.
 * @extends HTMLElement
 *
 * @property {string} exampleProp - Example property. Description goes here.
 *
 * @attribute {string} example-prop - Example attribute. Description goes here.
 *
 * @method define - Static method. Defines the custom element by registering it with the browser's CustomElementRegistry if it hasn't been defined already.
 */
class FooBar extends HTMLElement {
  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  static get observedAttributes() {
    return [''];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {} // eslint-disable-line no-unused-vars

  /**
   * Example property with getter and setter that reflects to an attribute.
   *
   * @type {string}
   * @attribute example-prop
   * @default ''
   */
  get exampleProp() {
    return this.getAttribute('example-prop') || '';
  }

  set exampleProp(value) {
    this.setAttribute('example-prop', value);
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('exampleProp');
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {}

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
   * @param {'exampleProp'} prop - The property name to upgrade.
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
   * @param {string} [tagName='foo-bar'] - The tag name to use for the custom element. Must include a hyphen.
   */
  static define(tagName = 'foo-bar') {
    if (typeof window === 'undefined' || window.customElements.get(tagName)) {
      return;
    }
    window.customElements.define(tagName, FooBar);
  }
}

export { FooBar };
