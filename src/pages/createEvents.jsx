import logo from "../Events.png";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
//import { useStateValue } from "../context/web3Context";
import { useState,useEffect } from "react";
import { gABI } from "../constants/ABI";
import {goverance} from "../constants/Add"; 
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import { collection,getDoc,doc,setDoc } from "firebase/firestore"; 


// Global Variables
const db = getFirestore(app);

function CreateEvents() {
 
  const [eName,setName] = useState("");
  const [eEmail,setEmail] = useState("");
  const [ePlace,setPlace] = useState("");
  const [eTicketP,setEP] = useState("");
  const [eDate,setDate] = useState("");
  const [eTime,setTime] = useState("");
  const [eTTotal,setTotal] = useState("");
  const [eDesc,setDesc] = useState("");
  // useEffect(() => {
  //   if (wallet) {
  //     setSigner(wallet.signer);
  //     console.log(wallet);
  //   } else {
  //     console.log("err");
  //     }
  //   })
      return (
    <div>
      <div className="App">
        <h1 class="text-5xl font-bold">Registration Events</h1>
        <p class="py-6">Create a Proposal for your Events !!</p>
        <div className="fm-1 r">
        <form className="fm-1">
            <input
              type="text"
              placeholder="Organizer Email"
              class="input input-bordered input-md input-primary w-full max-w-xs"
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
            />{" "}
        
       
        
          <input
            type="text"
            placeholder="Event Name:"
            class="input input-bordered input-md input-primary w-full max-w-xs"
            onChange={(e)=>{
              setName(e.target.value);
            }}
          />
        
          <input
            type="text"
            placeholder="Event Place"
            class="input input-bordered input-md input-primary w-full max-w-xs"
            onChange={(e)=>{
              setPlace(e.target.value);
            }}
          />

<input
            type="text"
            placeholder="Ticket Price"
            class="input input-bordered input-md input-primary w-full max-w-xs"
            onChange={(e)=>{
              setEP(e.target.value);
            }}
          />
        
          <input
            type="text"
            placeholder="Event Date"
            class="input input-bordered input-md input-primary w-full max-w-xs"
            onChange={(e)=>{
              setDate(e.target.value);
            }}
          />

        
          <input
            type="text"
            placeholder="Event Time"
            class="input input-bordered input-md input-primary w-full max-w-xs"
            onChange={(e)=>{
              setTime(e.target.value);
            }}
          />
        
          <input
            type="text"
            placeholder="Total Tickets"
            class="input input-bordered input-md input-primary w-full max-w-xs"
            onChange={(e)=>{
              setTotal(e.target.value);
            }}
          />
        
          <input
            type="text"
            placeholder="Event Description"
            class="input input-bordered input-primary input-lg w-full max-w-xs"
            onChange={(e)=>{
              setDesc(e.target.value);
            }}
          />
           
       
       
        </form>
        <div className="img-box">Event Image
        <input type="file"></input>
          <img src={logo}></img>
          
        <button class="btn btn-primary bt" onClick={async ()=>{
           const web3Modal = new Web3Modal();
           const connection = await web3Modal.connect();
           let provider = new ethers.providers.Web3Provider(connection);
           let s = provider.getSigner();
           console.log(s);
           const contract = new ethers.Contract(goverance,gABI,s);
           console.log(contract);
           try{
            console.log("tttttttttt")
            const Ref = collection(db, "event_data");
           // console.log(Ref)
              const t = await setDoc(doc(Ref,eEmail), {
                eventName: eName,
                eventPlace: ePlace,
                eventTicketPrice: eTicketP,
                eventDate: eDate,
                eventTime: eTime,
                eventTotalTicket: eTTotal,
                eventDescription: eDesc
              });
              // const bNum = await provider.getBlockNumber();
              // const timestamp = await provider.getBlock(bNum);
              // console.log(bNum,timestamp);
              console.log("tttttttttt1111111111")
              const tx = await contract.createProposal(eName,1659857939);
              console.log("gggggggggggg")
              tx.wait();
              console.log(tx);
           }catch(err){
            console.log(err);
           }
        }}>Create Event Proposal!!</button>
       
        </div> </div>
       
      </div>
     
    </div>
  );
}

export default CreateEvents;
