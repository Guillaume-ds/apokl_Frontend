// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 1 ether;
    uint256 marketRoyaltiesRate = 1;
    address payable owner;

    modifier onlyOwner {
      require(msg.sender == owner);
      _;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
      uint256 tokenId;
      address payable creator;
      address payable seller;
      address payable owner;
      uint256 price;
      uint256 creatorRoyaltiesRate;
      bool sold;
    }

    event MarketItemCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      uint256 creatorRoyaltiesRate,
      bool sold
    );

    event newTokenIdCreated(uint256 indexed token); 

    constructor() ERC721("Apokl Tokens", "APTK") {
      owner = payable(msg.sender);
    }

    function getBalance(address _adrr) public view onlyOwner returns (uint256) {
      return address(_adrr).balance;
    }

    function getOwner() public view onlyOwner returns (address) {
      return owner;
    }

    function withdraw(uint256 amount) public onlyOwner {
      require(owner == msg.sender, "Only marketplace owner can whidraw funds.");
      (bool success, ) = owner.call{value:amount}("");
      require(success, "Transfer failed.");
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
      return listingPrice;
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(uint _listingPrice) public payable onlyOwner {
      require(owner == msg.sender, "Only marketplace owner can update listing price.");
      listingPrice = _listingPrice;
    }

    /* Returns the transaction fee of the contract */
    function getMarketRoyaltiesRate() public view returns (uint256) {
      return marketRoyaltiesRate;
    }

    /* Updates the transaction fee of the contract */
    function updateMarketRoyaltiesRate(uint _marketRoyaltiesRate) public payable onlyOwner {
      require(owner == msg.sender, "Only marketplace owner can update the royalties rate.");
      marketRoyaltiesRate = _marketRoyaltiesRate;
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(string memory tokenURI, uint256 price, uint256 creatorRoyaltiesRate) public payable returns (uint256 ) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createMarketItem(newTokenId, price, creatorRoyaltiesRate);
      emit newTokenIdCreated(newTokenId);
      return  newTokenId;
    }

    function createMarketItem(
      uint256 tokenId,
      uint256 price,
      uint256 creatorRoyaltiesRate
    ) private {
      require(price > 0, "Price must be at least 1 wei");
      require(msg.value == listingPrice, "Price must be equal to listing price");

      idToMarketItem[tokenId] =  MarketItem(
        tokenId,
        payable(msg.sender),
        payable(msg.sender),
        payable(address(this)),
        price,
        creatorRoyaltiesRate,
        false
      );

      _transfer(msg.sender, address(this), tokenId);
      emit MarketItemCreated(
        tokenId,
        msg.sender,
        address(this),
        price,
        creatorRoyaltiesRate,
        false
      );
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
      require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      require(msg.value == listingPrice, "Price must be equal to listing price");
      require(price>100 , "amout too small");
      idToMarketItem[tokenId].sold = false; 
      idToMarketItem[tokenId].price = price;
      idToMarketItem[tokenId].seller = payable(msg.sender);
      idToMarketItem[tokenId].owner = payable(address(this));
      _itemsSold.decrement();
      _transfer(msg.sender, address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 tokenId) public payable {
      uint price = idToMarketItem[tokenId].price;
      require(msg.value == price, "Please submit the asking price in order to complete the purchase");
      address seller = idToMarketItem[tokenId].seller;
      address creator = idToMarketItem[tokenId].creator;
      uint BigPrice = price*100;
      uint creatorRoyaltiesRate = idToMarketItem[tokenId].creatorRoyaltiesRate;      
      uint creatorReward = (BigPrice * creatorRoyaltiesRate) / 10000;
      uint marketPlaceReward = (BigPrice * marketRoyaltiesRate) / 10000;
      uint sellerReward = price-(marketPlaceReward+creatorReward);
      idToMarketItem[tokenId].owner = payable(msg.sender);
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      _transfer(address(this), msg.sender, tokenId);
      (bool ownerSuccess, ) = owner.call{value:listingPrice + marketPlaceReward}("");
      (bool sellerSuccess, ) = seller.call{value:sellerReward}("");
      (bool creatorSuccess, ) = creator.call{value:creatorReward}("");
    }

    /*Two function to retrieve markets items*/
    /* Retrieve a specific item -> for personal dashboard, iterate over ids in backend instead of blockchain*/

    function fetchMarketItem(uint256 tokenId) public view returns (MarketItem memory) {
      MarketItem memory item = idToMarketItem[tokenId];
      return item;
    }

    /* Returns unsold market items (check in the contract if item is unsold) for market place*/
    function fetchUnsoldMarketItems(uint256[] memory _unsoldTokenIds) public view returns (MarketItem[] memory) {
      uint arrayLen = _unsoldTokenIds.length;
      uint itemsCount = 0;

      for (uint i = 0; i < arrayLen; i++) {
      if (idToMarketItem[_unsoldTokenIds[i]].sold == false) {
          itemsCount +=1;
        }        
      }

      MarketItem[] memory items = new MarketItem[](itemsCount);

      for (uint i = 0; i < arrayLen; i++) {
      if (idToMarketItem[_unsoldTokenIds[i]].sold == false) {
          MarketItem storage currentItem = idToMarketItem[_unsoldTokenIds[i]];
          items[i] = currentItem;
        }        
      }

      return items;
    }

    /* Returns only items that a user has purchased */
    function fetchItemsOwned() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns items a user has created */
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].creator == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].creator == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
}

