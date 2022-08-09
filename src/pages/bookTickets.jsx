import logo from "../Events.png";
import { Link } from "react-router-dom";

function BookTickets() {
  return (
    <div>
     <div className="card-box">
      {[1,2,3,4].map((v, ind) => (
        <div className="card card-compact w-96 bg-base-100 shadow-xl im">
          <figure>
            <img src={logo} alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Event_Name</h2>
            <p>Events That make you cool!!</p>
            <div class="card-actions justify-end">
             <Link to="/eventDetails"> <button class="btn btn-primary">Explore!!</button> </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default BookTickets;
