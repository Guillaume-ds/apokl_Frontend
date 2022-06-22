import axios from "axios";

import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import Apokl from '../../assets/images/logo.png';

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'


export async function getNftBackend(url,creatorName=null,price=null,tags=null,id=null){
    let nfts = []

    const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const body = {
      "creator":creatorName,
      "priceMax":price,
      "tags":tags,
      "id":id
    }  
    const res = await axios.post(url, body, config )
    
    let nextBackendUrl = res.data.next
    let previousBackendUrl = res.data.previous
     
    /* Now check if tokenId in ids, prevent from accessing all nft with unexisting id*/
    /* Because it is supposed to be true, it should'nt take long*/ 
    try{
        if(id !== undefined){
            const len = res.data.results.length
            for(let i=0; i<len ;i++){
              if(id.includes(res.data.results[i].tokenId)){
                  nfts = [...nfts,res.data.results[i]]
              }
            }
        }else{
            nfts = res.data.results
        }

    }catch{
        nfts = res.data.results
    }
    
    return {"nfts":nfts, "nextBackendUrl":nextBackendUrl, "previousBackendUrl":previousBackendUrl}
  }


export async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
    document.location.reload(true)
    loadNFT(nft.tokenId)
  }

export async function loadNFT(nftid) {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
    try{const data = await contract.fetchMarketItem(nftid)
      const tokenUri = await contract.tokenURI(data.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(data.price.toString(), 'ether')
      let item = {
        price,
        tokenId: data.tokenId.toNumber(),
        seller: data.seller,
        owner: data.owner,
        royalties: parseFloat(String(data.creatorRoyaltiesRate),16),
        creator: meta.data.creator,
        image: meta.data.image,
        title: meta.data.title,
        description: meta.data.description,
        slug: meta.data.slug,
        sold: data.sold}
      return item
    }catch{
      let item = {
        price:0,
        tokenId: 0,
        seller: 0,
        owner: 0,
        image: Apokl,
        title: 'no item',
        description: 'no description',
        slug: 'no slug'
      }
      return item
    }
	}

  
export async function ownedNFTs() {
  let nfts = []
  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
  })
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()

  const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
  const data = await marketplaceContract.fetchItemsOwned()

  const items = await Promise.all(data.map(async i => {
    const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
    const meta = await axios.get(tokenURI)
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    let item = {
      price,
      tokenId: i.tokenId.toNumber(),
      seller: i.seller,
      owner: i.owner,
      royalties: parseFloat(String(i.creatorRoyaltiesRate),16),
      creator: meta.data.creator,
      image: meta.data.image,
      title: meta.data.title,
      description: meta.data.description,
      slug: meta.data.slug,
      sold: i.sold,
      tokenURI
    }
    nfts = [...nfts,item]
  }))

  return nfts
  }

  export async function getMyNftsIds(){
		const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })

    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await marketplaceContract.fetchItemsOwned()
		const ownedNftsId = []

		data.forEach((token)=>{
			ownedNftsId.push(token.tokenId.toString())
		})
		return ownedNftsId
	}

  export async function listNFTForSale(id, price) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const priceFormatted = ethers.utils.parseUnits(price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()

    listingPrice = listingPrice.toString()
    try{
      
      let transaction = await contract.resellToken(id, priceFormatted, { value: listingPrice })
      await transaction.wait()
      return "success"
    }catch{
      return "failure"
    }

    
  }