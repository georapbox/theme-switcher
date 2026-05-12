import { expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import sinon from 'sinon';
import { ThemeSwitcher } from '../src/theme-switcher.js';

ThemeSwitcher.define();

describe('theme-switcher', () => {
  afterEach(() => {
    fixtureCleanup();
    sinon.restore();
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  describe('definition', () => {
    it('does not redefine the custom element when it is already registered', () => {
      const defineSpy = sinon.spy(window.customElements, 'define');
      expect(() => ThemeSwitcher.define()).to.not.throw();
      sinon.assert.notCalled(defineSpy);
    });
  });

  describe('accessibility', () => {
    it('passes accessibility test when enabled without attributes', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      await expect(el).to.be.accessible();
    });
  });

  describe('properties - attributes', () => {
    // no-storage
    it('reflects attribute "no-storage" to property "noStorage"', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      expect(el.noStorage).to.be.true;
    });

    it('reflects property "noStorage" to attribute "no-storage"', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      el.noStorage = true;
      expect(el.hasAttribute('no-storage')).to.be.true;
      el.noStorage = false;
      expect(el.hasAttribute('no-storage')).to.be.false;
    });

    // storage-key
    it('reflects attribute "storage-key" to property "storageKey"', async () => {
      const el = await fixture(html`<theme-switcher storage-key="STORAGE_KEY"></theme-switcher>`);
      expect(el.storageKey).to.equal('STORAGE_KEY');
    });

    it('reflects property "storageKey" to attribute "storage-key"', async () => {
      const el = await fixture(html`<theme-switcher></theme-switcher>`);
      el.storageKey = 'STORAGE_KEY';
      expect(el).to.have.attribute('storage-key', 'STORAGE_KEY');
    });
  });

  describe('theme switching', () => {
    it('adds "data-theme" attribute to root element of document', async () => {
      await fixture(html`<theme-switcher no-storager></theme-switcher>`);
      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');
    });

    it('"data-theme" attribute on root element changes when clicking switches', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);
      const lightSwitch = el.shadowRoot.querySelector('[data-theme="light"]');
      const systemSwitch = el.shadowRoot.querySelector('[data-theme="system"]');
      const darkSwitch = el.shadowRoot.querySelector('[data-theme="dark"]');

      expect(document.documentElement).to.have.attribute('data-theme', 'system');
      lightSwitch.click();
      expect(document.documentElement).to.have.attribute('data-theme', 'light');
      systemSwitch.click();
      expect(document.documentElement).to.have.attribute('data-theme', 'system');
      darkSwitch.click();
      expect(document.documentElement).to.have.attribute('data-theme', 'dark');
    });

    it('changes selected switch when clicking switches', async () => {
      const el = await fixture(html`<theme-switcher no-storage></theme-switcher>`);

      const lightSwitch = el.shadowRoot.querySelector('[data-theme="light"]');
      const systemSwitch = el.shadowRoot.querySelector('[data-theme="system"]');
      const darkSwitch = el.shadowRoot.querySelector('[data-theme="dark"]');

      expect(systemSwitch.getAttribute('aria-checked')).to.equal('true');
      lightSwitch.click();
      expect(lightSwitch.getAttribute('aria-checked')).to.equal('true');
      expect(systemSwitch.getAttribute('aria-checked')).to.equal('false');
      expect(darkSwitch.getAttribute('aria-checked')).to.equal('false');
      systemSwitch.click();
      expect(lightSwitch.getAttribute('aria-checked')).to.equal('false');
      expect(systemSwitch.getAttribute('aria-checked')).to.equal('true');
      expect(darkSwitch.getAttribute('aria-checked')).to.equal('false');
      darkSwitch.click();
      expect(lightSwitch.getAttribute('aria-checked')).to.equal('false');
      expect(systemSwitch.getAttribute('aria-checked')).to.equal('false');
      expect(darkSwitch.getAttribute('aria-checked')).to.equal('true');
    });
  });
});
