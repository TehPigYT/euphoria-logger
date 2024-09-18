# Euphoria Logger (euphoria-logger)

[![NPM Version](https://img.shields.io/npm/v/euphoria-logger.svg)](https://www.npmjs.com/package/euphoria-logger)
![GitHub](https://img.shields.io/github/license/TehPigYT/euphoria-logger.svg)
![npm](https://img.shields.io/npm/dt/euphoria-logger.svg)  <!-- Total Downloads -->
![npm bundle size](https://img.shields.io/bundlephobia/min/euphoria-logger.svg)
![node-current](https://img.shields.io/node/v/euphoria-logger.svg)
![Made with Love](https://img.shields.io/badge/made%20with-love-red.svg)

## Description
Euphoria Logger is a versatile and powerful logging library for Node.js applications. It provides a comprehensive set of features to handle logging in various environments, including:

- **Custom Log Levels**: Define and use custom log levels to suit your application's needs.
- **Console Logging with Native Colors and Custom Formats**: Log messages to the console with customizable node console colors and formats for better readability.
- **File Logging with Rotation, Compression and Buffering**: Log messages to files with options for file rotation based on a set size, buffering to improve overall performance and reduce requests, configurable log level and the ability to specify the logged types.
- **Logging to Webhooks**: Send log messages to popular social platforms like Discord, Guilded, Telegram, and Slack using webhooks.
- **Multiple Logger Instances**: Create and manage multiple logger instances within a single project, each with its own configuration.

Whether you need to log messages to the console, files, or webhooks, Euphoria Logger provides a flexible and efficient solution to meet your logging requirements.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Documentaion](#documentation)
- [Example Usage](#example-usage)
- [Contributing](#contributing)
- [License](#license)

## Installation
Instructions on how to install your package.

table
**npm:**
```sh
npm install euphoria-logger
```
**pnpm**
```sh
pnpm install euphoria-logger
```
**yarn**
```sh
yarn add euphoria-logger
```
**bun**
```sh
bun add euphoria-logger
```

## Usage

The logger supports **ES5** and **ES6**, therefore there are 2 ways the package can be imported depending on the project structure.

**ES5**
```js
const { Logger } = require("euphoria-logger");
const logger = new Logger();
```
**ES6**
```js
import { Logger } from "euphoria-logger";
const logger = new Logger();
```

## Documentation
To view the documentation, check out the docs folder.

## Contributing


## License
This package is licensed under the `AGPL-v3` license. See the [LICENSE]() file for more information.