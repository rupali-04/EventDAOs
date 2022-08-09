
function EventDetails() {
    return (
      <div className="App">
        <h1 class="text-5xl font-bold">Event Name</h1>
        <p class="py-6">Mint your Event_NFTs to become part of our Events!!</p>
        <div className="t-2">
        <input className="input input-bordered input-md input-primary w-full max-w-xs in-1" disabled value="0.001 MATIC"></input>
        <button class="btn btn-primary">Mint Event NFTs Now !!</button>
        </div>
      </div>
    );
  }
  
  export default EventDetails;
  