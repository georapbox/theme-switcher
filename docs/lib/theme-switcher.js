/*!
 * @georapbox/theme-switcher
 * A custom element for switching between light, dark, and system color themes.
 *
 * @version 1.0.0
 * @homepage https://github.com/georapbox/theme-switcher#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
var l=["light","system","dark"],d=String.raw,m=d`
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
`,u=String.raw,h=document.createElement("template");h.innerHTML=u`
  <style>
    ${m}
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
`;var s=class n extends HTMLElement{#e="system";#t=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(h.content.cloneNode(!0))}static get observedAttributes(){return["storage-key","light-label","system-label","dark-label","disabled"]}attributeChangedCallback(e,t,i){e==="storage-key"&&t!==i&&(this.#e=this.#n(),this.#o()),e==="light-label"&&t!==i&&this.shadowRoot?.querySelector('[data-theme-switcher-option][data-theme="light"]')?.setAttribute("aria-label",this.lightLabel),e==="system-label"&&t!==i&&this.shadowRoot?.querySelector('[data-theme-switcher-option][data-theme="system"]')?.setAttribute("aria-label",this.systemLabel),e==="dark-label"&&t!==i&&this.shadowRoot?.querySelector('[data-theme-switcher-option][data-theme="dark"]')?.setAttribute("aria-label",this.darkLabel),e==="disabled"&&this.#a()}get noStorage(){return this.hasAttribute("no-storage")}set noStorage(e){this.toggleAttribute("no-storage",!!e)}get storageKey(){return this.getAttribute("storage-key")||"theme-switcher/theme-preference"}set storageKey(e){if(e==null){this.removeAttribute("storage-key");return}this.setAttribute("storage-key",e)}get lightLabel(){return this.getAttribute("light-label")??"Switch to light theme"}set lightLabel(e){if(e==null){this.removeAttribute("light-label");return}this.setAttribute("light-label",e)}get systemLabel(){return this.getAttribute("system-label")??"Switch to system theme"}set systemLabel(e){if(e==null){this.removeAttribute("system-label");return}this.setAttribute("system-label",e)}get darkLabel(){return this.getAttribute("dark-label")??"Switch to dark theme"}set darkLabel(e){if(e==null){this.removeAttribute("dark-label");return}this.setAttribute("dark-label",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",!!e)}connectedCallback(){this.#i("noStorage"),this.#i("storageKey"),this.#i("lightLabel"),this.#i("systemLabel"),this.#i("darkLabel"),this.#i("disabled"),this.#t=this.shadowRoot?.getElementById("theme-switcher")||null,this.#e=this.#n(),this.#o(),this.#a(),this.#t?.addEventListener("click",this.#c),this.#t?.addEventListener("keydown",this.#l),this.ownerDocument.addEventListener("theme-change",this.#d)}disconnectedCallback(){this.#t?.removeEventListener("click",this.#c),this.#t?.removeEventListener("keydown",this.#l),this.ownerDocument.removeEventListener("theme-change",this.#d)}#h(e){return typeof e=="string"&&l.includes(e)}#n(){if(this.noStorage)return"system";try{let e=localStorage.getItem(this.storageKey);if(this.#h(e))return e}catch{}return"system"}#m(){if(!this.noStorage)try{localStorage.setItem(this.storageKey,this.#e)}catch{}}#o(){let e=this.#t?.querySelectorAll("[data-theme-switcher-option]");!e||e.length===0||(e.forEach(t=>{let o=t.getAttribute("data-theme")===this.#e;t.setAttribute("aria-checked",o?"true":"false"),t.part?.toggle("theme-option--selected",o),t.setAttribute("tabindex",o?"0":"-1")}),this.ownerDocument.documentElement.setAttribute("data-theme",this.#e))}#r(e,t={}){let{emit:i=!1,persist:o=!0}=t;return!this.#h(e)||e===this.#e?!1:(this.#e=e,o&&this.#m(),this.#o(),i&&this.#u("theme-change",{theme:this.#e}),!0)}#s(e){return e instanceof HTMLButtonElement&&e.hasAttribute("data-theme-switcher-option")}#a(){(this.#t?.querySelectorAll("[data-theme-switcher-option]")||[]).forEach(t=>{this.#s(t)&&(t.disabled=this.disabled)})}#c=e=>{let t=e.composedPath().find(o=>this.#s(o));if(!t)return;let i=t.getAttribute("data-theme");this.#r(i,{emit:!0})};#l=e=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))return;let t=Array.from(this.#t?.querySelectorAll("[data-theme-switcher-option]")||[]).filter(this.#s);if(t.length===0)return;let i=t.findIndex(c=>c.getAttribute("aria-checked")==="true"),o=i;(e.key==="ArrowLeft"||e.key==="ArrowUp")&&(o=i<=0?t.length-1:i-1),(e.key==="ArrowRight"||e.key==="ArrowDown")&&(o=i===t.length-1?0:i+1),e.key==="Home"&&(o=0),e.key==="End"&&(o=t.length-1);let r=t[o],a=r.getAttribute("data-theme");e.preventDefault(),this.#r(a,{emit:!0})&&r.focus()};#d=e=>{if(e.target===this||!(e instanceof CustomEvent))return;let t=e.detail?.theme;this.#r(t,{persist:!1})};#u(e,t,i){let o={bubbles:!0,composed:!0,cancelable:!1,...i,detail:t},r=new CustomEvent(e,o);return this.dispatchEvent(r)}#i(e){let t=this;if(Object.prototype.hasOwnProperty.call(t,e)){let i=t[e];delete t[e],t[e]=i}}static define(e="theme-switcher"){typeof window>"u"||window.customElements.get(e)||window.customElements.define(e,n)}};export{s as ThemeSwitcher};
