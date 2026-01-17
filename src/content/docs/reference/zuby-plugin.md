---
title: Zuby Plugin API
description: Learn how to create a custom Plugin for Zuby.js
---

The Zuby Plugin is an object that allows you to create a custom plugin for Zuby.js
and extend its functionality.

Here's an example of a plugin that adds a simple `robots.txt` file into the build output:
```ts title="zuby-robots-txt-plugin.ts"
import type { ZubyPlugin } from "zuby";
import { writeFile } from "fs/promises";
import { resolve } from "path";

export default function robotsTxtPlugin(): ZubyPlugin {
  return {
    name: 'zuby-robots-txt-plugin',
    description: 'generating robots.txt file...',
    buildStep: true,
    hooks: {
      'zuby:build:done': async ({ config }) => {
        const { outDir } = config;
        const content = `User-agent: *\nDisallow: /`;
        await writeFile(resolve(outDir, 'client', 'robots.txt'), content);
      }
    }
  }
}
```

Usage of the plugin:
```js title="zuby.config.mjs"
import { defineConfig } from 'zuby';
import preact from '@zubyjs/preact';
import robotsTxtPlugin from './zuby-robots-txt-plugin.ts';

export default defineConfig({
    outDir: 'build',
    jsx: preact(),
    plugins: [
        robotsTxtPlugin(),
    ],
});
```

:::note
Zuby.js follows Vite convention where every plugin should be a function that returns a `ZubyPlugin` object.
Every Vite's [`Plugin`](https://vitejs.dev/guide/api-plugin) is also compatible `ZubyPlugin`.
:::

## ZubyPlugin API
The section describes all properties of `ZubyPlugin` type.

### `name`
The name of the plugin.
- Type: `string`
- Example: `'zuby-plugin-sitemap'`
- Required: `true`

### `description`
The description of what the plugin does. 
This will be displayed in the CLI during the build/dev process.
- Type: `string`
- Example: `'pre-rendering pages...'`
- Required: `false`

### `buildStep`
Set this option to true to include the plugin as a build step 
that will be shown in the CLI during the build process.
- Type: `boolean`
- Example: `Step 4/4 pre-rendering pages...`
- Required: `false`

### `hooks`
The Zuby plugin API hooks. Hooks allow you to run custom code at specific points during the build/dev process and modify the internal Zuby config.
See the [ZubyPlugin Hooks API](#zubyplugin-hooks-api) for more details.
- Type: `object`
- Required: `false`
- Type: `object`

Example of a plugin that modifies the config and adds a new page:
```js
export default function myPlugin(): ZubyPlugin {
  return {
    name: 'my-zuby-plugin',
    hooks: {
      'zuby:config:setup': ({ config, addPage }) => {
        // Modify the config.
        config.outDir = 'build';
        // Add a new page.
        // It works with both router and file system routing paths.
        // Example: /products/:id, /products/[id]
        addPage('products.jsx', '/products/:id');
      }
    }
  }
}
```

## ZubyPlugin Hooks API
The section describes all available `hooks` on `ZubyPlugin`:

### `zuby:config:setup`
This hook is called before the Zuby config is resolved and allows you to modify the config. 
Dynamically add new Pages, Handlers, Templates and as well inject tags into HTML output of each page. 
Once the `ZubyConfig` is resolved, you can't modify it anymore,
because different parts of the Zuby.js core have its own copy of the config.
The resolved config is passed to other plugins and parts of the Zuby.js core as `ZubyInternalConfig`
with merged default values and resolved paths. \
Hook type: 
```
(params: { 
    config: ZubyConfig, 
    logger: ZubyLogger, 
    command: "dev" | "build",
    addEntryTemplate: (entryFile: string) => void;
    addAppTemplate: (appFile: string, path?: string) => void;
    addLayoutTemplate: (layoutFile: string, path?: string) => void;
    addInnerLayoutTemplate: (innerLayoutFile: string, path?: string) => void;
    addErrorTemplate: (errorFile: string, path?: string) => void;
    addLoaderTemplate: (loaderFile: string, path?: string) => void;
    addPage: (pageFile: string, path?: string) => void;
    addHandler: (handlerFile: string, path?: string) => void;
    addToHead: (element: string, front?: boolean) => void;
    addToBody: (element: string, front?: boolean) => void;
    injectToEntry: (scriptCode: string, position?: 'top' | 'bottom') => void;
}) => void | Promise<void>
```

### `zuby:config:done`
This hook is called after the Zuby config is resolved by all plugins and allows you to get the final config before the build/dev process starts. \
Hook type:
```
(params: { 
    config: ZubyInternalConfig, 
    logger: ZubyLogger, 
    command: "dev" | "build" 
}) => void | Promise<void>
```

### `zuby:dev:setup`
This hook is called before the dev server is started and allows you to modify the server config. \
Hook type:
```
(params: { 
    config: ZubyInternalConfig, 
    logger: ZubyLogger, 
    devServer: ZubyDevServer
}) => void | Promise<void>
```

### `zuby:dev:start`
This hook is called after the dev server is started. \
Hook type:
```
(params: { 
    config: ZubyInternalConfig, 
    logger: ZubyLogger, 
    devServer: ZubyDevServer
}) => void | Promise<void>
```

### `zuby:build:setup`
This hook is called before the build process starts and allows you to modify the vite build config. \
Hook type:
```
(params: { 
    config: ZubyInternalConfig, 
    logger: ZubyLogger, 
    templates: Template[], 
    clientViteBuildConfig: ViteInlineConfig, 
    serverViteBuildConfig: ViteInlineConfig
}) => void | Promise<void>
```

### `zuby:build:start`
This hook is called after the build process starts. \
Hook type:
```
(params: { 
    config: ZubyInternalConfig, 
    logger: ZubyLogger, 
    templates: Template[] 
}) => void | Promise<void>
```

### `zuby:build:client:done`
This hook is called after the client build is done. \
Hook type:
```
(params: { 
    config: ZubyInternalConfig, 
    logger: ZubyLogger, 
    templates: Template[] 
}) => void | Promise<void>
```

### `zuby:build:server:done`
This hook is called after the server build is done.
Hook type:
```
(params: { 
    config: ZubyInternalConfig, 
    logger: ZubyLogger, 
    templates: Template[]
}) => void | Promise<void>
```

### `zuby:build:done`
This hook is called after the whole build process is done. \
Hook type:
```
(params: { 
    config: ZubyInternalConfig, 
    logger: ZubyLogger, 
    templates: Template[]
}) => void | Promise<void>
```

### `zuby:prerender:start`
This hook is called for each pre-rendered path
before it's pre-rendered to HTML. \
Hook type:
```
(params: { 
    config: ZubyInternalConfig, 
    logger: ZubyLogger, 
    path: string
}) => void | Promise<void>
```

### `zuby:prerender:done`
This hook is called for each pre-rendered path
after it's pre-rendered to HTML. The response's body is passed to hook as `body` param. \
Hook type:
```
(params: { 
    config: ZubyInternalConfig, 
    logger: ZubyLogger, 
    path: string,
    body: string
}) => void | Promise<void>
```
