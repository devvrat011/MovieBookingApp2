import React, { useState, useEffect, useContext } from "react";
import context from "../../../Context/context";

const AddTheatre = () => {
	const [approve, setApprove] = useState([]);
	const [pending, setPending] = useState([]);
	const [change,setChange] = useState(false);
	const [change2,setChange2] = useState(false);
	const { list, getTheatre, theatreData } = useContext(context);
	const [id, setId] = useState();
	const [id2, setId2] = useState();
	useEffect(() => {
		const now = async () => {
			if(change){
				const arr = await getTheatre(id);
				console.log(change);
				console.log(arr);
				if (arr){
					const updatedTheatreData = {
						...arr,
						status: true,
					};
					const response = await fetch(`http://localhost:8000/theatre/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(updatedTheatreData),
					});
					setPending(prevPending => prevPending.filter(theater => theater._id !== id));
					setApprove(prevApprove => [...prevApprove, arr])
					const res = await response.json();
					console.log("Approved");
				}
				setChange(false);
			}
		}
		now();
	}, [change]);
	const approveFun = async (idx) => {
		try {
			setId(idx);
			setChange(true);
		}
		catch (e) {
			console.log(e);
		}
	};
	useEffect(() =>  {
		const lamda = async() => {
			if(change2){
				const arr = await getTheatre(id2);
				if (arr) {
					const updatedTheatreData = {
						...arr,
						status: false,
					};
					const response = await fetch(`http://localhost:8000/theatre/${id2}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(updatedTheatreData),
					});
					setApprove(prevApprove => prevApprove.filter(theater => theater._id !== id2));
					setPending(prevPending => [...prevPending, arr])
					const res = await response.json();
					console.log("Deleted");
				}
				setChange2(false);
			}
		}
		lamda();
	},[change2])
	const deapproveFun = async (idx) => {
		try {
			setId2(idx);
			setChange2(true);
		}
		catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		setPending([]);
		setApprove([]);
		list.map((item) => {
			if (item.status == false) {
				setPending(prevPending => [...prevPending, item]);
			}
			else {
				setApprove(prevApprove => [...prevApprove, item]);
			}
		})
	}, [])






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


						{pending.map((item, index) => {
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
										<button className="border-2 rounded-xl" onClick={() => approveFun(item._id)}>
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
							<div key={item._id} className="w-full  flex justify-center gap-4">
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
