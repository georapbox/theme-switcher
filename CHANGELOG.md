# Changelog

## v1.0.0 (2026-08-11)

### Added

- Initial release of the `<theme-switcher>` custom element.
- Light, dark, and system theme options.
- Accessible radiogroup semantics and keyboard navigation.
- Theme persistence using local storage.
- Support for custom storage keys and disabling theme persistence.
- Synchronization between multiple `<theme-switcher>` instances.
- A `theme-change` event containing the selected theme.
- Configurable accessible labels for each theme option.
- Slots for replacing the light, system, and dark theme icons.
- CSS custom properties and CSS parts for styling the component.
- Reflection of the selected theme through the `data-theme` attribute on the document root.
- A static `ThemeSwitcher.define()` method for registering the element with the default or a custom tag name.
