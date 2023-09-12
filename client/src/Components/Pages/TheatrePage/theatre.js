import React, { useState, useEffect, useContext } from "react";
import context from "../../../Context/context";

const AddTheatre = () => {
  const [approve, setApprove] = useState([]);
  const {list} = useContext(context);
  
  const approveFun =async(idx) => {
	try {
		const response = await fetch(`http://localhost:8000/theatre/${idx}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(list),
		});
		const res = await response.json();
	}
	catch (e) {
		console.log(e);
	}
  };

  const deapproveFun = (idx) => {
    let updatedApprove = approve.filter((_, index) => index !== idx);
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


          {list.map((item, index) => {
            return (
            
			<div key={index} className="w-full  flex justify-center gap-4">
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.name}
			</div>
			<div className=" w-[25%] text-center flex flex-col justify-center h-10">
				{item.address}	
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.number}
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.email}
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				Pending
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
			<button className="border-2 rounded-xl" onClick={() => approveFun(index,item._id)}>
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
          {approve.map((item) => {
            return (
			<div className="w-full  flex justify-center gap-4">
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.name}
			</div>
			<div className=" w-[25%] text-center flex flex-col justify-center h-10">
				{item.address}	
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.number}
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				{item.email}
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
				Approved
			</div>
			<div className=" w-[16%] text-center flex flex-col justify-center h-10">
			<button className="border-2 rounded-xl" onClick={() => deapproveFun(item._id)}>
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
