# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
step 1: 
#Install hardhat environment
npm install -save-dev hardhat
or
yarn add --dev hardhat

step 2: 
#Install dependencies
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan ethers dotenv hardhat-gas-reporter
or
yarn add --dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan ethers dotenv hardhat-gas-reporter

step 3:
#Env files are created in the root directory
#testnet standard ERC20 token
#https://testnet.bscscan.com/token/0xE36e88dad95EE1100638956dED986Cb77dDF1747
.env
OWNER_ADDRESS=
OWNER_ADDRESS_PRIVATE_KEY=
NICHO_TOKEN_ADDRESS=0xE36e88dad95EE1100638956dED986Cb77dDF1747
BSCSCAN_API_KEY=CKFRDIMVM8B1U9WD2TAX3JRWYIE4H8MEMW

step 4: 
#Compile contract
npx hardhat compile
or
yarn hardhat compile

step 5:
#Start local node
npx hardhat node
or 
yarn hardhat node

step 6:
#Deployed contract to local hardhat node
#localhost
npx hardhat run scripts/deploy.js --network bsc_testnet
#test_net
npx hardhat run scripts/deploy.js --network bsc_testnet
or
yarn hardhat run scripts/deploy.js --network localhost
yarn hardhat run scripts/deploy.js --network localhost
#Test
npx hardhat test
or
yarn hardhat test
#Specifying test functions
yarn hardhat test --grep grantRole

#PS: Separate validation
#https://testnet.bscscan.com/address/0xfE2b69c6cAa56D04D6e3B505D0d5865948f53b17#code
npx hardhat verify 0xfE2b69c6cAa56D04D6e3B505D0d5865948f53b17 --contract contracts/NichoNFTRewards.sol:NichoNFTRewards  --network bsc_testnet "0xE36e88dad95EE1100638956dED986Cb77dDF1747"
or
npx hardhat verify 0xfE2b69c6cAa56D04D6e3B505D0d5865948f53b17 --network bsc_testnet "0xE36e88dad95EE1100638956dED986Cb77dDF1747"
or
#npx hardhat clean
#Multiple constructor parameter
npx hardhat verify 0xfE2b69c6cAa56D04D6e3B505D0d5865948f53b17 --network bsc_testnet "0xE36e88dad95EE1100638956dED986Cb77dDF1747" "0xE36e88dad95EE1100638956dED986Cb77dDF1747" "0xE36e88dad95EE1100638956dED986Cb77dDF1747"

Other related commands
#List Account
npx hardhat accounts
or
yarn hardhat accounts

#Clean
npx hardhat clean
or
yarn hardhat clean

#Script
node scripts/sample-script.js
or
yarn scripts/sample-script.js

#Help
npx hardhat help
or
yarn hardhat help

#Tips
#log: import "hardhat/console.sol";

```
