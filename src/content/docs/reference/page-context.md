---
title: Page context API
description: Learn how to use the page context in your Zuby.js app
---

The page context is a special object that is shared between the page and all handlers
on given path during runtime and allow to pass data between them.

:::note
Some properties of the page context are available only in browser or server environment.
The properties that are available only on server should be used only inside [Handlers](/guides/handlers),
unless you know what you are doing.
:::

The page context is passed as a first argument to the handlers:
```ts title="pages/products/[id].ts"
import type { PageContext } from "zuby";

export default function Handler(context: PageContext, _next: () => void) {
  context.props = {
    product: {
      title: 'Book',
      description: 'A book about books',
      price: 10.99,
    }
  }
}
```

And as a `context` prop to the page:
```tsx title="pages/products/[id].tsx"
import type { PageContext } from "zuby";

export interface Product {
  title: string;
  description: string;
  price: number;
}

export interface Props {
  product: Product;
  context: PageContext;
}

export default function Products({ context, product }: Props) {
  const { id } = context.params;
  const { title, description, price } = product;
  
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{price}</p>
    </div>
  );
}
```

## PageContext API
The section describes all available options and helper methods on `PageContext` type.

### `url`
The current URL of the page/handler with path, query etc... \
See [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) for more details.
- Type: `URL`
- Example: `new URL('https://example.com/products/1')`
- Availability: `Browser` and `Server`

### `title`
The current page title. 
This option can be set in the page or handler and will be used as the page title tag in default `layout.jsx` component.
- Type: `string`
- Example: `My home page`
- Availability: `Browser` and `Server`

### `request`
The incoming request. 
This property is only available in server-side and returns undefined in browser.
- Type: `Request`
- Availability: `Server`

### `params`
The parsed params from the current path.
- Type: `Record<string, string>`
- Example: `{ id: '1' }`
- Availability: `Browser` and `Server`

### `clientAddress`
The client IP address. This property is only available in server-side and returns undefined in browser.
- Type: `string`
- Example: `127.0.0.1`
- Availability: `Server`

### `isBrowserEnv`
Returns true if the current environment is browser.
- Type: `boolean`
- Availability: `Browser` and `Server`

### `site`
The value of `site` property from the ZubyConfig.
- Type: `string`
- Example: `https://example.com`
- Availability: `Browser` and `Server`

### `generator`
The generator name that can be used in the meta tag.
- Type: `string`
- Example: `Zuby.js v1.0.0`
- Availability: `Browser` and `Server`

### `version`
The used Zuby.js version.
- Type: `string`
- Example: `1.0.0`
- Availability: `Browser` and `Server`

### `buildId`
The build ID of the current build.
- Type: `string`
- Example: `ecdf1a94cc9b4f4c`
- Availability: `Browser` and `Server`

### `props`
The object with props that should be passed to the page component. 
The props are shared between page and handlers on given path. The props need to be serializable to JSON.
Keep in mind that props are available on both server and browser, so don't put any sensitive data here.
- Type: `Record<string, any>`
- Default: `{}`
- Example: `{ id: 'Home' }`
- Availability: `Browser` and `Server`

### `serverProps`
The object with server props that are available only in server-side
environment and are not shared with the client.
You can use this property to pass data from handler to layout template.
Hint: You should not read them in page because the hydration would fail,
but you can write them on page and read them in layout.
- Type: `Record<string, any>`
- Default: `{}`
- Example: `{ id: 'Home' }`
- Availability: `Server`

### `globalProps`
The object with global props that are available on all pages and handlers
in both client and server-side environment.
The global props are configured in the `zuby.config.mjs` file under the `props` property.
- Type: `Record<string, any>`
- Default: `{}`

### `globalServerProps`
The object with global server props that are available on all pages and handlers
only in server-side environment.
The global server props are configured in the `zuby.config.mjs` file under the `serverProps` property.
- Type: `Record<string, any>`
- Default: `{}`

### `statusCode`
The status code that will be returned to the client. 
Set this property to desired status code to change the default page status code.
This property has only effect in server-side.
- Type: `number`
- Default: `200`
- Example: `404`
- Availability: `Server`

### `headers`
The object with additional headers that will be returned with the response. These headers will be merged with the default headers and the page's or handler's response. This property has only effect in server-side.
- Type: `Headers`
- Default: `new Headers()`
- Example: `new Headers({ 'custom': 'header' })`
- Availability: `Server`

### `cache`
Set this property to the number of seconds page should be cached by the Zuby.js server. This allows you to implement pages revalidation and regenerate the page after certain time. This property has only effect in server-side.
- Type: `number`
- Default: `0`
- Example: `60`
- Availability: `Server`

### `locales`
Returns array of all locales configured under the `i18n` property in the ZubyConfig.
- Type: `string[]`
- Default: `[]`
- Example: `['en', 'de', 'cs', 'pl']`
- Availability: `Browser` and `Server`

### `defaultLocale`
The default locale configured under the 'i18n' property in the ZubyConfig. 
This property is undefined if the site is not internationalized.
- Type: `string`
- Default: `undefined`
- Example: `'en'`
- Availability: `Browser` and `Server`

### `locale`
The current active locale matched from the URL. 
This property is undefined if the site is not internationalized.
- Type: `string`
- Default: `undefined`
- Example: `'en'`
- Availability: `Browser` and `Server`

### `localizePath`
This function allows you to localize the path.
It accepts the path and optional locale as arguments and returns the localized path.
- Type: `(path: string, locale?: string) => string`
- Parameters: 
  - `path` (string) - The path to localize
  - `locale` (string) - The locale to use. If not specified, the current locale is used.
- Example: `localizePath('/products/1', 'pl') => /pl/products/1`
- Availability: `Browser` and `Server`

### `initialPath`
The initial path where the page was first loaded. All other paths are handled by the client-side navigation and the page act as an SPA.
- Type: `string`
- Example: `/products/1`
- Availability: `Browser` and `Server`

### `isInitialPath`
Returns true if the current path is the initial path where the page was first loaded.
- Type: `boolean`
- Example: `true`
- Availability: `Browser` and `Server`

### `templates`
The object with all parsed templates. The available templates differ in browser and server env.
- Type: `object`
- Availability: `Browser` and `Server`

### `isPrerendering`
Returns true if the current request was made by the Zuby.js pre-render build step.
- Type: `boolean`
- Availability: `Browser` and `Server`

### `addToHead`
The function that allows you to add a new element
or Jsx Component to the head of the document when it's rendered on the server.
- Type: `(element: string | Component, front: boolean = false) => void`
- Example: `addToHead('<link rel="stylesheet" href="/styles.css" />')`
- Availability: `Server`

### `addToBody`
The function that allows you to add a new element
or Jsx Component to the body of the page body when it's rendered on the server.
- Type: `(element: string | Component, front: boolean = false) => void`
- Example: `addToBody('<script src="/scripts.js"></script>')`
- Availability: `Server`

### `globalContext`
The reference to the immutable global context object that is shared between all pages and handlers.
See [GlobalContext API](/reference/global-context/) for more details.
- Type: `GlobalContext`