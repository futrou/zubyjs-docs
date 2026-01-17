---
title: Configuration API
description: Learn how to configure your Zuby.js app
---

The `zuby.config.mjs` config file is a file that contains all the configuration options for your Zuby.js app.
The typescript projects use `zuby.config.ts` instead.

A valid config file exports its configuration using the default export
and `defineConfig` function that provides type checking and autocompletion for the config file.

Here's the example of a simple config file for a Zuby.js app with Preact.
See the [config options](/reference/configuration#config-options) section for more details.

```js title="zuby.config.mjs"
import { defineConfig } from 'zuby';
import preact from '@zubyjs/preact';

export default defineConfig({
    outDir: 'build',
    jsx: preact(),
});

```

## Custom config file name
You can use a custom config file name by passing the `--config-file` option to the CLI:
```bash
npx zuby build --config-file my-config.mjs
```

## ZubyConfig API
The section describes all available configuration options for Zuby.js
on `ZubyConfig` type.

### `jsx`
This option is set to JSX provider which will be used to render the pages.
- Type: `JsxProvider` - See the [JsxProvider API](/reference/jsx-provider) for more details.
- Example: `preact()`, `react()`
- Required: `true`

### `srcDir` 
This option defines the path to directory where your zuby project is located in.
- Type: `string`
- Default: `./`

### `outDir`
This option defines the directory where the build output will be placed relative to project root.
- Type: `string`
- Default: `.zuby`

### `publicDir`
This option defines the relative path to the folder with the static files. These files are copied to the output directory.
- Type: `string`
- Default: `public/`

### `cacheDir`
This option defines the relative path to directory where the cache will be stored.
- Type: `string`
- Default: `.zuby-cache`

### `output`
The build mode. This config option allows you to change whether the pages should be pre-rerendered by default or not.
Possible values are 'static' or 'server'.

- 'static' - Opt-out mode - When set to 'static', all pages with static paths will be pre-rendered to HTML files by default unless the page exports the `prerender` property with false value.
- 'server' - Opt-in mode - When set to 'server', the pages will be pre-rendered to HTML files
only when the page exports the `prerender` property with true value.
- Type: `'static' | 'server'`
- Default: `static`

### `prerenderPaths`
List of additional paths to pre-render during the build. The static paths are pre-rendered automatically in `static` build mode and don't need to be specified here.
- Type: `string[]`
- Default: `[]`
- Example: `['/about', '/contact', '/products/123']`

### `site`
The URL of the site.
- Type: `string`
- Default: `undefined`
- Example: `https://example.com`

### `i18n`
The internalization config. If this is set, the site will be generated in multiple locales.
- Type: `{ locales: string[]; defaultLocale: string; }`
- Default: `undefined`

### `minifyHTML`
Set this option to false to disable the minification of pre-rendered HTML.
- Type: `boolean`
- Default: `true`

### `minifyCSS`
Set this option to false to disable the minification of CSS.
- Type: `boolean`
- Default: `true`

### `minifyJS`
Set this option to false to disable the minification of JS.
- Type: `boolean`
- Default: `true`

### `plugins`
The list of plugins that use either the Zuby plugin API or Vite plugin API.
See the [ZubyPlugin](/reference/zuby-plugin) or [Vite Plugin API](https://vitejs.dev/guide/api-plugin) section for more details.
- Type: `(ZubyPlugin | VitePluginOption)[];`
- Default: `[]`

### `server`
Server options for both the dev and production server. It has two properties:
- `host`: The host to listen on. Set this option to '0.0.0.0' to listen on all interfaces. This config option can be overwritten by the `--host` CLI argument.
  - Type: `string`
  - Default: `127.0.0.1`
- `port`: The port to listen on. This config option can be overwritten by the `--port` CLI argument. NOTE: Keep in mind that ports below 1024 are usually reserved for root users.
  - Type: `number`
  - Default: `3000`

### `logLevel`
The log level for both Zuby and all plugins.
- Type: `'error' | 'warn' | 'info' | 'silent'`
- Default: `info`

### `customLogger`
The custom logger for both Zuby, Vite and all plugins.
- Type: `ZubyLogger`
- Default: `ZubyLogger`

### `generateBuildId`
The custom build ID generator. This function is called during the build process.
If you're building in multiple environments, you can use this option to generate consistent build IDs.
- Type: `() => string | Promise<string>`
- Default: `generateDefaultBuildId`

### `image`
The image component options:
- `loader`: The path to image loader to use. The image loader function that generates the URL for the `<Image>` component.
  - Type: `string`
  - Default: `zuby/image/imageLoader.js`
- `sizes`: The array of image sizes that will be used to generate image src. Zuby.js will try to use the nearest size to the actual specified size.
  - Type: `number[]`
  - Default: `[160, 320, 640, 768, 1024, 1280, 1536, 1920, 2048]`
- `defaultFormat`: The default format of the image, that will be passed to the image loader function if the format is not specified.
  - Type: `'webp' | 'jpg' | 'jpeg' | 'png' | 'avif' | 'gif'`
  - Default: `'webp'`
- `defaultQuality`: The default quality of the image, that will be passed to the image loader function if the quality is not specified.
  - Type: `number`
  - Default: `80`
- `maxWidth`: The maximum allowed width of the optimized image. The runtime optimizer will refuse to return images larger than this size.
  - Type: `number`
  - Default: `4096`
- `maxHeight`: The maximum allowed height of the optimized image. The runtime optimizer will refuse to return images larger than this size.
  - Type: `number`
  - Default: `4096`

### `props`
The global props for the site that will be passed to all pages, handlers etc... on both client and server side.
They can be retrieved using `PageContext.globalProps` method.
- Type: `Record<string, any>`
- Default: `{}`

### `serverProps`
The global server props for the site that will be passed to all pages, handlers etc... only on server side.
They can be retrieved using `PageContext.globalServerProps` method.
- Type: `Record<string, any>`
- Default: `{}`

### `vite`
The additional vite config, which will be merged with the default config. \
See the [Vite config docs](https://vitejs.dev/config/) and [build options](https://vitejs.dev/config/build-options.html) for all available options.
- Type: `ViteUserConfig`
- Default: `{}`