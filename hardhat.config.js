require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const { SEPOLIA_URL, SEPOLIA_ACCOUNT } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [`0x${SEPOLIA_ACCOUNT}`],
    },
  },
};
