import { useEffect, useState } from "react";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import { collection,getDocs,doc,setDoc } from "firebase/firestore";
import { gABI } from "../constants/ABI";
import {goverance} from "../constants/Add"; 
import { ethers } from "ethers";
import Web3Modal from "web3modal"; 

import logo from "../Events.png";

const db = getFirestore(app);

function Proposal() {
  const [events,setEvent] = useState([0]);
  const t =async () => {
    let arr = [];
    const querySnapshot = await getDocs(collection(db, "event_data"));
    querySnapshot.forEach((doc) => {
    console.log(doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  setEvent(arr);
  }
    return (
      <div className="App">
       <button className="btn" onClick={async()=>{
        await t()
       }}>Get Data</button>
       <h1 class="text-5xl font-bold">Vote Event Proposals</h1>
       <div className="card-box">
      {events.map((v, ind) => (
        <div className="card card-compact w-96 bg-base-100 shadow-xl im">
          {console.log(v)}
          <figure>
            <img src={logo} alt="Shoes" />
          </figure>{
            v != 0 ?  <div class="card-body">
            <h2 class="card-title">{v.eventName}</h2>
            <p>{v.eventDescription}</p>
          
            <div class="card-actions justify-end">
             <button class="btn btn-primary" onClick={async ()=>{
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                let provider = new ethers.providers.Web3Provider(connection);
                let s = provider.getSigner();
                console.log(s);
                const contract = new ethers.Contract(goverance,gABI,s);
              const t = await contract.voteForProposal(v.eventName,1,true);
              t.wait();
              console.log(t);
             }}>Vote</button>
            </div>
          </div>: "" 
          }
          
        </div>
      ))}
    </div>

      </div>
    );
  }
  
  export default Proposal;
  