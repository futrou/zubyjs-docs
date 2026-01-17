---
title: JSX provider API
description: Learn how to configure the JSX provider
---

The Jsx Provider is special object that provides integration with JSX libraries and instructs Zuby.js how to render the components.
It also contains default templates such as `layout.jsx`, `error.jsx`, `app.jsx` etc...

JsxProvider is configured under `jsx` option of the [ZubyConfig](/reference/configuration#jsx) in `zuby.config.mjs` file.

## JsxProvider API
The section describes all properties of `JsxProvider` type.

### `name`
The name of the Jsx Provider.
- Type: `string`
- Required: `true`

### `getPlugins()`
A method that returns an array of Vite plugin options.
- Type: `() => VitePluginOption[] | VitePluginOption[][]`
- Required: `true`

### `renderFile`
The file used for rendering.
- Type: `string`
- Required: `true`

### `appTemplateFile`
The default `app.jsx` template file.
- Type: `string`
- Required: `true`

### `entryTemplateFile`
The entry template file.
- Type: `string`
- Required: `true`

### `layoutTemplateFile`
The default `layout.jsx` template file.
- Type: `string`
- Required: `true`

### `innerLayoutTemplateFile`
The inner layout template file.
- Type: `string`
- Required: `true`

### `errorTemplateFile`
The default `error.jsx` template file.
- Type: `string`
- Required: `true`
