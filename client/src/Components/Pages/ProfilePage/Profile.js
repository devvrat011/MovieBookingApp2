import React, { useState } from "react";
import AddTheatre from "../../theatre";

function App() {
	const [userInput, setUserInput] = useState("");
	const [list, setList] = useState([]);
	const [show,setShow]=useState(true);
	const updateInput = (value) => {
		setUserInput(value);
	};

	const addItem = () => {
		if (userInput !== "") {
			const newItem = {
				id: Math.random(),
				value: userInput,
			};
			setList([...list, newItem]);
			setUserInput("");
		}
	};

	const deleteItem = (id) => {
		const updatedList = list.filter((item) => item.id !== id);
		setList(updatedList);
	};

	const editItem = (index) => {
		const editedTodo = prompt("Edit the todo:");
		if (editedTodo !== null && editedTodo.trim() !== "") {
			const updatedList = [...list];
			updatedList[index].value = editedTodo;
			setList(updatedList);
		}
	};

	return (
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
					<button
						className="border-4 bg-blue-800 text-white px-4 py-2 mt-8 "
						onClick={addItem}
					>
						ADD Movie
					</button>
				</div>
			</div>
			<div className="md:col-span-5 md:col-start-4">
				<ul className="list-group ">
					{list.map((item, index) => (
						<li
							className="list-group-item border-2 border-black rounded-2xl my-1 px-5 py-2 flex justify-between  d-flex justify-content-between"
							key={index}
						>
							{item.value}
							<div>
								<button
									className="btn btn-light mr-2 bg-blue-700 text-white px-2 py-1"
									onClick={() => deleteItem(item.id)}
								>
									Delete
								</button>
								<button
									className="btn btn-light  bg-blue-700 text-white px-2 py-1"
									onClick={() => editItem(index)}
								>
									Edit
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
			</div>:
				<AddTheatre/>
			}
			
		</div>
	);
}

export default App;
