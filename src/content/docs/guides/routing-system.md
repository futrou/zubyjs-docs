---
title: Routing system
description: Learn about the file-based routing system of Zuby.js
---

Zuby.js uses a file-based routing system. 
This means that each page of your app is a file in the `./pages` directory
and Zub.js will automatically generate the routing for you.

Here's the example of a simple Zuby.js app with the file-based routing system:
```bash
├── pages
│   ├── index.jsx
│   ├── error.jsx
│   ├── app.jsx
│   ├── layout.jsx
│   ├── users
│   │   ├── index.jsx
│   │   ├── [id].jsx
│   └── _utils.jsx
├── public
│   ├── favicon.ico
│   └── logo.svg
├── zuby.config.mjs
├── package.json
├── package-lock.json
└── node_modules
```
The naming convention for the files is very similar to the pages folder of Next.js

## Pages and Handlers
The main purpose of each file in the `./pages` directory depends on its extension.
- `.jsx` or `.tsx` - The pages.
  - These files will be rendered by the `JsxProvider` defined in the [config file](/reference/configuration).
  - By default, all these files will generate new page that will be built for both client and server.
- `.js` or `.ts` - The handlers. 
  - The handlers are universal files that allow to define API endpoints, middlewares and page props for both pre-rendered and not rendered pages.
  - They always run on the server and can run before the page is rendered.

## Static routes
Static routes are the routes that don't have any dynamic segments in the path.
For example, the `/about` route is a static route.

To create a static route, create a file with the same name as the route in the `./pages` directory.
For example, to create the `/about` route, create the `./pages/about.jsx` file.
The `index.jsx` works as a default route for the directory,
so the `/about/index.jsx` file will generate the `/about` route as well.

Examples:
- `./pages/about.jsx` - Will match only `/about` path
- `./pages/about/index.jsx` - Will match only `/about` path
:::note
The static routes are pre-rendered by default in the `static` build mode.
:::

## Dynamic routes
Dynamic routes are the routes that have dynamic segments in the path.
Zuby.js supports various types of dynamic segments:
- `[id]` - Required param - This param matches any character except `/`.
- `[[id]]` - Optional param - This param matches any character except `/` and can be empty.
- `[...id]` - Catch-all param - This param matches any character including `/`.
- `[[...id]]` - Optional catch-all param - This param matches any character including `/` and can be empty.

To create a dynamic route, create a file with the same name as the route in the `./pages` directory.
For example, to create the `/users/[id]` route, create the `./pages/users/[id].jsx` file.

Examples:
- `./pages/users/[id]` - Will match `/users/123`, `/users/abc` but not `/users/` paths
- `./pages/users/[[id]]` - Will match `/users/`, `/users/123` and `/users/` paths
- `./pages/users/[...id]` - Will match `/users/123`, `/users/123/abc` but not `/users/` paths
- `./pages/users/[[...id]]` - Will match `/users/`, `/users/123`, `/users/123/abc` and `/users/123/abc/` paths

:::note
The dynamic routes are not pre-rendered by default in the `static` build mode
because they can have an infinite number of possible paths.
:::

## Order of routes
In case when multiple routes match the same path, 
Zuby.js will use the following order to determine which route should be used.
The order is from the least to the most dynamic route.
1. Static routes - `./pages/about.jsx` - The static routes have the highest priority. 
2. Dynamic routes - Required param - `./pages/products/[id]`
3. Dynamic routes - Optional param - `./pages/products/[[id]]`
4. Dynamic routes - Catch-all param - `./pages/products/[...id]`
5. Dynamic routes - Optional catch-all param - `./pages/products/[[...id]]`
6. Dynamic routes - Default routes

## Special file names
The following file names are reserved for template files in Zuby.js
and cannot be used as file names for pages or handlers.
- `error.jsx` - The default page for the errors such as 404, 500, etc.
- `app.jsx` - The default app component for all pages under the given directory.
- `layout.jsx` - The default layout component for all pages under the given directory.
- `innerLayout.jsx` - The default inner layout component for all pages under the given directory.
- `entry.jsx` - The default entry point.
- `index.jsx` - The default page for the given directory.

:::note
If you want to create a page with one of these names,
just create a directory with this name and put the `index.jsx` file inside this directory.
For example, to create the `/layout` route, create the `./pages/layout/index.jsx` file instead of `./pages/layout.jsx`.
::: 

## Ignored file names
The files prefixed with `_` are ignored by Zuby.js and can be used for any other purpose. \
For example, you can use the `_utils.jsx` file to define some utility functions inside the pages folder.