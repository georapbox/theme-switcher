import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { ThemeSwitcher } from '../src/theme-switcher.js';

describe('theme-switcher upgrading', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('default properties', async () => {
    const container = await fixture(html`<div></div>`);
    const el = document.createElement('theme-switcher');

    // Update properties before upgrading
    el.noStorage = true;
    el.storageKey = 'STORAGE_KEY';
    el.lightLabel = 'LIGHT_LABEL';
    el.systemLabel = 'SYSTEM_LABEL';
    el.darkLabel = 'DARK_LABEL';

    // Define and explicitly upgrade the custom element
    ThemeSwitcher.define();
    customElements.upgrade(el);

    // Connect the element so connectedCallback runs
    container.appendChild(el);

    await elementUpdated(el);

    expect(el.hasAttribute('no-storage')).to.be.true;
    expect(el.getAttribute('storage-key')).to.equal('STORAGE_KEY');
    expect(el.getAttribute('light-label')).to.equal('LIGHT_LABEL');
    expect(el.getAttribute('system-label')).to.equal('SYSTEM_LABEL');
    expect(el.getAttribute('dark-label')).to.equal('DARK_LABEL');
  });
});
