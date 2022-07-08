require("dotenv").config()
const { ethers, run, network } = require("hardhat");

const main = async () => {
  const initRewardsToken = process.env.NICHO_TOKEN_ADDRESS;
  const Rewards = await ethers.getContractFactory("NichoNFTRewards");
  const rewards = await Rewards.deploy(initRewardsToken);
  await rewards.deployed();
  console.log("Rewards address:", rewards.address);

  if ((network.config.chainId === 97 || network.config.chainId === 56) && process.env.BSCSCAN_API_KEY) {
    await rewards.deployTransaction.wait(10)
    await verify(rewards.address, initRewardsToken)
  }

}

async function verify(contractAddress, args) {
    console.log("Verifying contractAddress code...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguements: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified!")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });