# Supply Chain Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Angular CLI](https://angular.io/cli)
- [Hardhat](https://hardhat.org/)
- [MetaMask](https://metamask.io/) extension for your browser

## Getting Started

Follow these steps to set up and run the project:

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### Install Dependencies

```bash
npm install
```

### Setup Hardhat

1. **Compile the Smart Contracts**

   ```bash
   npx hardhat compile
   ```

2. **Start the Local Hardhat Node**

   ```bash
   npx hardhat node
   ```

3. **Deploy the Smart Contract**

   ```bash
   npx hardhat ignition deploy ignition/modules/Tracking.js --network localhost
   ```

   - Copy the contract address displayed in the console after deployment.
   - Update the `src/environments/environment.ts` file with the new contract address:

   ```typescript
   export const environment = {
     production: false,
     contractAddress: '0xYourContractAddress'
   };
   ```

### Run the Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Structure

The project follows a modular structure. Key directories and files include:

- `src/app`: Contains the main application code.
- `src/environments`: Environment configuration files.
- `scripts`: Deployment scripts for Hardhat.
- `artifacts`: Compiled contract artifacts.

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use:

- `ng generate directive`
- `ng generate pipe`
- `ng generate service`
- `ng generate class`
- `ng generate guard`
- `ng generate interface`
- `ng generate enum`
- `ng generate module`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further Help

For more help on the Angular CLI, use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.