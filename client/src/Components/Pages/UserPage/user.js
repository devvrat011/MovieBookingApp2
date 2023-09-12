import React, { useState } from "react";
import Navbar from "../Navbars/Navbar";
import Theatreuser from "./Theatreuser";
import Booking from "./Bookings";
function User() {
	const [show,setShow]=useState(true);

	return (
		<div>
			<Navbar/>
		<div className="container mx-auto p-4">
			  
			<h1 className="text-center text-2.5xl font-bold mb-4">USER</h1>
			<hr className="mb-4" />
			<div className="border-2 w-full h-10 flex justify-center gap-5 mb-4">
				<div className=" border-2 rounded-xl text-center w-[45%] cursor-pointer" onClick={()=>setShow(true)}>
					Movies
				</div>
				<div className=" border-2 rounded-xl text-center w-[45%] cursor-pointer" onClick={()=>setShow(false)}>
					Theatres
				</div>
			</div>
			{show?
			<div>
                <Booking/>
			</div>:
				<Theatreuser/>
			}
			
		</div>
		</div>
	);
}

export default User;
