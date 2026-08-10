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

      expect(baseEl).to.have.attribute('role', 'radiogroup');
    });

    it('renders each theme option as a radio', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const options = el.shadowRoot.querySelectorAll('[data-theme-switcher-option]');

      options.forEach(option => {
        expect(option).to.have.attribute('role', 'radio');
      });
    });

    it('uses default aria-labels for theme options', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(lightOptionButton).to.have.attribute('aria-label', 'Switch to light theme');
      expect(systemOptionButton).to.have.attribute('aria-label', 'Switch to system theme');
      expect(darkOptionButton).to.have.attribute('aria-label', 'Switch to dark theme');
    });

    it('uses custom aria-labels from label attributes', async () => {
      const el = await fixture(html`
        <theme-switcher light-label="LIGHT_LABEL" system-label="SYSTEM_LABEL" dark-label="DARK_LABEL"></theme-switcher>
      `);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(lightOptionButton).to.have.attribute('aria-label', 'LIGHT_LABEL');
      expect(systemOptionButton).to.have.attribute('aria-label', 'SYSTEM_LABEL');
      expect(darkOptionButton).to.have.attribute('aria-label', 'DARK_LABEL');
    });

    it('falls back to default aria-labels when custom label properties are set to null or undefined', async () => {
      const el = await fixture(html`
        <theme-switcher light-label="LIGHT_LABEL" system-label="SYSTEM_LABEL" dark-label="DARK_LABEL"></theme-switcher>
      `);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      el.lightLabel = null;
      el.systemLabel = null;
      el.darkLabel = undefined;

      expect(lightOptionButton).to.have.attribute('aria-label', 'Switch to light theme');
      expect(systemOptionButton).to.have.attribute('aria-label', 'Switch to system theme');
      expect(darkOptionButton).to.have.attribute('aria-label', 'Switch to dark theme');
    });

    it('falls back to default aria-labels when custom label attributes are removed', async () => {
      const el = await fixture(html`
        <theme-switcher light-label="LIGHT_LABEL" system-label="SYSTEM_LABEL" dark-label="DARK_LABEL"></theme-switcher>
      `);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      el.removeAttribute('light-label');
      el.removeAttribute('system-label');
      el.removeAttribute('dark-label');

      expect(lightOptionButton).to.have.attribute('aria-label', 'Switch to light theme');
      expect(systemOptionButton).to.have.attribute('aria-label', 'Switch to system theme');
      expect(darkOptionButton).to.have.attribute('aria-label', 'Switch to dark theme');
    });
  });

  describe('property and attribute reflection', () => {
    describe('noStorage', () => {
      it('reflects the no-storage attribute to the noStorage property', async () => {
        const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);

        expect(el.noStorage).to.be.true;
      });

      it('reflects the noStorage property to the no-storage attribute', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);

        el.noStorage = true;
        expect(el).to.have.attribute('no-storage');

        el.noStorage = false;
        expect(el).to.not.have.attribute('no-storage');
      });
    });

    describe('storageKey', () => {
      it('reflects the storage-key attribute to the storageKey property', async () => {
        const el = await fixture(html`<theme-switcher storage-key="STORAGE_KEY"></theme-switcher>`);

        expect(el.storageKey).to.equal('STORAGE_KEY');
      });

      it('reflects the storageKey property to the storage-key attribute', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);

        el.storageKey = 'STORAGE_KEY';

        expect(el).to.have.attribute('storage-key', 'STORAGE_KEY');
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
      it('reflects the light-label attribute to the lightLabel property', async () => {
        const el = await fixture(html`<theme-switcher light-label="LIGHT_LABEL"></theme-switcher>`);

        expect(el.lightLabel).to.equal('LIGHT_LABEL');
      });

      it('reflects the lightLabel property to the light-label attribute', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);

        el.lightLabel = 'LIGHT_LABEL';

        expect(el).to.have.attribute('light-label', 'LIGHT_LABEL');
      });
    });

    describe('systemLabel', () => {
      it('reflects the system-label attribute to the systemLabel property', async () => {
        const el = await fixture(html`<theme-switcher system-label="SYSTEM_LABEL"></theme-switcher>`);

        expect(el.systemLabel).to.equal('SYSTEM_LABEL');
      });

      it('reflects the systemLabel property to the system-label attribute', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);

        el.systemLabel = 'SYSTEM_LABEL';

        expect(el).to.have.attribute('system-label', 'SYSTEM_LABEL');
      });
    });

    describe('darkLabel', () => {
      it('reflects the dark-label attribute to the darkLabel property', async () => {
        const el = await fixture(html`<theme-switcher dark-label="DARK_LABEL"></theme-switcher>`);

        expect(el.darkLabel).to.equal('DARK_LABEL');
      });

      it('reflects the darkLabel property to the dark-label attribute', async () => {
        const el = await fixture(html`<theme-switcher></theme-switcher>`);

        el.darkLabel = 'DARK_LABEL';

        expect(el).to.have.attribute('dark-label', 'DARK_LABEL');
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

      expect(document.documentElement).to.have.attribute('data-theme', 'system');
    });

    it('updates the document root theme when an option is selected', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(document.documentElement).to.have.attribute('data-theme', 'system');

      lightOptionButton.click();
      expect(document.documentElement).to.have.attribute('data-theme', 'light');

      systemOptionButton.click();
      expect(document.documentElement).to.have.attribute('data-theme', 'system');

      darkOptionButton.click();
      expect(document.documentElement).to.have.attribute('data-theme', 'dark');
    });

    it('updates the selected radio state when an option is selected', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(systemOptionButton).to.have.attribute('aria-checked', 'true');

      lightOptionButton.click();

      expect(lightOptionButton).to.have.attribute('aria-checked', 'true');
      expect(systemOptionButton).to.have.attribute('aria-checked', 'false');
      expect(darkOptionButton).to.have.attribute('aria-checked', 'false');

      systemOptionButton.click();

      expect(lightOptionButton).to.have.attribute('aria-checked', 'false');
      expect(systemOptionButton).to.have.attribute('aria-checked', 'true');
      expect(darkOptionButton).to.have.attribute('aria-checked', 'false');

      darkOptionButton.click();

      expect(lightOptionButton).to.have.attribute('aria-checked', 'false');
      expect(systemOptionButton).to.have.attribute('aria-checked', 'false');
      expect(darkOptionButton).to.have.attribute('aria-checked', 'true');
    });
  });

  describe('keyboard navigation', () => {
    it('moves to the next option with ArrowRight', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(systemOptionButton).to.have.attribute('aria-checked', 'true');

      systemOptionButton.focus();
      const event = pressKey(systemOptionButton, 'ArrowRight');

      expect(event.defaultPrevented).to.be.true;

      expect(lightOptionButton).to.have.attribute('aria-checked', 'false');
      expect(systemOptionButton).to.have.attribute('aria-checked', 'false');
      expect(darkOptionButton).to.have.attribute('aria-checked', 'true');

      expect(lightOptionButton).to.have.attribute('tabindex', '-1');
      expect(systemOptionButton).to.have.attribute('tabindex', '-1');
      expect(darkOptionButton).to.have.attribute('tabindex', '0');

      expect(document.documentElement).to.have.attribute('data-theme', 'dark');
      expect(el.shadowRoot.activeElement).to.equal(darkOptionButton);
    });

    it('moves to the previous option with ArrowLeft', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton, darkOptionButton } = getOptions(el);

      expect(systemOptionButton).to.have.attribute('aria-checked', 'true');

      systemOptionButton.focus();
      pressKey(systemOptionButton, 'ArrowLeft');

      expect(lightOptionButton).to.have.attribute('aria-checked', 'true');
      expect(systemOptionButton).to.have.attribute('aria-checked', 'false');
      expect(darkOptionButton).to.have.attribute('aria-checked', 'false');

      expect(document.documentElement).to.have.attribute('data-theme', 'light');
      expect(el.shadowRoot.activeElement).to.equal(lightOptionButton);
    });

    it('moves to the next option with ArrowDown', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { systemOptionButton, darkOptionButton } = getOptions(el);

      systemOptionButton.focus();
      pressKey(systemOptionButton, 'ArrowDown');

      expect(darkOptionButton).to.have.attribute('aria-checked', 'true');
      expect(document.documentElement).to.have.attribute('data-theme', 'dark');
      expect(el.shadowRoot.activeElement).to.equal(darkOptionButton);
    });

    it('moves to the previous option with ArrowUp', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, systemOptionButton } = getOptions(el);

      systemOptionButton.focus();
      pressKey(systemOptionButton, 'ArrowUp');

      expect(lightOptionButton).to.have.attribute('aria-checked', 'true');
      expect(document.documentElement).to.have.attribute('data-theme', 'light');
      expect(el.shadowRoot.activeElement).to.equal(lightOptionButton);
    });

    it('wraps from the last option to the first option', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, darkOptionButton } = getOptions(el);

      darkOptionButton.click();
      expect(darkOptionButton).to.have.attribute('aria-checked', 'true');

      darkOptionButton.focus();
      pressKey(darkOptionButton, 'ArrowRight');

      expect(lightOptionButton).to.have.attribute('aria-checked', 'true');
      expect(document.documentElement).to.have.attribute('data-theme', 'light');
      expect(el.shadowRoot.activeElement).to.equal(lightOptionButton);
    });

    it('wraps from the first option to the last option', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, darkOptionButton } = getOptions(el);

      lightOptionButton.click();
      expect(lightOptionButton).to.have.attribute('aria-checked', 'true');

      lightOptionButton.focus();
      pressKey(lightOptionButton, 'ArrowLeft');

      expect(darkOptionButton).to.have.attribute('aria-checked', 'true');
      expect(document.documentElement).to.have.attribute('data-theme', 'dark');
      expect(el.shadowRoot.activeElement).to.equal(darkOptionButton);
    });

    it('moves to the first option with Home', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { lightOptionButton, darkOptionButton } = getOptions(el);

      darkOptionButton.click();
      darkOptionButton.focus();

      pressKey(darkOptionButton, 'Home');

      expect(lightOptionButton).to.have.attribute('aria-checked', 'true');
      expect(document.documentElement).to.have.attribute('data-theme', 'light');
      expect(el.shadowRoot.activeElement).to.equal(lightOptionButton);
    });

    it('moves to the last option with End', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const { systemOptionButton, darkOptionButton } = getOptions(el);

      systemOptionButton.focus();

      pressKey(systemOptionButton, 'End');

      expect(darkOptionButton).to.have.attribute('aria-checked', 'true');
      expect(document.documentElement).to.have.attribute('data-theme', 'dark');
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

      expect(lightOptionButton).to.have.attribute('aria-checked', 'false');
      expect(systemOptionButton).to.have.attribute('aria-checked', 'true');
      expect(darkOptionButton).to.have.attribute('aria-checked', 'false');

      expect(document.documentElement).to.have.attribute('data-theme', 'system');
      expect(el.shadowRoot.activeElement).to.equal(systemOptionButton);

      sinon.assert.notCalled(themeChangeSpy);
    });
  });
});
