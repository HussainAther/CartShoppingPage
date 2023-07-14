# OOP Shopping Cart Webpage

## Shop with Users OOP System

This is a TypeScript project that implements an Object-Oriented Programming (OOP) system for a shop with users who can buy items. It provides classes for Item, User, and Shop, along with various methods for managing the user's cart and performing cart operations.

## Setup Instructions

To set up and run the project locally, follow these steps:

1. Clone the repository to your local machine or download the source code.
2. Open a command prompt or terminal in the project's root directory.
3. Initialize the Node.js Project

Run the following command to initialize a new Node.js project:

    ```
    npm init -y
    ```

4. Install TypeScript

Install TypeScript as a development dependency by running the following command:

    ```
    npm install typescript --save-dev
    ```

5. Configure TypeScript
Create a tsconfig.json file in the project's root directory with the following contents:

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["es2015", "dom"],
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

5. Install and Configure Webpack
Install Webpack and the necessary dependencies by running the following command:

    ```
    npm install webpack webpack-cli ts-loader --save-dev
    ```

Create a webpack.config.js file in the project's root directory with the following contents:

```
const path = require('path');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
```

6. Install Dependencies
Install the project dependencies by running the following command:

    ```
    npm install uuid @types/uuid --save
    ```

7. Build and Run the Project
To start the project, run the following command:

    ```
    npm start
    ```
 
This command will compile the TypeScript code, bundle it using Webpack, and start the application.

The provided code in the `src/app.ts` file contains a sample implementation of the OOP system. You can modify it as needed to suit your requirements. The application creates a shop, a user, and performs various operations such as adding items to the user's cart, printing the cart, and removing items or quantities from the cart.


