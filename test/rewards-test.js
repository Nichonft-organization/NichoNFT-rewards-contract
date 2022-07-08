const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Rewards", function () {
    let nichoNFTRewards, rewards
    beforeEach(async () => {
        nichoNFTRewards = await ethers.getContractFactory("NichoNFTRewards");
        rewards = await nichoNFTRewards.deploy();
    })

    it("GetUserRewardsAmount", async () => {
        const address = "";
        const currentValue = await rewards.getUserRewardsAmount(address);
        const expectedValue = "0";

        //assert.equal(currentValue.toString(), expectedValue);
        // expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("GrantRole", async () => {
        const role = "";
        const account = "";
        const result = await rewards.grantRole(role, account);
        await result.wait(1);
    })
    

});
