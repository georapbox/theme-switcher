import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { ThemeSwitcher } from '../src/theme-switcher.js';

describe('theme-switcher upgrading', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('default properties', async () => {
    const el = await fixture(html`<theme-switcher></theme-switcher>`);

    // Update properties before upgrading
    el.noStorage = true;
    el.storageKey = 'STORAGE_KEY';

    // Upgrade custom element
    ThemeSwitcher.define();

    await elementUpdated(el);

    expect(el.hasAttribute('no-storage')).to.be.true;
    expect(el.getAttribute('storage-key')).to.equal('STORAGE_KEY');
  });
});
