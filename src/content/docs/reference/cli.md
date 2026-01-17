---
title: Zuby CLI
description: Learn how to use the Zuby.js CLI
---

The Zuby.js CLI is a command line interface that allows you to build and run your Zuby.js app.
It can be used with `npx` or installed globally
using `npm install -g zuby` or `yarn global add zuby`.

Example usage:
```bash
Usage: zuby [options] [command]
Zuby.js is framework for building SPA apps using Vite

Options:
  -V, --version            output the version number
  -h, --help               display help for command

Commands:
  dev [options]            Starts the development server
  preview|start [options]  Starts the preview server for the production build
  build [options]          Builds the app for production
  init                     Initializes a new Zuby project
  info                     Prints useful information about your setup
  upgrade [options]        Upgrades Zuby to the latest compatible version
  help [command]           display help for command
```

## Available commands

### `zuby init`
This command will help you to create a new Zuby.js app.

### `zuby dev`
This command will start the development server.

### `zuby build`
This command will build your Zuby.js app.

### `zuby preview`
This command will start the preview server
and allows you to preview the build locally.

### `zuby info`
Prints useful information about your setup
such as Zuby.js version, Node.js version, OS, installed plugins etc...

### `zuby upgrade`
Upgrades Zuby and all its packages to the latest compatible version.
For example, if you have Zuby.js 1.0.40 installed,
this command will upgrade it to 1.0.45 
but not to the latest version 2.0.0.

If you want to upgrade to the latest version,
you can do so by passing the `--tag latest` option:
```bash
npx zuby upgrade --tag latest
```

### `zuby help`
This command will display the help message
and list all available commands.

## Global flags
You can use the following global flags with any command:

### --version
Displays the Zuby.js version.

### --help
Displays the help message for the given command
and lists all available options with descriptions.
For example:
```bash
npx zuby build --help
```
Prints:
```bash
Usage: zuby build [options]
Builds the app for production
Options:
  -c, --config-file <file>  The relative path to file with Zuby config
  -h, --help                display help for comman
```