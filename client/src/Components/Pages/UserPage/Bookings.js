import React, { useContext, useEffect } from "react";
import { useState } from "react";
import context from "../../../Context/context";

const Booking=()=>{
    const {user} = useContext(context);
    const [listdata,setListData] = useState();
    useEffect( () => {
        const fetchdata = async () => {
            try {
                const fetchedData = [];
                const response = await fetch(`http://localhost:8000/api/${user?._id}/booking`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const res = await response.json();
                fetchedData.push(res.bookingOwned);
                setListData(fetchedData[0]);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchdata();
    },[]);
    return(
        <div >
            {
                listdata?.map((items,id) => (
                    <div className="shadow-2xl rounded-2xl text-white bg-gradient-to-br from-[#2e32f4] from-30%    to-[#49a1ed] to-80% w-[50%] border-black flex h-44 my-5">
                        <div className=" w-[60%]  px-8">
                        <div className="font bold  w-full py-2 font-bold text-3xl">
                        </div>
                        <div className="w-full   ">
                            {items.name}
                        </div>
                        <div className="w-full   ">
                            {items.date}
                        </div>
                        <div className="w-full   ">
                            {items.amount}
                        </div>
                    </div>
                    <div className="w-[40%] p-2 ">
                        <div className="h-[80%] border-2 rounded-xl bg-white ">
                            
                        </div>
                        <div className="h-[20%] flex gap-10">
                            Seats Booked
                            {
                                items.seats.map((it,id) => (
                                    <div>{it}</div>
                                ))
                            }
                        </div>
                    </div>
                    </div>
                ))
            }
        </div>
    )
}
export default Booking;