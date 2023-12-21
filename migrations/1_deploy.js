// 2_deploy_contract.js
var AuctionContract = artifacts.require("./Auction.sol");

module.exports = function(deployer) {
  // Deploy the Auction contract
  deployer.deploy(AuctionContract);
};
