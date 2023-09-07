
import React, { useState } from "react";

let data = [
  {
    id: "1",
    name: "theatre1",
    address: "hdfdjf",
	phone: "hdfdjf",
	email: "hdfdjf",
	status: false,
  },
  {
    id: "1",
    name: "theatre1",
    address: "hdfdjf",
	phone: "hdfdjf",
	email: "hdfdjf",
	status: false,
  },
  {
    id: "1",
    name: "theatre1",
    address: "hdfdjf",
	phone: "hdfdjf",
	email: "hdfdjf",
	status: false,
  },
  {
    id: "1",
    name: "theatre1",
    address: "hdfdjf",
	phone: "hdfdjf",
	email: "hdfdjf",
	status: false,
  },
  {
    id: "1",
    name: "theatre1",
    address: "hdfdjf",
	phone: "hdfdjf",
	email: "hdfdjf",
	status: false,
  },
  {
    id: "1",
    name: "theatre1",
    address: "hdfdjf",
	phone: "hdfdjf",
	email: "hdfdjf",
	status: false,
  },

];

const AddTheatre = () => {
  const [approve, setApprove] = useState([]);
  
  const approveFun = (idx) => {
    
    const itemToApprove = data[idx];
    const updatedData = data.filter((_, index) => index !== idx);
	itemToApprove.status=true;
    setApprove((prevApprove) => [...prevApprove, itemToApprove]);

    data = updatedData;
  };

  const deapproveFun = (idx) => {
    const itemToDeapprove = approve[idx];
    const updatedApprove = approve.filter((_, index) => index !== idx);
    setApprove(updatedApprove);
    
  };

  return (
    <div>
    
      <div className="w-full h-min p-2 mt-[5%]">
        <div className="font-bold text-lg">Requests</div>
        <div>
			<div className="w-full border-2	 flex justify-center gap-4">
				<div className=" w-[16%] text-center flex flex-col justify-center h-10">
					Name
				</div>
				<div className=" w-[25%] text-center flex flex-col justify-center h-10">
					Address
				</div>
				<div className=" w-[16%] text-center flex flex-col justify-center h-10">
					Phone
				</div>
				<div className=" w-[16%] text-center flex flex-col justify-center h-10">
					Email
				</div>
				<div className=" w-[16%] text-center flex flex-col justify-center h-10">
					Status
				</div>
				<div className=" w-[16%] text-center flex flex-col justify-center h-10">
					
				</div>
			</div>
			<div className="border-2 max-h-32 overflow-y-auto">


          {data.map((item, index) => {
            return (
            
			<div key={index} className="w-full  flex justify-center gap-4">
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.name}
			</div>
			<div className=" w-[25%] text-center flex flex-col justify-center h-10">
				{item.address}	
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.phone}
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.email}
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.status?"Approved":"Pending"}
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
			<button className="border-2 rounded-xl" onClick={() => approveFun(index)}>
                  Approve
            </button>
			</div>
			
		</div>
		
            );
          })}
		  </div>
        </div>
      </div>
      <div className="w-full h-min  p-2">
        <div className="font-bold text-lg">Listed Theatres</div>
		<div className="w-full border-2	 flex justify-center gap-4">
				<div className=" w-[16%] text-center flex flex-col justify-center h-10">
					Name
				</div>
				<div className=" w-[25%] text-center flex flex-col justify-center h-10">
					Address
				</div>
				<div className=" w-[16%] text-center flex flex-col justify-center h-10">
					Phone
				</div>
				<div className=" w-[16%] text-center flex flex-col justify-center h-10">
					Email
				</div>
				<div className=" w-[16%] text-center flex flex-col justify-center h-10">
					Status
				</div>
				<div className=" w-[16%] text-center flex flex-col justify-center h-10">
					
				</div>
			</div>
        <div className="border-2 max-h-32 overflow-y-auto">
          {approve.map((item, index) => {
            return (
            
			<div key={index} className="w-full  flex justify-center gap-4">
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.name}
			</div>
			<div className=" w-[25%] text-center flex flex-col justify-center h-10">
				{item.address}	
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.phone}
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.email}
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.status?"Approved":"Pending"}
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
			<button className="border-2 rounded-xl" onClick={() => deapproveFun(index)}>
                  Deapprove
            </button>
			</div>
		</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddTheatre;

import React from "react"

const data=[
	{
		id:"1",
		name:"theatre1",
		location:"hdfdjf",
	},
	{
		id:"2",
		name:"theatre2",
		location:"hdfdjf",
	},
]
const AddTheatre=()=>{
    return(
        <div>
			<button
				className="border-4 bg-blue-800 text-white px-4 py-2 mt-8 "
			>
				ADD Theatres
					</button>
			<div className="w-full h-min border-2 p-2">
				<div className="font-bold text-lg">
					Requests
				</div>
				<div>
					{data.map((item)=>{
						return(
							<div key={item.id} className="flex justify-evenly">
								<div>
									{item.name}
								</div>
								<div>
									{item.location}
								</div>
								<button className="border-2">
									Approve
								</button>
							</div>
						)
					})}

					
				</div>
			</div>
			<div className="w-full h-min border-2 p-2">
				<div className="font-bold text-lg">
					Listed Theatres
				</div>
				<div>

				</div>
			</div>
        </div>
    )
}
export default AddTheatre;

