[![npm version](https://img.shields.io/npm/v/@georapbox/theme-switcher.svg)](https://www.npmjs.com/package/@georapbox/theme-switcher)
[![npm license](https://img.shields.io/npm/l/@georapbox/theme-switcher.svg)](https://www.npmjs.com/package/@georapbox/theme-switcher)

[demo]: https://georapbox.github.io/theme-switcher/
[license]: https://github.com/georapbox/theme-switcher/blob/main/LICENSE
[changelog]: https://github.com/georapbox/theme-switcher/blob/main/CHANGELOG.md

# &lt;theme-switcher&gt;

A custom element that allows you to switch between light, dark, and system theme.

[API documentation](#api) &bull; [Demo][demo]

## Usage

### Installation

```sh
npm install --save @georapbox/theme-switcher
```

### Importing the component

By default, the package exports the element class without registering it.
This lets the application decide when the custom element is defined.

#### Manual definition

```js
import { ThemeSwitcher } from '@georapbox/theme-switcher';

// Define using the default tag name
ThemeSwitcher.define();
```

#### Auto-defined (convenience)

If you don't need control over registration, you can import the pre-defined build which immediately registers `<theme-switcher>`.

```js
import '@georapbox/theme-switcher/define';
```

### Using the component in your HTML

To use the component, simply add the `<theme-switcher>` tag to your HTML:

```html
<theme-switcher></theme-switcher>
```

### How it works

By default, `<theme-switcher>` uses the `system` theme. This allows the page to follow the user's system color preference when your CSS uses `color-scheme`, `light-dark()`, or `prefers-color-scheme`.

When the user selects a theme, the component sets a `data-theme` attribute on the root element of the document:

```html
<html data-theme="light">
<html data-theme="dark">
<html data-theme="system">
```

The selected theme is saved in `localStorage` by default, using the configured `storageKey`. On future page loads, the saved theme is restored automatically.

If `no-storage` is enabled, the selected theme is not persisted and the component falls back to system on the next page load.

```html
<theme-switcher no-storage></theme-switcher>
```

You can use the `data-theme` attribute to control the page color scheme and then use the CSS `light-dark()` color function for theme-aware styles:

```css
:root {
  --page-background-color: light-dark(#ffffff, #111111);
  --page-text-color: light-dark(#111111, #ffffff);

  color-scheme: light dark;
  background-color: var(--page-background-color);
  color: var(--page-text-color);
}

:root[data-theme='light'] {
  color-scheme: light;
}

:root[data-theme='dark'] {
  color-scheme: dark;
}

:root[data-theme='system'] {
  color-scheme: light dark;
}

theme-switcher {
  --theme-switcher-background-color: light-dark(#ffffff, #1f1f1f);
  --theme-switcher-border-color: light-dark(#d4d4d4, #525252);
  --theme-switcher-option-color: light-dark(#404040, #d4d4d4);
  --theme-switcher-option-active-color: light-dark(#ffffff, #111111);
  --theme-switcher-option-active-background-color: light-dark(#111111, #ffffff);
}
```

### Style

By default, the component comes with basic styling. However, you can customise the styles of the various elements of the component using either [CSS Parts](#css-parts) or [CSS Custom Properties](#css-custom-properties).

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `noStorage`<br>*`no-storage`* | ✓ | `boolean` | - | `false` | Whether to disable persistence of the selected theme in local storage. |
| `storageKey`<br>*`storage-key`* | ✓ | `string` | - | `'theme-switcher/theme-preference'` | The local storage key used to persist the selected theme. |

### Slots

| Name | Description |
| ---- | ----------- |
| `theme-option-light-icon` | Custom icon/content for the light theme option. |
| `theme-option-system-icon` | Custom icon/content for the system theme option. |
| `theme-option-dark-icon` | Custom icon/content for the dark theme option. |

### CSS Parts

| Name | Description |
| ---- | ----------- |
| `base` | The root wrapper element of the theme switcher. |
| `theme-option` | A theme option button. |
| `theme-option--light` | The button for selecting the light theme. |
| `theme-option--system` | The button for selecting the system theme. |
| `theme-option--dark` | The button for selecting the dark theme. |

### CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |
| `--theme-switcher-background-color` | The background color of the theme switcher. | `transparent` |
| `--theme-switcher-border-color` | The border color of the theme switcher. | `canvastext` |
| `--theme-switcher-padding` | The padding around the theme switcher content. | `0.1875rem` |
| `--theme-switcher-option-color` | The text/icon color of each theme option button. | `canvastext` |
| `--theme-switcher-option-active-color` | The text/icon color of the selected theme option button. | `canvas` |
| `--theme-switcher-option-active-background-color` | The background color of the selected theme option button. | `canvastext` |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `define` | Static | Defines the custom element by registering it with the browser's CustomElementRegistry if it hasn't been defined already. | `tagName='theme-switcher'` |

<sup>1</sup> Instance methods are only available after the component has been defined. To ensure the component is defined, you can use `whenDefined` method of the `CustomElementRegistry` interface, eg `customElements.whenDefined('theme-switcher').then(() => { /* call methods here */ });`

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `theme-change` | Dispatched when the theme is changed by user interaction. The event detail contains the new theme value. | `{theme: 'light' \| 'dark' \| 'system'}` |

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Development setup

### Prerequisites

The project requires `Node.js` and `npm` to be installed on your environment. Preferrably, use [nvm](https://github.com/nvm-sh/nvm) Node Version Manager and use the version of Node.js specified in the `.nvmrc` file by running `nvm use`.

### Install dependencies

Install the project dependencies by running the following command.

```sh
npm install
```

### Build for development

Watch for changes and start a development server by running the following command.

```sh
npm start
```

### Linting

Lint the code by running the following command.

```sh
npm run lint
```

### Testing

Run the tests by running any of the following commands.

```sh
npm test
npm run test:watch # watch mode
```

### Build for production

Create a production build by running the following command.

```sh
npm run build
```

## License

[The MIT License (MIT)][license]
