# Wordle Helper

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mkimitch/wordle-helper/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/mkimitch/wordle-helper)](https://github.com/mkimitch/wordle-helper/issues)
[![GitHub forks](https://img.shields.io/github/forks/mkimitch/wordle-helper)](https://github.com/mkimitch/wordle-helper/network)
[![GitHub stars](https://img.shields.io/github/stars/mkimitch/wordle-helper)](https://github.com/mkimitch/wordle-helper/stargazers)

Wordle Helper is a web application designed to assist you in solving Wordle puzzles. By providing suggestions based on your inputs, it makes it easier to guess the correct word.

## Features

- **Input Letters**: Enter the letters you know are in the word.
- **Exclude Letters**: Specify the letters you know are not in the word.
- **Pattern Matching**: Define the known positions of letters in the word.
- **Suggestions**: Get a list of possible words based on your inputs.

## Getting Started

### Prerequisites

To run Wordle Helper locally, you need to have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mkimitch/wordle-helper.git
   cd wordle-helper
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Deployment

To deploy the app, you can use GitHub Pages:

1. Build the app:

   ```bash
   yarn build
   ```

2. Deploy to GitHub Pages:

   ```bash
   yarn deploy
   ```

## Usage

Visit [Wordle Helper](https://mkimitch.github.io/wordle-helper/) to use the app online. Enter your known and excluded letters, specify any known letter positions, and the app will generate a list of possible words for you to try in your next guess.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the Wordle community for inspiring this project.
- Icons made by [FontAwesome](https://fontawesome.com/).

## Contact

For any inquiries, please contact [Mark](mailto:your-email@example.com).

---

Feel free to reach out if you have any questions or feedback. Happy wordling!
