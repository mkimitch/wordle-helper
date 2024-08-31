# Wordle Helper

**Author**: Mark Kimitch | **Email**: [mark.kimitch@gmail.com](mailto:mark.kimitch@gmail.com) | **Version**: 1.0.0 | **License**: [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html)

[![GitHub license](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.html)
[![GitHub issues](https://img.shields.io/github/issues/mkimitch/wordle-helper)](https://github.com/mkimitch/wordle-helper/issues)
[![GitHub forks](https://img.shields.io/github/forks/mkimitch/wordle-helper)](https://github.com/mkimitch/wordle-helper/network)
[![GitHub stars](https://img.shields.io/github/stars/mkimitch/wordle-helper)](https://github.com/mkimitch/wordle-helper/stargazers)

## Built With

![React](https://img.shields.io/badge/dynamic/json?color=blue&label=React&query=$.dependencies.react&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmkimitch%2Fwordle-helper%2Fmain%2Fpackage.json&logo=react)
![TypeScript](https://img.shields.io/badge/dynamic/json?color=blue&label=TypeScript&query=$.devDependencies.typescript&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmkimitch%2Fwordle-helper%2Fmain%2Fpackage.json&logo=typescript)
![Webpack](https://img.shields.io/badge/dynamic/json?color=blue&label=Webpack&query=$.devDependencies.webpack&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmkimitch%2Fwordle-helper%2Fmain%2Fpackage.json&logo=webpack)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

**Wordle Helper** is a web application designed to assist players in solving the popular Wordle game by providing possible word solutions based on the letters they know and the constraints they have. The application uses a combination of React, TypeScript, and Webpack to deliver a responsive and interactive user experience.

## Features

- **Interactive Board**: Allows users to input letters and determine their status (correct, present, absent).
- **Dynamic Word Filtering**: Filters and displays possible word solutions based on user inputs.
- **Keyboard Integration**: Supports keyboard interactions for quick input.
- **Responsive UI**: Ensures a seamless experience across different devices and screen sizes.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mkimitch/wordle-helper.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd wordle-helper
   ```

3. **Install dependencies**:

   ```bash
   yarn install
   ```

## Usage

After installing the dependencies, you can start the development server:

```bash
yarn start
```

This will open the application in your default browser. You can interact with the Wordle Helper to test different word combinations and strategies.

## Scripts

- **`yarn start`**: Starts the development server with live reloading.
- **`yarn build`**: Creates a production build of the application.
- **`yarn deploy`**: Deploys the application to GitHub Pages.
- **`yarn predeploy`**: Builds the project before deploying.

## Development

If you wish to contribute or modify the project, the following tools and configurations are used:

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Webpack**: A module bundler for JavaScript applications.
- **Babel**: A JavaScript compiler that allows you to use the latest features.
- **Sass**: A preprocessor scripting language that is interpreted into CSS.
- **ESLint** and **Prettier**: For code formatting and linting.

### Project Structure

- **`src/components`**: Contains the React components like `Board`, `Tile`, `Results`, etc.
- **`src/context`**: Contains the global state management using React Context API.
- **`src/styles`**: Contains the SCSS styles and variables used in the application.
- **`src/utils`**: Contains utility functions and constants like `wordLists`.

### TypeScript Configuration

The project uses TypeScript for type safety. You can modify the TypeScript configuration in `tsconfig.json` if necessary.

### Webpack Configuration

Webpack is used to bundle the project. The configuration can be found in `webpack.config.js`.

## Deployment

The project is deployed to GitHub Pages. You can deploy your version of the app using the following command:

```bash
yarn deploy
```

This will build the project and push the `dist` folder to the `gh-pages` branch of the repository.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the GNU General Public License v3.0 License. See the [LICENSE](LICENSE) file for details.

---

**Wordle Helper** is not affiliated with the official Wordle game or its creators. This is a fan-made project intended to enhance the playing experience.
