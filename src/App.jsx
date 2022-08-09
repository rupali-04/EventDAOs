import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookTickets from './pages/bookTickets';
import CreateEvents from './pages/createEvents';
import Marketplace from './pages/marketplace';
import CreateNFT from './pages/createNFT';
import CompleteVote from './pages/completeVote';
import CreateProposal from './pages/createProposal';

import Proposal from './pages/proposals';
import EventDetails from './pages/EventDetails';
import Home from './pages/Home';
function App() {
  return (
    <div>

      <Router>
      <Navbar ></Navbar>
      <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="/bookTickets" element={<BookTickets/>}></Route>
      <Route exact path="/createEvents" element={<CreateEvents/>}></Route>
      <Route exact path="/marketplace" element={<Marketplace/>}></Route>
      <Route exact path="/createNFT" element={<CreateNFT/>}></Route>
      <Route exact path="/completeVote" element={<CompleteVote/>}></Route>
      <Route exact path="/createProposal" element={<CreateProposal/>}></Route>
      <Route exact path="/eventDetails" element={<EventDetails></EventDetails>}></Route>
      <Route exact path="/proposals" element={<Proposal></Proposal>}></Route>
   </Routes>
   <div className='ft'>
   <Footer/></div>
    </Router>
    </div>
  );
}

export default App;
