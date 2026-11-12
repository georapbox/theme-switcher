[![npm version](https://img.shields.io/npm/v/@georapbox/theme-switcher.svg)](https://www.npmjs.com/package/@georapbox/theme-switcher)
[![npm license](https://img.shields.io/npm/l/@georapbox/theme-switcher.svg)](https://www.npmjs.com/package/@georapbox/theme-switcher)

[demo]: https://georapbox.github.io/theme-switcher/
[license]: https://github.com/georapbox/theme-switcher/blob/main/LICENSE
[changelog]: https://github.com/georapbox/theme-switcher/blob/main/CHANGELOG.md

# &lt;theme-switcher&gt;

A custom element for switching between light, dark, and system color themes.

[API documentation](#api) &bull; [Demo][demo]

## Installation

```sh
npm install --save @georapbox/theme-switcher
```

## Registration

By default, the package exports the element class without registering it.
This lets the application decide when the custom element is defined.

### Manual registration

Import the `ThemeSwitcher` class and call its static `define()` method:

```js
import { ThemeSwitcher } from '@georapbox/theme-switcher';

ThemeSwitcher.define();
```

### Automatic registration

If you don't need control over registration, import the convenience entry point:

```js
import '@georapbox/theme-switcher/define';
```

## Usage

Once registered, use the custom element in your HTML:

```html
<theme-switcher></theme-switcher>
```

## Styling

By default, the component comes with basic styling. However, you can customise the styles of the various elements of the component using either [CSS parts](#css-parts) or [CSS custom properties](#css-custom-properties).

## How it works

By default, `<theme-switcher>` uses the `system` theme. This allows the page to follow the user's system color preference when your CSS uses `color-scheme`, `light-dark()`, or `prefers-color-scheme`.

When the user selects a theme, the component sets a `data-theme` attribute on the root element of the document:

```html
<html data-theme="light">
<html data-theme="system">
<html data-theme="dark">
```

The selected theme is saved in `localStorage` by default, using the configured `storageKey`. On future page loads, the saved theme is restored automatically.

If `no-storage` is enabled, the selected theme is not persisted and the component falls back to system on the next page load.

```html
<theme-switcher no-storage></theme-switcher>
```

Multiple `<theme-switcher>` instances in the same document are automatically kept in sync when the theme changes.

You can use the `data-theme` attribute to control the page color scheme and then use the CSS `light-dark()` color function for theme-aware styles:

```css
:root {
  color-scheme: light dark;
  
  --page-background-color: light-dark(#ffffff, #111111);
  --page-text-color: light-dark(#111111, #ffffff);
  
  background-color: var(--page-background-color);
  color: var(--page-text-color);
}

:root[data-theme='light'] {
  color-scheme: light;
}

:root[data-theme='dark'] {
  color-scheme: dark;
}

theme-switcher {
  --theme-switcher-background-color: light-dark(#ffffff, #1f1f1f);
  --theme-switcher-border-color: light-dark(#d4d4d4, #525252);
  --theme-switcher-option-color: light-dark(#404040, #d4d4d4);
  --theme-switcher-option-selected-color: light-dark(#ffffff, #111111);
  --theme-switcher-option-selected-background-color: light-dark(#111111, #ffffff);
}
```

## API

### Properties and attributes

| Property / Attribute | Type | Default | Description |
| -------------------- | ---- | ------- | ----------- |
| `noStorage` / `no-storage` | `boolean` | `false` | Disables persistence of the selected theme in local storage. |
| `storageKey` / `storage-key` | `string` | `'theme-switcher/theme-preference'` | The local storage key used to persist the selected theme. |
| `lightLabel` / `light-label` | `string` | `'Switch to light theme'` | The accessible label for the light theme option button. |
| `systemLabel` / `system-label` | `string` | `'Switch to system theme'` | The accessible label for the system theme option button. |
| `darkLabel` / `dark-label` | `string` | `'Switch to dark theme'` | The accessible label for the dark theme option button. |
| `disabled` | `boolean` | `false` | Disables the theme switcher. |

All properties are reflected through their corresponding HTML attributes. When only one name is listed, the property and attribute share the same name.

### Slots

| Name | Description |
| ---- | ----------- |
| `light-icon` | Custom icon for the light theme option. |
| `system-icon` | Custom icon for the system theme option. |
| `dark-icon` | Custom icon for the dark theme option. |

### CSS parts

| Name | Description |
| ---- | ----------- |
| `base` | The base element of the component. |
| `theme-option` | The theme option button. |
| `theme-option--light` | The button for selecting the light theme. |
| `theme-option--system` | The button for selecting the system theme. |
| `theme-option--dark` | The button for selecting the dark theme. |
| `theme-option--selected` | The button for the currently selected theme. |
| `theme-option-icon` | The icon inside a theme option button. |
| `theme-option-icon--light` | The icon inside the light theme option button. |
| `theme-option-icon--system` | The icon inside the system theme option button. |
| `theme-option-icon--dark` | The icon inside the dark theme option button. |

### CSS custom properties

| Name | Description | Default |
| ---- | ----------- | ------- |
| `--theme-switcher-padding` | The padding around the theme switcher content. | `0.1875rem` |
| `--theme-switcher-gap` | The space between theme option buttons. | `0` |
| `--theme-switcher-background-color` | The background color of the theme switcher. | `transparent` |
| `--theme-switcher-border-width` | The border width of the theme switcher. | `1px` |
| `--theme-switcher-border-color` | The border color of the theme switcher. | `#222222`, or `light-dark(#222222, #eeeeee)` when supported |
| `--theme-switcher-border-radius` | The border radius of the theme switcher. | `9999px` |
| `--theme-switcher-option-size` | The width and height of each theme option button. | `2rem` |
| `--theme-switcher-option-font-size` | The font size of each theme option button, which can be used to scale the default SVG icons. | `calc(var(--theme-switcher-option-size) * 0.5)` |
| `--theme-switcher-option-color` | The color of each theme option button. | `#222222`, or `light-dark(#222222, #eeeeee)` when supported |
| `--theme-switcher-option-background-color` | The background color of each theme option button. | `transparent` |
| `--theme-switcher-option-selected-color` | The color of the selected theme option button. | `#eeeeee`, or `light-dark(#eeeeee, #222222)` when supported |
| `--theme-switcher-option-selected-background-color` | The background color of the selected theme option button. | `#222222`, or `light-dark(#222222, #eeeeee)` when supported |
| `--theme-switcher-option-border-width` | The border width of each theme option button. | `0` |
| `--theme-switcher-option-border-color` | The border color of each theme option button. | `transparent` |
| `--theme-switcher-option-border-radius` | The border radius of each theme option button. | `50%` |
| `--theme-switcher-option-focus-ring-width` | The width of the focus ring. | `2px` |
| `--theme-switcher-option-focus-ring-color` | The color of the focus ring. | `#2563eb`, or `light-dark(#2563eb, #60a5fa)` when supported |
| `--theme-switcher-option-focus-ring-offset` | The offset of the focus ring from the theme option button. | `2px` |

> [!NOTE]
> Color defaults use static fallback values first and are enhanced with `light-dark()` in browsers that support it.

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `define` | Static | Defines the custom element by registering it with the browser's CustomElementRegistry if it hasn't been defined already. | `tagName='theme-switcher'` |

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

### Git hooks

This repository includes a pre-commit hook that runs linting and formatting checks before each commit.

To enable the hook, run the following command from the repository root:

```sh
git config --local core.hooksPath .githooks
```

This configuration only needs to be applied once per clone and does not affect other repositories.

To disable the hook, run:

```sh
git config --local --unset core.hooksPath
```

## License

[The MIT License (MIT)][license]
