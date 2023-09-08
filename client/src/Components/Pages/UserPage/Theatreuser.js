import React from 'react'
import { useState } from 'react';
import Popup from 'reactjs-popup';
import CloseIcon from '@mui/icons-material/Close';

function Theatreuser() {
    const [data, setData] = useState({ name: "", address: "", phone: "", email: "", status: "", action: "", });
    const [id, setId] = useState(0);
    const [userInput, setUserInput] = useState("");
	const [list, setList] = useState([]);
	const [show,setShow]=useState(true);
    const [open, setOpen] = useState(false);
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
    const save = () => {
        if (data.name && data.address && data.phone && data.email) {
            setData(prev => {
                return {...prev,id:id};
            })
            let temp = list.slice();
            temp.push(data);
            setList(temp);
            setId(prev => prev + 1);
            setData({ id: id });
        }
    }
    const keyDownHandler = (event) => {
        if (event.key === 'Enter') {
            if (data.name && data.address && data.phone && data.email){
                save();
                setOpen(false);
            }
        }
    }
    const closeModal = () => {
        setData({ id: id });
        setOpen(o => !o);
    }
    document.addEventListener('keydown',keyDownHandler)
    return (
        <>
            
            <button className="border-2 rounded-xl bg-blue-500 text-white p-2" onClick={() => setOpen(o => !o)}>Add Theatre</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} className='moviedesc-modal' modal nested>
                {
                    close => (
                        <div className='flex gap-4 w-[90%] md:w-full flex-col p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-lg'>
                            <div className="absolute left-[90%] top-[4%]">
                                <button onClick=
                                    {() => {
                                        close();
                                        setId(prev => prev + 1);
                                        setData({ id: id });
                                    }}>
                                    <CloseIcon/>
                                </button>
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <div className="flex justify-between">Name
                                </div>
                                <input onChange={(e) => setData({ ...data, name: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg min-w-full" type="text" />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <div>Address</div>
                                <textarea onChange={(e) => setData({ ...data, address: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg" rows="4" cols="56" />
                            </div>
                            <div className="">
                                <div className="flex gap-2 flex-col">
                                    <div>Phone Number</div>
                                    <input onChange={(e) => setData({ ...data, phone: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg" type="text" />
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <div>Email</div>
                                    <input className='p-1 border-2 border-zinc-400 rounded-lg' type='text' onChange={(e) => {
                                        setData({...data, email: e.target.value})
                                    }}/>
                                </div>
                            </div>
                            <div className=" flex justify-between">
                                <div></div>
                                <div className="flex gap-3">
                                    <div className="cursor-pointer " onClick={() => {
                                        close();
                                        setId(prev => prev + 1);
                                        setData({ id: id });
                                    }}>
                                        Cancel
                                    </div>
                                    <div className="cursor-pointer" onClick={() => {
                                        save()
                                        ; close();
                                    }}>
                                        Save
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Popup>
            <div className="md:col-span-5 md:col-start-4">
				<ul className="list-group ">
					{(list.length) ? <div className="flex px-5 py-2">
						<div className="w-[10%] text-center flex flex-col justify-center ">
							Name
						</div>
						<div className="w-[20%] text-center flex flex-col justify-center ">
							Address
						</div>
						<div className="w-[20%] text-center flex flex-col justify-center ">
							Phone Number
						</div>
						<div className="w-[20%]  text-center flex flex-col justify-center">
							Email
						</div>
						<div className="w-[20%] text-center flex flex-col justify-center  ">
							Status
						</div>
                        <div className='w-[10%] text-center'>
                            Action
                        </div>
					</div> : <></>}
                {list.map((item, index) => (
                    <li
                        className="list-group-item border-2 border-black rounded-2xl my-1 px-5 py-2 flex justify-between  d-flex justify-content-between"
                        key={index}
                    >
                        <div className="flex w-full ">
                            <div className="w-[10%] text-center flex flex-col justify-center ">
                                {item.name}
                            </div>
                            <div className="w-[20%] text-center flex flex-col justify-center ">
                                {item.address}     
                            </div>
                            <div className="w-[20%] text-center flex flex-col justify-center ">
                                {item.phone}
                            </div>
                            <div className="w-[20%] text-center flex flex-col justify-center">
                                {item.email}
                            </div>
                            <div className="w-[20%] text-center flex flex-col justify-center">
                                Pending
                            </div>
                            <div className="flex mx-auto gap-3">
                                <button
                                    className="btn flex flex-col justify-center btn-light  bg-blue-700 text-white px-2"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn flex flex-col justify-center btn-light  bg-blue-700 text-white px-2 "
                                    onClick={() => editItem(index)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </> 
    )
}

export default Theatreuser;