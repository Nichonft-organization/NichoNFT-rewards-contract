require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// set proxy
//const { ProxyAgent, setGlobalDispatcher } = require("undici");
// change to yours
//const proxyAgent = new ProxyAgent('http://127.0.0.1:10809'); 
//setGlobalDispatcher(proxyAgent);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY
const OWNER_ADDRESS_PRIVATE_KEY = process.env.OWNER_ADDRESS_PRIVATE_KEY

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: BSCSCAN_API_KEY,
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337
    },
    bsc_testnet: {
      timeout: 100000000,
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [OWNER_ADDRESS_PRIVATE_KEY]
    },
    bsc_main: {
      timeout: 100000000,
      url: "https://bsc-dataseed1.ninicoin.io",
      chainId: 56,
      accounts: [OWNER_ADDRESS_PRIVATE_KEY]
    },
  }  
};
