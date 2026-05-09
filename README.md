[![npm version](https://img.shields.io/npm/v/@georapbox/foo-bar.svg)](https://www.npmjs.com/package/@georapbox/foo-bar)
[![npm license](https://img.shields.io/npm/l/@georapbox/foo-bar.svg)](https://www.npmjs.com/package/@georapbox/foo-bar)

[demo]: https://georapbox.github.io/foo-bar/
[license]: https://github.com/georapbox/foo-bar/blob/main/LICENSE
[changelog]: https://github.com/georapbox/foo-bar/blob/main/CHANGELOG.md

# &lt;foo-bar&gt;

foo-bar description goes here.

[API documentation](#api) &bull; [Demo][demo]

## Usage

### Installation

```sh
npm install --save @georapbox/foo-bar
```

### Importing the component

By default, the package exports the element class without registering it.
This lets the application decide when the custom element is defined.

#### Manual definition

```js
import { FooBar } from '@georapbox/foo-bar';

// Define using the default tag name
FooBar.define();
```

#### Auto-defined (convenience)

If you don't need control over registration, you can import the pre-defined build which immediately registers `<foo-bar>`.

```js
import '@georapbox/foo-bar/define';
```

### Markup

```html
<foo-bar></foo-bar>
```

### Style

By default, the component comes with basic styling. However, you can customise the styles of the various elements of the component using either [CSS Parts](#css-parts) or [CSS Custom Properties](#css-custom-properties).

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |

### Slots

| Name | Description |
| ---- | ----------- |

### CSS Parts

| Name | Description |
| ---- | ----------- |

### CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `define` | Static | Defines the custom element by registering it with the browser's CustomElementRegistry if it hasn't been defined already. | `tagName='foo-bar'` |

<sup>1</sup> Instance methods are only available after the component has been defined. To ensure the component is defined, you can use `whenDefined` method of the `CustomElementRegistry` interface, eg `customElements.whenDefined('foo-bar').then(() => { /* call methods here */ });`

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |

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
