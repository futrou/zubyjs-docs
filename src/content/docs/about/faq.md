---
title: FAQ
description: Frequently asked questions about Zuby.js
---

Here are some answers to the questions you might have about Zuby.js.

---

**What runtimes does Zuby.js support?**

Zuby.js supports Node.js runtime of version 18.x and higher.
The Deno, Bun or Edge runtimes (such as Cloudflare Workers) based on Web APIs are currently officially not supported.
However, you might be able to use Zuby.js with runtimes such as Bun due to its compatibility layer for Node.js APIs.

---

**Does Zuby.js support TypeScript?**

Yes, Zuby.js supports TypeScript out of the box and provides type definitions for all its APIs.

---

**What JSX libraries does Zuby.js support?**

Zuby.js focuses on seamless integration with [Preact](https://preactjs.com), and it's the recommended JSX library for Zuby.js.
The [React](https://react.dev) integration is also available and offers the same features.

---

**Does Zuby.js support React Server Components (RSC)?**

No, Zuby.js doesn't support React Server Components (RSC) yet, as there's no equivalent of them in Preact.
Zuby.js can officially support only those rendering features that are common for all its supported JSX libraries.

---

**What operating systems does Zuby.js support?**

Zuby.js supports Windows, Linux and macOS.
You should be able to install, build your project and use it on any platform that supports Node.js.

---

**Is Zuby.js free?**

Yes, Zuby.js is free software licensed under the MIT license
for everyone and suitable for both personal and commercial projects without any limitations.

---


**What package managers does Zuby.js support?**

You can use NPM, Yarn, PNPM or any other Node.js package manager.
Zuby.js CLI is not tied to any specific package manager, and it's up to you which one you'll use.


---

**What kind of page rendering does Zuby.js support?**

Zuby.js has equivalent config for following page rendering types
that you might know from other frameworks:
- **CSR** (Client Side Rendering) - Page is rendered on the client only and acts as an SPA.
- **SSG** (Static Site Generation) - Page is pre-rendered at build time.
- **SSR** (Server Side Rendering) - Page is rendered on the server at runtime.
- **ISG** (Incremental Static Generation) - Only some paths of page are pre-rendered at build time, and others are rendered on the server on the first request and cached for future requests.
- **ISR** (Incremental Server Regeneration) - Same as ISR, but pages can be revalidated and regenerated on the server again after a certain period of time.
---

**What frameworks is this website built with?**

This documentation website is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) template.
Zuby.js right now doesn't support Markdown pages, but it's planned for the future.

---