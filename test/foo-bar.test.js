import { expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import sinon from 'sinon';
import { FooBar } from '../src/foo-bar.js';

FooBar.define();

describe('foo-bar', () => {
  afterEach(() => {
    fixtureCleanup();
    sinon.restore();
  });

  describe('definition', () => {
    it('does not redefine the custom element when it is already registered', () => {
      const defineSpy = sinon.spy(window.customElements, 'define');
      expect(() => FooBar.define()).to.not.throw();
      sinon.assert.notCalled(defineSpy);
    });
  });

  describe('accessibility', () => {
    it('passes accessibility test when enabled without attributes', async () => {
      const el = await fixture(html`<foo-bar></foo-bar>`);
      await expect(el).to.be.accessible();
    });
  });

  describe('properties - attributes', () => {
    // exampleProp
    it('reflects property "exampleProp" to attribute "example-prop"', async () => {
      const el = await fixture(html`<foo-bar></foo-bar>`);
      el.exampleProp = 'test';
      expect(el.getAttribute('example-prop')).to.equal('test');
    });

    it('reflects attribute "example-prop" to property "exampleProp"', async () => {
      const el = await fixture(html`<foo-bar example-prop="test"></foo-bar>`);
      expect(el.exampleProp).to.equal('test');
    });
  });
});
