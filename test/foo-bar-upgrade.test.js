import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { FooBar } from '../src/foo-bar.js';

describe('foo-bar upgrading', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('default properties', async () => {
    const el = await fixture(html`<foo-bar></foo-bar>`);

    // Update properties before upgrading
    el.exampleProp = 'test';

    // Upgrade custom element
    FooBar.define();

    await elementUpdated(el);

    expect(el.getAttribute('example-prop')).to.equal('test');
  });
});
