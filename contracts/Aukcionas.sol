// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Auction {
    address public auctioneer;
    address public highestBidder;
    uint public highestBid;

    event BidPlaced(address indexed bidder, uint amount);
    
    event AuctionClosed(address indexed bidder, uint amount);

    modifier onlyAuctioneer() {
        require(msg.sender == auctioneer, "Tik aukciono kurejas gali iskviesti sia funkcija!");
        _;
    }
    modifier mustHigher(){
        require(msg.value > highestBid, "Statymas turi buti didesnis nei praeitas!");
        _;
    }

    constructor() {
        auctioneer = msg.sender;
    }

    function placeBid() external payable mustHigher {

        if (highestBidder != address(0)) {
            payable(highestBidder).transfer(highestBid);
        }

        highestBidder = msg.sender;
        highestBid = msg.value;

        emit BidPlaced(msg.sender, msg.value);
    }

    
    function finalizeAuction() external onlyAuctioneer {
        require(highestBidder != address(0), "Aukcione niekas nesudalyvavo");
        payable(auctioneer).transfer(highestBid);
        emit AuctionClosed(highestBidder, highestBid);
    }
}
