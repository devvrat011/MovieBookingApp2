import React from "react";
import { useState } from "react";

const Booking=()=>{
    return(
        <div className="shadow-2xl rounded-2xl text-white bg-gradient-to-br from-[#2e32f4] from-30%    to-[#49a1ed] to-80% w-[50%] border-black flex h-44">
            <div className=" w-[60%]  px-8">
                <div className="font bold  w-full py-2 font-bold text-3xl">
                    TITLE
                </div>
                <div className="w-full   ">
                    Theatres
                </div>
                <div className="w-full   ">
                    Date & Time
                </div>
                <div className="w-full   ">
                    Amount
                </div>
                <div className="w-full   ">
                   Boking Id
                </div>
            </div>
            <div className="w-[40%] p-2 ">
                <div className="h-[80%] border-2 rounded-xl bg-white ">
                    
                </div>
                <div className="h-[20%] ">
                    Seats Booked
                </div>
                
            </div>
        </div>
    )
}
export default Booking;