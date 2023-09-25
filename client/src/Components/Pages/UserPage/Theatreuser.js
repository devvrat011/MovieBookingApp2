import React, { useEffect,useContext } from 'react'
import { useState } from 'react';
import Popup from 'reactjs-popup';
import CloseIcon from '@mui/icons-material/Close';
import context from '../../../Context/context';
import Shows from './Shows';

function Theatreuser() {

    const {user,AddTheatre,deleteTheatre,updateUser} = useContext(context);
    const [data, setData] = useState({ name: "", address: "", number: "", email: "" });
    const [open, setOpen] = useState(false);
    const [listdata,setListData]=useState([]);

    const deleteItem = async (id) => {
        try {
            deleteTheatre(id);
            if(user){
                user.theatreOwned = user.theatreOwned.filter(theatreId => theatreId !== id);
                const deletedUserData = {
                    ...user,
                    theatreOwned: user.theatreOwned,
                };
                const updateUserResponse=await updateUser(user._id,deletedUserData)
                setListData(prevListData => prevListData.filter(theater => theater._id !== id));
                console.log(await updateUserResponse.json());
            }  
        }
        catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const User = async () => {
            try {
                const size=await user?.theatreOwned;
                const fetchedData = [];
                if(size?.length>0){
                    for (const id of size) {
                        const response = await fetch(`http://localhost:8000/theatre/${id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        const res = await response.json();
                        fetchedData.push(res);
                    }
                    setListData(fetchedData);  
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        User();
    },[])
  
    const save = async () => {
        
        if (data.name && data.email && data.address && data.number) {
            try {
                const res=await AddTheatre(data);
                console.log(res);  
                user.theatreOwned.push(res.newTheatre._id);
                const updatedUserData = {
                    ...user,
                    theatreOwned: user.theatreOwned,
                };
                const updateUserResponse=await updateUser(user._id,updatedUserData)
                console.log(await updateUserResponse.json());
                setListData(prevListData => [...prevListData, res.newTheatre]);   
            }
            
            catch (e) {
                console.log(e);
            }
        }
    }
    const closeModal = () => {
        setOpen(o => !o);
    }
    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            save();
            closeModal();
        }
    }
    return (
        <>
            <button className="border-2 rounded-xl bg-blue-500 text-white p-2" onClick={() => setOpen(o => !o)}>Add Theatre</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} className='moviedesc-modal' modal nested>
                {
                    close => (
                        <div onKeyDown={(e) => onKeyDownHandler(e)} className='flex gap-4 w-[90%] md:w-full flex-col p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-lg'>
                            <div className="absolute left-[90%] top-[4%]">
                                <button onClick=
                                    {() => {
                                        close();
                                    }}>
                                    <CloseIcon />
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
                                    <input onChange={(e) => setData({ ...data, number: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg" type="text" />
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <div>Email</div>
                                    <input className='p-1 border-2 border-zinc-400 rounded-lg' type='text' onChange={(e) => {
                                        setData({ ...data, email: e.target.value })
                                    }} />
                                </div>
                            </div>
                            <div className=" flex justify-between">
                                <div></div>
                                <div className="flex gap-3">
                                    <div className="cursor-pointer " onClick={() => {
                                        close();
                                    }}>
                                        Cancel
                                    </div>
                                    <div className="cursor-pointer" onClick={() => {
                                        save();
                                        close();
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
                    {(listdata?.length) ? <div className="flex px-5 py-2">
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
                    {listdata?.map((item, index) => (
                        <li className="list-group-item border-2 border-black rounded-2xl my-1 px-5 py-2 flex justify-between  d-flex justify-content-between"
                            key={index}>
                            <div className="flex w-full ">
                                <div className="w-[10%] text-center flex flex-col justify-center ">
                                    {item?.name}
                                </div>
                                <div className="w-[20%] text-center flex flex-col justify-center ">
                                    {item?.address}
                                </div>
                                <div className="w-[20%] text-center flex flex-col justify-center ">
                                    {item?.number}
                                </div>
                                <div className="w-[20%] text-center flex flex-col justify-center">
                                    {item?.email}
                                </div>
                                <div className="w-[20%] text-center flex flex-col justify-center">
                                    {item?.status ? "Approved":"Pending"}
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
                                        // onClick={() => editItem(index)}
                                    >
                                        Edit
                                    </button>
                                    <Shows/>
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