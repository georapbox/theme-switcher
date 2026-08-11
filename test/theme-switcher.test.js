import { expect, fixture, fixtureCleanup, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import { ThemeSwitcher } from '../src/theme-switcher.js';

ThemeSwitcher.define();

const getOptions = el => ({
  lightOptionButton: el.shadowRoot.querySelector('[data-theme="light"]'),
  systemOptionButton: el.shadowRoot.querySelector('[data-theme="system"]'),
  darkOptionButton: el.shadowRoot.querySelector('[data-theme="dark"]')
});

const pressKey = (target, key) => {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    composed: true,
    cancelable: true
  });
  target.dispatchEvent(event);
  return event;
};

describe('theme-switcher', () => {
  afterEach(() => {
    fixtureCleanup();
    sinon.restore();
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  describe('custom element definition', () => {
    it('does not register the custom element more than once', () => {
      const defineSpy = sinon.spy(window.customElements, 'define');

      expect(() => ThemeSwitcher.define()).to.not.throw();
      sinon.assert.notCalled(defineSpy);
    });
  });

  describe('accessibility', () => {
    it('passes accessibility checks with default configuration', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);

      await expect(el).to.be.accessible();
    });

    it('renders the root control as a radiogroup', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const baseEl = el.shadowRoot.querySelector('.theme-switcher');

      expect(baseEl.getAttribute('role')).to.equal('radiogroup');
    });

    it('renders each theme option as a radio', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const options = el.shadowRoot.querySelectorAll('[data-theme-switcher-option]');

      options.forEach(option => {
        expect(option.getAttribute('role')).to.equal('radio');
      });
    });

    it('uses default aria-labels for theme options', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(lightOptionButton.getAttribute('aria-label')).to.equal('Switch to light theme');
      expect(systemOptionButton.getAttribute('aria-label')).to.equal('Switch to system theme');
      expect(darkOptionButton.getAttribute('aria-label')).to.equal('Switch to dark theme');
    });

    it('uses custom aria-labels from label attributes', async () => {
      const el = await fixture(html`
        <theme-switcher light-label="LIGHT_LABEL" system-label="SYSTEM_LABEL" dark-label="DARK_LABEL"></theme-switcher>
      `);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(lightOptionButton.getAttribute('aria-label')).to.equal('LIGHT_LABEL');
      expect(systemOptionButton.getAttribute('aria-label')).to.equal('SYSTEM_LABEL');
      expect(darkOptionButton.getAttribute('aria-label')).to.equal('DARK_LABEL');
    });

    it('falls back to default aria-labels when custom label properties are set to null or undefined', async () => {
      const el = await fixture(html`
        <theme-switcher light-label="LIGHT_LABEL" system-label="SYSTEM_LABEL" dark-label="DARK_LABEL"></theme-switcher>
      `);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      el.lightLabel = null;
      el.systemLabel = null;
      el.darkLabel = undefined;

      expect(lightOptionButton.getAttribute('aria-label')).to.equal('Switch to light theme');
      expect(systemOptionButton.getAttribute('aria-label')).to.equal('Switch to system theme');
      expect(darkOptionButton.getAttribute('aria-label')).to.equal('Switch to dark theme');
    });

    it('falls back to default aria-labels when custom label attributes are removed', async () => {
      const el = await fixture(html`
        <theme-switcher light-label="LIGHT_LABEL" system-label="SYSTEM_LABEL" dark-label="DARK_LABEL"></theme-switcher>
      `);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      el.removeAttribute('light-label');
      el.removeAttribute('system-label');
      el.removeAttribute('dark-label');

      expect(lightOptionButton.getAttribute('aria-label')).to.equal('Switch to light theme');
      expect(systemOptionButton.getAttribute('aria-label')).to.equal('Switch to system theme');
      expect(darkOptionButton.getAttribute('aria-label')).to.equal('Switch to dark theme');
    });
  });

  describe('properties - attributes', () => {
    describe('noStorage', () => {
      it('reflects no-storage attribute to noStorage property', async () => {
        const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
        expect(el.noStorage).to.be.true;
      });

      it('reflects noStorage property to no-storage attribute', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);
        el.noStorage = true;
        expect(el.hasAttribute('no-storage')).to.be.true;
        el.noStorage = false;
        expect(el.hasAttribute('no-storage')).to.be.false;
      });
    });

    describe('storageKey', () => {
      it('reflects storage-key attribute to storageKey property', async () => {
        const el = await fixture(html`<theme-switcher storage-key="STORAGE_KEY"></theme-switcher>`);
        expect(el.storageKey).to.equal('STORAGE_KEY');
      });

      it('reflects storageKey property to storage-key attribute', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);
        el.storageKey = 'STORAGE_KEY';
        expect(el.getAttribute('storage-key')).to.equal('STORAGE_KEY');
      });

      it('resets storageKey to the default value when the storage-key attribute is removed', async () => {
        const el = await fixture(html`<theme-switcher storage-key="STORAGE_KEY"></theme-switcher>`);
        expect(el.storageKey).to.equal('STORAGE_KEY');
        el.removeAttribute('storage-key');
        expect(el.storageKey).to.equal('theme-switcher/theme-preference');
      });

      it('resets storageKey to the default value when set to null', async () => {
        const el = await fixture(html`<theme-switcher storage-key="STORAGE_KEY"></theme-switcher>`);
        expect(el.storageKey).to.equal('STORAGE_KEY');
        el.storageKey = null;
        expect(el.storageKey).to.equal('theme-switcher/theme-preference');
      });
    });

    describe('lightLabel', () => {
      it('reflects light-label attribute to lightLabel property', async () => {
        const el = await fixture(html`<theme-switcher light-label="LIGHT_LABEL"></theme-switcher>`);
        expect(el.lightLabel).to.equal('LIGHT_LABEL');
      });

      it('reflects lightLabel property to light-label attribute', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);
        el.lightLabel = 'LIGHT_LABEL';
        expect(el.getAttribute('light-label')).to.equal('LIGHT_LABEL');
      });
    });

    describe('systemLabel', () => {
      it('reflects system-label attribute to systemLabel property', async () => {
        const el = await fixture(html`<theme-switcher system-label="SYSTEM_LABEL"></theme-switcher>`);
        expect(el.systemLabel).to.equal('SYSTEM_LABEL');
      });

      it('reflects systemLabel property to system-label attribute', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);
        el.systemLabel = 'SYSTEM_LABEL';
        expect(el.getAttribute('system-label')).to.equal('SYSTEM_LABEL');
      });
    });

    describe('darkLabel', () => {
      it('reflects dark-label attribute to darkLabel property', async () => {
        const el = await fixture(html`<theme-switcher dark-label="DARK_LABEL"></theme-switcher>`);
        expect(el.darkLabel).to.equal('DARK_LABEL');
      });

      it('reflects darkLabel property to dark-label attribute', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);
        el.darkLabel = 'DARK_LABEL';
        expect(el.getAttribute('dark-label')).to.equal('DARK_LABEL');
      });
    });

    describe('disabled', () => {
      it('reflects attribute disabled to property disabled', async () => {
        const el = await fixture(html`<theme-switcher disabled></theme-switcher>`);
        expect(el.disabled).to.be.true;
      });

      it('reflects property disabled to attribute disabled', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);
        el.disabled = true;
        expect(el.hasAttribute('disabled')).to.be.true;
        el.disabled = false;
        expect(el.hasAttribute('disabled')).to.be.false;
      });
    });
  });

  describe('slots', () => {
    it('should have theme-option-light-icon slot', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const lightIconSlot = el.shadowRoot.querySelector('slot[name="light-icon"]');
      expect(lightIconSlot).to.exist;

      const span = document.createElement('span');
      span.setAttribute('slot', 'light-icon');
      span.textContent = 'Light';
      el.appendChild(span);
      expect(lightIconSlot.assignedElements()).to.deep.equal([span]);
    });

    it('should have theme-option-system-icon slot', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const systemIconSlot = el.shadowRoot.querySelector('slot[name="system-icon"]');
      expect(systemIconSlot).to.exist;

      const span = document.createElement('span');
      span.setAttribute('slot', 'system-icon');
      span.textContent = 'System';
      el.appendChild(span);
      expect(systemIconSlot.assignedElements()).to.deep.equal([span]);
    });

    it('should have theme-option-dark-icon slot', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const darkIconSlot = el.shadowRoot.querySelector('slot[name="dark-icon"]');
      expect(darkIconSlot).to.exist;

      const span = document.createElement('span');
      span.setAttribute('slot', 'dark-icon');
      span.textContent = 'Dark';
      el.appendChild(span);
      expect(darkIconSlot.assignedElements()).to.deep.equal([span]);
    });
  });

  describe('CSS Parts', () => {
    it('should have base part', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const baseElement = el.shadowRoot.getElementById('theme-switcher');
      expect(baseElement.part.contains('base')).to.be.true;
    });

    it('each option button should have the appropriate CSS parts', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(lightOptionButton.part.contains('theme-option')).to.be.true;
      expect(lightOptionButton.part.contains('theme-option--light')).to.be.true;

      expect(systemOptionButton.part.contains('theme-option')).to.be.true;
      expect(systemOptionButton.part.contains('theme-option--system')).to.be.true;
      expect(systemOptionButton.part.contains('theme-option--selected')).to.be.true;

      expect(darkOptionButton.part.contains('theme-option')).to.be.true;
      expect(darkOptionButton.part.contains('theme-option--dark')).to.be.true;

      const lightOptionIcon = lightOptionButton.querySelector('.theme-switcher__option-icon');
      expect(lightOptionIcon.part.contains('theme-option-icon')).to.be.true;
      expect(lightOptionIcon.part.contains('theme-option-icon--light')).to.be.true;

      const systemOptionIcon = systemOptionButton.querySelector('.theme-switcher__option-icon');
      expect(systemOptionIcon.part.contains('theme-option-icon')).to.be.true;
      expect(systemOptionIcon.part.contains('theme-option-icon--system')).to.be.true;

      const darkOptionIcon = darkOptionButton.querySelector('.theme-switcher__option-icon');
      expect(darkOptionIcon.part.contains('theme-option-icon')).to.be.true;
      expect(darkOptionIcon.part.contains('theme-option-icon--dark')).to.be.true;
    });
  });

  describe('events', () => {
    it('"theme-change" event is fired when the theme is changed', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      const listener1 = oneEvent(el, 'theme-change');
      lightOptionButton.click();
      expect((await listener1).detail).to.deep.equal({ theme: 'light' });

      const listener2 = oneEvent(el, 'theme-change');
      systemOptionButton.click();
      expect((await listener2).detail).to.deep.equal({ theme: 'system' });

      const listener3 = oneEvent(el, 'theme-change');
      darkOptionButton.click();
      expect((await listener3).detail).to.deep.equal({ theme: 'dark' });
    });
  });

  describe('theme state', () => {
    it('sets the default theme on the document root', async () => {
      await fixture(html`<theme-switcher no-storage></theme-switcher>`);

      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');
    });

    it('updates the document root theme when an option is selected', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');

      lightOptionButton.click();
      expect(document.documentElement.getAttribute('data-theme')).to.equal('light');

      systemOptionButton.click();
      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');

      darkOptionButton.click();
      expect(document.documentElement.getAttribute('data-theme')).to.equal('dark');
    });

    it('updates the selected radio state when an option is selected', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(systemOptionButton.getAttribute('aria-checked')).to.equal('true');

      lightOptionButton.click();

      expect(lightOptionButton.getAttribute('aria-checked')).to.equal('true');
      expect(systemOptionButton.getAttribute('aria-checked')).to.equal('false');
      expect(darkOptionButton.getAttribute('aria-checked')).to.equal('false');

      systemOptionButton.click();

      expect(lightOptionButton.getAttribute('aria-checked')).to.equal('false');
      expect(systemOptionButton.getAttribute('aria-checked')).to.equal('true');
      expect(darkOptionButton.getAttribute('aria-checked')).to.equal('false');

      darkOptionButton.click();

      expect(lightOptionButton.getAttribute('aria-checked')).to.equal('false');
      expect(systemOptionButton.getAttribute('aria-checked')).to.equal('false');
      expect(darkOptionButton.getAttribute('aria-checked')).to.equal('true');
    });
  });

  describe('keyboard navigation', () => {
    it('moves to the next option with ArrowRight', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(systemOptionButton.getAttribute('aria-checked')).to.equal('true');

      systemOptionButton.focus();
      const event = pressKey(systemOptionButton, 'ArrowRight');

      expect(event.defaultPrevented).to.be.true;

      expect(lightOptionButton.getAttribute('aria-checked')).to.equal('false');
      expect(systemOptionButton.getAttribute('aria-checked')).to.equal('false');
      expect(darkOptionButton.getAttribute('aria-checked')).to.equal('true');

      expect(lightOptionButton.getAttribute('tabindex')).to.equal('-1');
      expect(systemOptionButton.getAttribute('tabindex')).to.equal('-1');
      expect(darkOptionButton.getAttribute('tabindex')).to.equal('0');

      expect(document.documentElement.getAttribute('data-theme')).to.equal('dark');
      expect(el.shadowRoot.activeElement).to.equal(darkOptionButton);
    });

    it('moves to the previous option with ArrowLeft', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(systemOptionButton.getAttribute('aria-checked')).to.equal('true');

      systemOptionButton.focus();
      pressKey(systemOptionButton, 'ArrowLeft');

      expect(lightOptionButton.getAttribute('aria-checked')).to.equal('true');
      expect(systemOptionButton.getAttribute('aria-checked')).to.equal('false');
      expect(darkOptionButton.getAttribute('aria-checked')).to.equal('false');

      expect(document.documentElement.getAttribute('data-theme')).to.equal('light');
      expect(el.shadowRoot.activeElement).to.equal(lightOptionButton);
    });

    it('moves to the next option with ArrowDown', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { systemOptionButton, darkOptionButton } = getOptions(el);

      systemOptionButton.focus();
      pressKey(systemOptionButton, 'ArrowDown');

      expect(darkOptionButton.getAttribute('aria-checked')).to.equal('true');
      expect(document.documentElement.getAttribute('data-theme')).to.equal('dark');
      expect(el.shadowRoot.activeElement).to.equal(darkOptionButton);
    });

    it('moves to the previous option with ArrowUp', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton } = getOptions(el);

      systemOptionButton.focus();
      pressKey(systemOptionButton, 'ArrowUp');

      expect(lightOptionButton.getAttribute('aria-checked')).to.equal('true');
      expect(document.documentElement.getAttribute('data-theme')).to.equal('light');
      expect(el.shadowRoot.activeElement).to.equal(lightOptionButton);
    });

    it('wraps from the last option to the first option', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, darkOptionButton } = getOptions(el);

      darkOptionButton.click();
      expect(darkOptionButton.getAttribute('aria-checked')).to.equal('true');

      darkOptionButton.focus();
      pressKey(darkOptionButton, 'ArrowRight');

      expect(lightOptionButton.getAttribute('aria-checked')).to.equal('true');
      expect(document.documentElement.getAttribute('data-theme')).to.equal('light');
      expect(el.shadowRoot.activeElement).to.equal(lightOptionButton);
    });

    it('wraps from the first option to the last option', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, darkOptionButton } = getOptions(el);

      lightOptionButton.click();
      expect(lightOptionButton.getAttribute('aria-checked')).to.equal('true');

      lightOptionButton.focus();
      pressKey(lightOptionButton, 'ArrowLeft');

      expect(darkOptionButton.getAttribute('aria-checked')).to.equal('true');
      expect(document.documentElement.getAttribute('data-theme')).to.equal('dark');
      expect(el.shadowRoot.activeElement).to.equal(darkOptionButton);
    });

    it('moves to the first option with Home', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, darkOptionButton } = getOptions(el);

      darkOptionButton.click();
      darkOptionButton.focus();

      pressKey(darkOptionButton, 'Home');

      expect(lightOptionButton.getAttribute('aria-checked')).to.equal('true');
      expect(document.documentElement.getAttribute('data-theme')).to.equal('light');
      expect(el.shadowRoot.activeElement).to.equal(lightOptionButton);
    });

    it('moves to the last option with End', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { systemOptionButton, darkOptionButton } = getOptions(el);

      systemOptionButton.focus();

      pressKey(systemOptionButton, 'End');

      expect(darkOptionButton.getAttribute('aria-checked')).to.equal('true');
      expect(document.documentElement.getAttribute('data-theme')).to.equal('dark');
      expect(el.shadowRoot.activeElement).to.equal(darkOptionButton);
    });

    it('fires "theme-change" when the theme is changed by keyboard', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { systemOptionButton } = getOptions(el);

      const listener = oneEvent(el, 'theme-change');

      systemOptionButton.focus();
      pressKey(systemOptionButton, 'ArrowRight');

      expect((await listener).detail).to.deep.equal({ theme: 'dark' });
    });

    it('does not handle unrelated keys', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);
      const themeChangeSpy = sinon.spy();

      el.addEventListener('theme-change', themeChangeSpy);

      systemOptionButton.focus();
      const event = pressKey(systemOptionButton, 'Tab');

      expect(event.defaultPrevented).to.be.false;

      expect(lightOptionButton.getAttribute('aria-checked')).to.equal('false');
      expect(systemOptionButton.getAttribute('aria-checked')).to.equal('true');
      expect(darkOptionButton.getAttribute('aria-checked')).to.equal('false');

      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');
      expect(el.shadowRoot.activeElement).to.equal(systemOptionButton);

      sinon.assert.notCalled(themeChangeSpy);
    });
  });
});
