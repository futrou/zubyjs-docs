---
title: Global context
description: Learn how to use the global context in your Zuby.js app
---

The global context is a special object that is generated during the build
and is immutable. Each parts of Zuby.js core can hold its own copy of Global Context. It's available in both browser and server
to all parts of the application.

It's mostly used by the plugins and the core of Zuby.js.
For your app, pages, handler etc..., you should use the `PageContext` instead
that provides all Global Context properties and more.

The `GlobalContext` can be accessed via
the `PageContext/HandlerContext` 
or by calling the `getGlobalContext` function anywhere in your code
on the server or in the browser.


Example:
```ts title="src/imageLoader.ts"
import { getGlobalContext } from "zuby/context";
import type { ImageLoaderOptions } from "zuby/types.js";

export default function imageLoader(options: ImageLoaderOptions) {
  const globalContext = getGlobalContext();
  // etc...
}
```

## GlobalContext API
The section describes all available options and helper methods on GlobalContext type.

## `templates`
The array with templates.
- Type: `object`
    - `pages`: `LazyTemplate[]`
    - `apps`: `LazyTemplate[]`
    - `errors`: `LazyTemplate[]`
    - `layouts`: `LazyTemplate[]`
    - `innerLayouts`: `LazyTemplate[]`
    - `handlers`: `LazyTemplate[]`
    - `loaders`: `LazyTemplate[]`

## `render`
The render module from `JsxProvider`.
- Type: `object`
    - `renderToString`: `RenderToString`
    - `renderToStream`: `RenderToStream`

## `site`
The URL of the site.
- Type: `string`
- Example: `https://example.com`

## `generator`
The name of the generator together with its version number.
- Type: `string`
- Example: `Zuby.js 1.0.0`

## `version`
The version of used Zuby.js.
- Type: `string`
- Example: `1.0.0`

## `buildId`
The build ID of the site.
- Type: `string`

## `i18n`
The internalization config from `ZubyConfig`.
- Type: `object`
    - `locales`: `string[]`
    - `defaultLocale`: `string`
- Example: `{ locales: ['en', 'de', 'cs', 'pl'], defaultLocale: 'en' }`

## `props`
The global props for the site that will be passed to all pages on both client and server side.
- Type: `Record<string, any>`

## `image`
The configuration for the image component. 
The default image component loader from Zuby.js adds build ID to the image URLs but doesn't optimize them.
For optimization, resizing and other advanced features, install the optional `@zubyjs/image` plugin that automatically replaces default image loader.
The image component options:
- `loader`: The image loader function that generates the URL for the `<Image>` component.
    - Type: `ImageLoader`
    - Default: `zuby/image/imageLoader.js`
- `sizes`: The array of image sizes that will be used to generate image src.
    - Type: `number[]`
    - Default: `[160, 320, 640, 768, 1024, 1280, 1536, 1920, 2048]`
- `defaultFormat`: The default format of the image.
    - Type: `'webp' | 'jpg' | 'jpeg' | 'png' | 'avif' | 'gif'`
    - Default: `'webp'`
- `defaultQuality`: The default quality of the image.
    - Type: `number`
    - Default: `80`
- `maxWidth`: The maximum allowed width of the optimized image as specified in `zuby.config.js` file.
  - Type: `number`
  - Default: `4096`
- `maxHeight`: The maximum allowed height of the optimized image as specified in `zuby.config.js` file.
  - Type: `number`
  - Default: `4096`

## `serverProps`
The global server props for the site that will be passed to all pages only on server side.
- Type: `Record<string, any>`

## `headElements`
Additional elements that should be added to the head of the page.
- Type: `string[]`

## `bodyElements`
Additional elements that should be added to the body of the page.
- Type: `string[]`