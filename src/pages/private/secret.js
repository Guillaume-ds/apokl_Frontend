import React, { useEffect, useState, useContext } from "react";

import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import AuthenticationContext from "../../../context/AuthenticationContext";

import Layout from '../../hocs/Layout';

import {marketplaceAddress} from '../../../config'
import NFTMarketplace  from '../../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

import { Grid, Button } from "@mui/material";


export default function Nfts() {
    const {user} = useContext(AuthenticationContext)
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
    let Owner = O.toString()
    setOwner(Owner)
  }

  useEffect(()=>{
    getOwner()
  },[])

    return (
    <Layout>
      <Grid sx={{pt:5}}></Grid>
      <Button onClick={()=> getBalance()} >
        click me 
      </Button>
      <div>
        This is the balance : {Balance}
      </div>
      <span>{owner} </span>
    </Layout>)

}

