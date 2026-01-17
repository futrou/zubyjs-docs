---
title: Deploy Zuby.js
description: Learn how to deploy your new Zuby.js app
---

The following guide will help you to deploy your new Zuby.js 
app to well-known hosting providers or host it on your own server.

The server build is self-contained and can be deployed to any serverless hosting service
that supports Node.js 18.x or higher runtime environment. The static build can be deployed to any static hosting service.

Continue by choosing one of the following options
to learn how to host your new Zuby.js app:
- [Hosting providers](#hosting-providers) - Host Zuby.js app in the cloud
- [Self-hosting](#self-hosting) - Host Zuby.js app on your own server

## Hosting providers
The following guide will help you to deploy your new Zuby.js app to below hosting providers:
- [Cloudflare Pages](https://pages.cloudflare.com/) - Can be used to host apps built in static mode.
- [Edgio Sites](https://edg.io/applications/sites/) - Can be used to host apps built in both static and server mode.
- [Gitlab Pages](https://docs.gitlab.com/ee/user/project/pages/) - Can be used to host apps built in static mode.
- [Github Pages](https://docs.github.com/en/pages/quickstart) - Can be used to host apps built in static mode.
- [AWS Amplify](https://aws.amazon.com/amplify/) - Can be used to host apps built in both static and server mode.
- [Netlify](https://www.netlify.com/) - Can be used to host apps built in static mode.

### Cloudflare Pages
Supported output: `static` \
Free tier: `Yes` \
Cloudflare Pages is a hosting service that can be used to host apps built in static mode.
Follow the steps below to deploy your new Zuby.js app to Cloudflare Pages:
1. If you don't have a Cloudflare account, create one at [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
2. Enter your project directory:
    ```bash
     cd ./my-zuby-app
    ```
3. Install Cloudflare Wrangler CLI:
    ```bash
    npm install wrangler --save-dev
    ```
4. Login to Cloudflare Wrangler CLI:
    ```bash
    npx wrangler login
    ```
5. Create a new Cloudflare Pages project (for example with the name `my-zuby-app`):
    ```bash
    npx wrangler pages project create my-zuby-app
    ```
6. Build your Zuby.js app:
    ```bash
    npx zuby build
    ```
7. Deploy your built app to Cloudflare Pages:
    ```bash
    wrangler pages deploy "./build/client" 
    ```
   :::note
   In the following example the `outDir` is set to `build` in `zuby.config.mjs`. If you use a different directory, please change the path accordingly.
   :::
8. That's it! 🎉 Your app is now deployed to Cloudflare Pages. The Cloudflare Pages will automatically find the correct 404 error files in the build folder and use them. Learn more about Cloudflare Pages at [https://developers.cloudflare.com/pages](https://developers.cloudflare.com/pages).

### Edgio Sites
Supported output: `static` and `server` \
Free tier: `Yes` \
Edgio Sites is a hosting service that can be used to host apps built in both static and server mode.
Follow the steps below to deploy your new Zuby.js app to Edgio Sites:

1. If you don't have an Edgio account, create one at [https://edgio.app/signup](https://edgio.app/signup).
2. Enter your project directory:
    ```bash
     cd ./my-zuby-app
    ```
3. Install Edgio CLI:
    ```bash
    npm install @edgio/cli --save-dev
    ```
4. Run the following command to login to Edgio CLI:
    ```bash
    npx edgio login
    ```
5. Add Edgio to your project:
    ```bash
    npx edgio init
    ```
6. Answer the questions asked by the wizard as shown below:
    ```bash
    🚀 Let's get started with Edgio!
    ? What kind of project do you want to set up?
    > Edgio Sites (Web-app hosting)
   
    ```bash
    ? What is the build directory for server files of your app? (Leave blank if not applicable) ...
    > ./build
   
    ? What is the path of the entry file (relative to the build directory) of your app? (Leave blank if not applicable) ...
    > ./server.mjs
   
    ? What is the static files directory of your app? (Leave blank if not applicable) ...
    > ./build/client
   
    ? What is the environment variable name for the port your app server listens to? (Leave blank if not applicable) ...
    > PORT
   
    ? Please specify the build command (if available) ...
    > npx zuby build
   
    ? Please specify the dev server command (if available) ...
    > npx zuby dev
   
    ? Please specify a message or timeout value (in seconds) to wait until the dev server is ready ...
    > 60
    ```
   :::note
   In the upper example the `outDir` is set to `build` in `zuby.config.mjs`. If you use a different directory, please change the path accordingly.
   :::

7. Build and deploy your app to Edgio Sites:
    ```bash
    npx edgio deploy
    ```
8. That's it! 🎉 Your app is now deployed to Edgio Sites. Learn more about Edgio Sites at [https://docs.edg.io/guides/v7/sites_frameworks](https://docs.edg.io/guides/v7/sites_frameworks).

### Gitlab Pages
Supported output: `static` \
Free tier: `Yes` \
Gitlab Pages is a Git hosting service that can be also used to host Zuby.js app built in static mode.
Follow the steps below to deploy your new Zuby.js app to Gitlab Pages:
1. This guide assumes that you already have a Gitlab account and a repository with your Zuby.js app set up.
2. Enter your project directory:
    ```bash
     cd ./my-zuby-app
    ```
3. Add `.gitlab-ci.yml` file to your project with the following content:
   ```yaml .gitlab-ci.yml
   # Use latest Node.js LTS image
   image: node:lts
   before_script:
     # Install all project dependencies
     - npm install
   cache:
     paths:
       # Cache node_modules to speed up next deploys
       - node_modules
   pages:
     before_script:
       # Clean previous build from public folder
       - rm -rf public/*
     script:
       # Build your Zuby.js app 
       - npx zuby build
       # Move static output to public folder
       - mv build/client/* public
     after_script:
       # Cleanup 
       - rm -rf build
     artifacts:
       paths:
         - public
     rules:
       # Trigger deploy on commit/merge to main branch only
       - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
   ```
   :::note
   In the upper example the `outDir` is set to `build` in `zuby.config.mjs`. If you use a different directory, please change the path accordingly.
   It also assumes that your Zuby.js project is in the root of the Git repository.
   :::
4. If you have a custom domain, go to your repository on Gitlab and navigate to `Deploy` > `Pages` section and connect it.
5. If you don't have a custom domain, you can use the default one from Gitlab and access your app at `https://<your-username>.gitlab.io/<your-repository-name>`. \
   However, in that case you need to set the `base` property in `zuby.config.mjs` to `<your-repository-name>`:
   ```js title="zuby.config.mjs"
    import { defineConfig } from 'zuby';
    import preact from '@zubyjs/preact';
   
    export default defineConfig({
        outDir: 'build',
        base: 'my-zuby-app',
        jsx: preact(),
    });
    ```
   See the [GitLab Pages default domain names](https://docs.gitlab.com/ee/user/project/pages/getting_started_part_one.html) docs to learn more about the User, Group and Project Pages default domain names.
6. Commit and push the changes to your repository main branch. This will trigger the CI pipeline, which will build and deploy your app to Gitlab Pages.
7. Wait for the pipeline to finish.
8. And that's it! 🎉 Your app is now deployed to Gitlab Pages. Learn more about Gitlab Pages at [https://docs.gitlab.com/ee/user/project/pages/](https://docs.gitlab.com/ee/user/project/pages/).

### Github Pages
Supported output: `static` \
Free tier: `Yes` \
Github Pages is a Git hosting service that can be also used to host Zuby.js app built in static mode.
Follow the steps below to deploy your new Zuby.js app to Gitlab Pages:
1. This guide assumes that you already have a Github account and a repository with your Zuby.js app set up.
2. Enter your project directory:
    ```bash
     cd ./my-zuby-app
    ```
3. Add `.github/workflows/deploy.yml` file to your project with the following content:
   ```yaml .github/workflows/deploy.yml
   name: Deploy Zuby.js to GitHub Pages
   on:
     push:
       branches:
         # Run workflow only on push to main branch
         - main
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   concurrency:
     group: "pages"
     cancel-in-progress: false
   jobs:
     # Build your app
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout Repository
           uses: actions/checkout@v4
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: "14"
         - name: Install dependencies
           run: npm install
         - name: Build your Zuby.js app
           run: npx zuby build
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v2
           with:
             path: ./build/client
     # Deploy your app
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v3
   ```
   :::note
   In the upper example the `outDir` is set to `build` in `zuby.config.mjs`. If you use a different directory, please change the path accordingly.
   It also assumes that your Zuby.js project is in the root of the Git repository and the main branch is called `main`.
   :::
4. Enable Github Pages. Go to your repository's Settings tab. Click `Pages` in the sidebar
   Under `Build and Deployment`, select `Github Actions` as the source.
5. If you have a custom domain, configure it on the same page.
5. If you don't have a custom domain, you can use the default one from Github and access your app at `https://<your-username>.github.io/<your-repository-name>`. \
   However, in that case you need to set the `base` property in `zuby.config.mjs` to `<your-repository-name>`:
   ```js title="zuby.config.mjs"
    import { defineConfig } from 'zuby';
    import preact from '@zubyjs/preact';
   
    export default defineConfig({
        outDir: 'build',
        base: 'my-zuby-app',
        jsx: preact(),
    });
    ```
   See the [Github Pages domains docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) docs to learn more about Github Pages domains.
6. Commit and push the changes to your repository main branch. This will trigger the CI pipeline, which will build and deploy your app to Github Pages.
7. Wait for the pipeline to finish.
8. And that's it! 🎉 Your app is now deployed to Github Pages. Learn more about Github Pages at [https://docs.github.com/en/pages/quickstart](https://docs.github.com/en/pages/quickstart).


## Self-hosting
Zuby.js app can be hosted on any server with Node.js 18.x or higher runtime environment
using included Zuby.js server. This way of hosting supports both static and server output modes.
Simply build your app and copy the `./build` directory to your server.

To start the app, run the following command:
```bash
node ./build/server.js
```

The Zuby.js app is by default listening on `127.0.0.1` interface and `3000` port.
If you want to change the port or interface the app is listening on,
you can do it by setting the `PORT` and `HOST` environment variables as follows:
```bash
HOST=127.0.0.1 PORT=3000 node ./build/server.js
```

:::note
To allow outside connections, you need to change the interface to `0.0.0.0`
and make sure that the ports 80 and 443 are not blocked by your firewall.
:::

To start the app automatically on system startup and crash,
you can create init.d or systemd service depending on your system.

The following example shows how to create a systemd service for the app:
```bash
sudo nano /etc/systemd/system/zuby.service
```

```ini /etc/systemd/system/zuby.service
[Unit]
Description=My Zuby.js app
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
ExecStart=/usr/bin/node /my-zuby-app/build/server.mjs

[Install]
WantedBy=multi-user.target
```

:::note
It's highly recommended to restrict the permissions of the user running the app
and not to run it as root on production unless it's running in a container or micro-VM.
:::