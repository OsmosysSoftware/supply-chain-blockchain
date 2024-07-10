# Project Architecture

## Overview

This document provides an overview of the architecture of our blockchain project. The project consists of a frontend built with Angular, and smart contracts written in Solidity and managed with Hardhat.

## Architecture Diagram

![Architecture diagram](./images/blockchain.drawio.png)

<details>
<summary>Why Use blockchain in this project?</summary>

### Supply Chain System

In our supply chain management system, we track product statuses such as transit, delivery, and payment. Each transaction, such as payment for delivery, is recorded as a smart contract on the blockchain. Here’s why we use blockchain for this:

- **Transparency**: Every stakeholder can view the entire transaction history, ensuring transparency.
- **Immutability**: Once recorded, data cannot be altered, providing an auditable trail of events.
- **Smart Contracts**: Automation of transactions based on predefined conditions (e.g., automatic payment release upon delivery confirmation).
- **Security**: Enhanced security against fraud and tampering compared to traditional centralized systems.
- **Efficiency**: Streamlined processes and reduced paperwork, leading to faster transactions.

### Benefits Over Traditional Systems

Blockchain technology offers significant advantages over traditional database systems in supply chain management:

- **Decentralization**: Eliminates the need for a central authority, reducing dependency and single points of failure.
- **Trust**: Builds trust among participants through transparent and verifiable transactions.
- **Cost Reduction**: Reduces costs associated with intermediaries, paperwork, and reconciliation.
- **Auditing**: Facilitates easy auditing and compliance with regulations due to transparent and immutable records.
- **Dispute Resolution**: Simplifies dispute resolution by providing a clear record of transactions.

</details>
</details>


## Components

### 1. Frontend (Angular)

#### Overview
The frontend of the application is developed using Angular, a popular framework for building dynamic web applications. It interacts with the smart contracts deployed on the blockchain network.

#### Key Features
- **User Interface**: Provides a user-friendly interface for interacting with the blockchain.
- **Data Binding**: Utilizes Angular's data binding to reflect real-time changes from the blockchain.
- **Services**: Angular services are used to interact with the blockchain via Web3.js or Ethers.js.

#### Directory Structure
```
/src
  /app
    /components
    /services
  /assets
  /common
  /environments
```

#### Tools and Libraries
- **Angular CLI**: For scaffolding and managing the Angular project.
- **RxJS**: For handling asynchronous operations.
- **Web3.js / Ethers.js**: To interact with the Ethereum blockchain.

### 2. Smart Contracts (Solidity)

#### Overview
The smart contracts are written in Solidity, a statically-typed programming language designed for developing smart contracts that run on the Ethereum Virtual Machine (EVM).

#### Key Features
- **Contract Logic**: Implements the core business logic.
- **Storage**: Manages the storage of data on the blockchain.
- **Events**: Emits events to notify external applications of state changes.

#### Directory Structure
```
/contracts
  MyContract.sol
```

### 3. Development and Deployment (Hardhat)

#### Overview
Hardhat is a development environment for Ethereum that facilitates compiling, deploying, testing, and debugging Ethereum software.

#### Key Features
- **Compilation**: Compiles Solidity contracts.
- **Deployment**: Scripts to deploy contracts to various networks.
- **Testing**: Framework for writing and running tests.
- **Debugging**: Tools for debugging Solidity code.

#### Directory Structure
```
/hardhat.config.js
/ignition
  /modules
    MyModule.js
```

#### Tools and Libraries
- **Hardhat**: Main development environment.
- **Mocha & Chai**: For writing and executing tests.
- **Hardhat Network**: Local Ethereum network for testing.

## Workflow

### Development
1. **Frontend Development**: Angular components, services, and models are developed to create the user interface.
2. **Smart Contract Development**: Solidity contracts are written and tested using Hardhat.
3. **Integration**: The frontend is integrated with the smart contracts using Web3.js or Ethers.js.

### Deployment
1. **Compile Contracts**: Compile Solidity contracts using Hardhat.
2. **Deploy Contracts**: Deploy the compiled contracts to the Ethereum network.
3. **Configure Frontend**: Update the frontend with the deployed contract addresses and ABI.

### Testing
- **Unit Testing**: Solidity contracts are tested using Hardhat's testing framework.
- **Integration Testing**: The interaction between the frontend and the smart contracts is tested to ensure seamless communication.