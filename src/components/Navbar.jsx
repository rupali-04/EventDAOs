// import logo from './logo.svg';
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useStateValue } from "../context/web3Context";
import { useState } from "react";
import { useContext } from "react";
import { Web3Context } from "../context/web3Context";

const Navbar = () => {
//const [, dispatch] = useStateValue();
const { loadWeb3Modal, accountAddress } = useContext(Web3Context);
const [add,setAdd] = useState("");

  // const sendDetails = (provider, address, s) => {
  //   console.log("Error");
  //   dispatch({
  //     type: "ADD_WALLET",
  //     item: {
  //       id: provider,
  //       address: address,
  //       signer: s
  //     }
  //   });
  // };



  return (
    <div className="App">
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <Link to="/">
            <a class="btn btn-ghost normal-case text-xl">EventDAOs</a>
          </Link>
        </div>
        {/* <div class="toast toast-middle toast-center">
                
                <div class="alert alert-success">
                  <div>
                    <span>Message sent successfully.</span>
                  </div>
                </div>
              </div> */}
        <div class="flex-none">
          <ul class="menu menu-horizontal p-0">
            <li>
              <Link to="/marketplace">
                <a>Marketplace</a>
              </Link>
            </li>
            <li tabindex="0">
              <a>
                Events
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100 Enav">
                <div className="bgBlur">
                  <li className="Znav">
                    <Link to="/createEvents">
                      <a className="Znav">Create Events</a>
                    </Link>
                  </li>
                  <li className="Znav">
                    <Link to="/bookTickets">
                      <a className="Znav">Book Tickets</a>
                    </Link>{" "}
                  </li>
                </div>
              </ul>
            </li>
          
            <li tabindex="0">
           
              <a> 
                <Link to="/proposals">
                <li>
                  Proposal</li></Link>
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul class="p-2 bg-base-100 Pnav">
              <div className="bgBlur">
                <li>
                  <Link to="/createProposal">
                    <a>Create Proposals</a>
                  </Link>
                </li>
                <li>
                  <Link to="/completeVote">
                    <a>Result</a>
                  </Link>{" "}
                </li>
                </div>
              </ul>
            </li>
            <li>
              <button onClick={async () => {
                // const web3Modal = new Web3Modal();
                // const connection = await web3Modal.connect();
                // let provider = new ethers.providers.Web3Provider(connection);
                // let s = provider.getSigner();
                // let address =  await s.getAddress();
                // // sendDetails(provider, address, s)
                // setAdd(address);
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                let provider = new ethers.providers.Web3Provider(connection);
                let s = provider.getSigner();
                let address =  await s.getAddress();
                let singM = s.signMessage("HEllo");
                setAdd(address);
                //console.log(accountAddress);
              }}>Connect</button>
            </li>
            
            <Link to="/createNFT">
              {add === "0x74073f9D9e4037fA31f8088e370863623c3Eb501" ? <button className="btn">Admin</button> : ""}
              
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
