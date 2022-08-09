import { useEffect, useState } from "react";
import logo from "../Community_NFTS.png";
import { gABI, vABI } from "../constants/ABI";
import {goverance, voteToken} from "../constants/Add"; 
import { ethers } from "ethers";
import Web3Modal from "web3modal";


function Marketplace() {
  const [NFTS,setNFT] = useState([2,3]);
  useEffect(()=>{
    
      //loadNFT();
    
    
  },[]);
  const loadNFT = async() => {
    try{
      const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    let provider = new ethers.providers.Web3Provider(connection);
    let s = provider.getSigner();
    console.log(s);
    const contract = new ethers.Contract(voteToken,vABI,s);
    console.log(contract);
    
    const totalSupply = await contract.totalSupply();
    console.log(totalSupply.toString());
    setNFT(totalSupply)
    let arr = [];
    for(let i=1;i<=totalSupply;i++){
        const t = await contract.timeLock(i);
        console.log(t.toNumber())
        if(t.toNumber() <= 0){
          arr.push(i);
        }
    }
    setNFT(arr);
    console.log(NFTS);
    }catch(e){
      console.log(e);
    }
    
  }
  return (
    <div className="card-box">
       {/* <button class="btn btn-primary" onClick={async()=>{
      //   try{
      //     await loadNFT();
      //   }catch(e){
      //     console.log(e)
      //   }
        
      //  }}>Get NFTs</button> */}
      {NFTS.map((v, ind) => (
        <div className="card card-compact w-96 bg-base-100 shadow-xl im">
          {console.log(v)}
          <figure>
            <img src={logo} alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">ALRA-{v}</h2>
            <p>Goverance NFTs at Level 0</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" onClick={async()=>{
                 const web3Modal = new Web3Modal();
                 const connection = await web3Modal.connect();
                 let provider = new ethers.providers.Web3Provider(connection);
                 let s = provider.getSigner();
                 let a = await s.getAddress();
                 console.log(s);
                 const contract = new ethers.Contract(voteToken,vABI,s);
                 const tx = await contract.transferFrom("0x74073f9D9e4037fA31f8088e370863623c3Eb501",a,v);
                 tx.wait();
                 console.log(tx)
              }}>Buy Now</button>
            </div>
          </div>
        </div> 
      ))}
    </div>
  );
}

export default Marketplace;
