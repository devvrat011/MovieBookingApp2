import React, { useEffect, useState } from "react";
import AddTheatre from "../TheatrePage/theatre";
import MovieDescription from '../MovieDes/MovieDesc';
import Navbar from "../Navbars/Navbar";
function App() {
	const [userInput, setUserInput] = useState("");
	const [list, setList] = useState([]);
	const [show,setShow]=useState(true);
	const updateInput = (value) => {
		setUserInput(value);
	};
	const deleteItem =async(id) => {
		try {
			const response = await fetch(`http://localhost:8000/movie/${id}`, {
			  method: 'DELETE',
			  headers: {
				'Content-Type': 'application/json',
			  },
			 
			});
			const res="resources deleted";
			return res;
		}
		catch(e){
			console.log(e);
		}
	};
	// const editItem =async(index) => {
	// 	const editedTodo = prompt("Edit the todo:");
	// 	if (editedTodo !== null && editedTodo.trim() !== "") {
	// 		const updatedList = [...list];
	// 		updatedList[index].value = editedTodo;
	// 		setList(updatedList);


	// 	}
	// 	try {
	// 		const response = await fetch(`http://localhost:3001/movie/${id}`, {
	// 		  method: 'PUT',
	// 		  headers: {
	// 			'Content-Type': 'application/json',
	// 		  },
	// 		  body: JSON.stringify()
	// 		});
		
	// 		const res = await response.json();
	// 		// console.log(res);
	// 		setList(res);
	// 	}
	// 	catch(e){
	// 		console.log(e);
	// 	}
	// };
	
	useEffect(()=>{
		const find=async()=>{
			try {
				const response = await fetch('http://localhost:8000/movie', {
				  method: 'GET',
				  headers: {
					'Content-Type': 'application/json',
				  },
				 
				});
			
				const res = await response.json();
				// console.log(res);
				setList(res);
			}
			catch(e){
				console.log(e);
			}
		}
		find();
	})

	return (
		<div>
			<Navbar/>
		<div className="container mx-auto p-4">
			  
			<h1 className="text-center text-2.5xl font-bold mb-4">ADMIN</h1>
			<hr className="mb-4" />
			<div className="border-2 w-full h-10 flex justify-center gap-5">
				<div className=" border-2 rounded-xl text-center w-[45%] cursor-pointer" onClick={()=>setShow(true)}>
					Movies
				</div>
				<div className=" border-2 rounded-xl text-center w-[45%] cursor-pointer" onClick={()=>setShow(false)}>
					Theatres
				</div>
			</div>
			{show?
			<div>
				<div className="md:col-span-5 md:col-start-4">
				<div className="mb-3">
					<MovieDescription list={list} setList={setList}/>
				</div>
			</div>
			<div className="md:col-span-5 md:col-start-4">
				<ul className="list-group ">
					{(list.length) ? <div className="flex px-5 py-2">
						<div className="w-[6%] text-center flex flex-col justify-center ">
							Poster
						</div>
						<div className="w-[20%] text-center flex flex-col justify-center ">
							Movie Name
						</div>
						<div className="w-[20%] text-center flex flex-col justify-center ">
							Description
						</div>
						<div className="w-[8%]  text-center flex flex-col justify-center">
							Duration
						</div>
						<div className="w-[8%] text-center flex flex-col justify-center  ">
							Genre
						</div>
						<div className="w-[8%] text-center flex flex-col justify-center  ">
							Language
						</div>
						<div className="w-[15%] text-center flex flex-col justify-center  ">
							Release Date
						</div>
					</div> : <></>}
					{list.map((item, index) => (
						<li
							className="list-group-item border-2 border-black rounded-2xl my-1 px-5 py-2 flex justify-between  d-flex justify-content-between"
							key={item._id}
						>
							<div className="flex w-full ">
								<div className="w-[6%] text-center flex flex-col justify-center">
									<img src={item.url} className="h-12 w-[80%] mx-auto "/>
								</div>
								<div className="w-[20%] text-center flex flex-col justify-center">
									{item.name}
								</div>
								<div className="w-[20%] text-center flex flex-col justify-center">
									{item.description}
								</div>
								<div className="w-[8%] text-center flex flex-col justify-center">
									{item.duration}
								</div>
								<div className="w-[8%] text-center flex flex-col justify-center">
									{item.genre}
								</div>
								<div className="w-[8%] text-center flex flex-col justify-center">
									{item.language}
								</div>
								<div className="w-[15%] text-center flex flex-col justify-center">
									{item.date}
								</div>

								<div className="flex mx-auto gap-3">
								<button
									className="btn flex flex-col justify-center btn-light  bg-blue-700 text-white px-2"
									onClick={() => deleteItem(item._id)}
								>
									Delete
								</button>
								<button
									className="btn flex flex-col justify-center btn-light  bg-blue-700 text-white px-2 "
									// onClick={() => editItem(item._id)}
								>
									Edit
								</button>
							</div>
							</div>
							
						</li>
					))}
				</ul>
			</div>
			</div>:
				<AddTheatre/>
			}
			
		</div>
		</div>
	);
}

export default App;
