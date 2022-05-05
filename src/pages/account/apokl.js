import React, { useEffect, useState } from "react";
import axios from "axios";


import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import Layout from '../../hocs/Layout';

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

import { Grid, Container, Button } from "@mui/material";


export default function Nfts() {
  const [owner, setOwner] = useState('')
  const [Balance, setBalance] = useState('1')

  async function getBalance(adrr) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const B = await contract.getBalance(marketplaceAddress)
    const bal = B.toString()
    setBalance(bal)
  }

  async function withdrawBalance() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const B = await contract.withdraw('50000000000000000')
  }

  async function getOwner() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const O = await contract.getOwner()
    const Owner = O.toString()
    setOwner(Owner)
  }

    return (
    <Layout>
      <Grid sx={{pt:5}}></Grid>
      <Button onClick={()=> getBalance()} >
        click me 
      </Button>
      <div>
        This is the balance : {Balance}
      </div>
    </Layout>)

}

