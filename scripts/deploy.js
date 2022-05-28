const hre = require("hardhat");

const main = async () => {
  const Rewards = await hre.ethers.getContractFactory("NichoNFTRewards");
  const rewards = await Rewards.deploy();
  await rewards.deployed();
  console.log("Rewards address:", rewards.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });