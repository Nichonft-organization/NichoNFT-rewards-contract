//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NichoNFTRewards is Ownable {
    using SafeMath for uint256;

    bool public claimEnabled = false;
    address public rewardsToken;
    uint256 public lastUpdatedNo;
    uint256 public totalRewardsCount;
    mapping (address => RewardItems) private userRewards;

    struct RewardItems {
        uint256 no;
        address user;
        uint256 amount;
        uint256 time;
    }

    event rewardsUpdated(uint256 no, uint256 amountSum, uint256 userCount, uint256 time);
    event claim(uint256 no, address user, uint256 amount, uint256 time);

    constructor (address _rewardsToken) {
        rewardsToken = _rewardsToken;
    }

    function getUserRewardsAmount(address user) public view returns (uint256) {
        return userRewards[user].amount;
    }

    function getRewardsAmount(address _rewardsToken) public view returns (uint256) {
        return IERC20(_rewardsToken).balanceOf(address(this));
    }

    function claimRewards() public {
        require(claimEnabled, "NichoNFTRewards: cliam unavailable");
        require(userRewards[_msgSender()].amount > 0 , "NichoNFTRewards: user already cliams");
        require(userRewards[_msgSender()].no == lastUpdatedNo , "NichoNFTRewards: user reward expired");

        IERC20 token = IERC20(rewardsToken);
        RewardItems storage items = userRewards[_msgSender()];
        uint256 userAmount =  items.amount;
        uint256 tokenAmount = token.balanceOf(address(this));
        // check amount
        require(userAmount > 0 && tokenAmount >= userAmount, "NichoNFTRewards: invalid amount");
        // set zero
        items.amount = 0;
        token.transfer(_msgSender(), userAmount);

        emit claim(items.no, _msgSender(), userAmount, block.timestamp);
    }

    function updateRewards(RewardItems[] calldata  _rewardsItmes) public onlyOwner {
        require(_rewardsItmes.length > 0, "NichoNFTRewards: no rewards data");
        uint256 amountSum = 0;
        uint256 userCount = 0;
        lastUpdatedNo = _rewardsItmes[0].no;

        for (uint256 i = 0; i < _rewardsItmes.length; i++) {
            RewardItems memory itmes = _rewardsItmes[i];
            amountSum = SafeMath.add(amountSum, itmes.amount);
            userCount = SafeMath.add(userCount, 1);
            // set user mapping
            userRewards[itmes.user] = RewardItems({no: itmes.no, user: itmes.user, amount: itmes.amount, time: itmes.time});
        }
        totalRewardsCount = userCount;
        emit rewardsUpdated(lastUpdatedNo, amountSum, userCount, block.timestamp);
    }

    function setRewardsToken(address _rewardsToken) public onlyOwner {
        rewardsToken = _rewardsToken;
    }

    function setClaimEnabled(bool _claimEnabled) public onlyOwner {
        claimEnabled = _claimEnabled;
    }

}
