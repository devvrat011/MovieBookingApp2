import React, { useEffect,useContext } from 'react'
import { useState } from 'react';
import Popup from 'reactjs-popup';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import context from '../../../Context/context';
import Shows from './Shows';


function Theatreuser() {

    const {user,getStates,updateState,AddTheatre,deleteTheatre,updateUser,setclickid,getState} = useContext(context);
    const [data, setData] = useState({ name: "", address: "", number: "", email: "",state: "" ,region: "",location:{}});
    const [open, setOpen] = useState(false);
    const [listdata,setListData]=useState([]);
    const showall=(id)=>{
        setclickid(id);
    }
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
                const fetchedData = [];
                const response = await fetch(`http://localhost:8000/api/${user?._id}/theatres`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const res = await response.json();
                
                fetchedData.push(res.theatersOwned);
                setListData(fetchedData[0]);
            }
            catch (e) {
                console.log(e);
            }
        }
        User();
    },[]);
    const [check,setCheck]=useState(false);
   
   useEffect(() => {
        if(check){
            const find = async() => {
                const res=await AddTheatre(data);
                console.log(res);
                user.theatreOwned.push(res?.newTheatre._id);
                const updatedUserData = {
                    ...user,
                    theatreOwned: user.theatreOwned,
                };
                const updateUserResponse=await updateUser(user._id,updatedUserData)
                console.log(await updateUserResponse.json());
                setListData(prevListData => [...prevListData, res?.newTheatre]);
                const stateById=await getState(data.state);
                stateById.theatres.push(res?.newTheatre._id);
                const updatedStateData = {
                    ...stateById,
                    theatres: stateById.theatres,
                };
                const updateStateResponse=await updateState(stateById._id,updatedStateData)
                console.log(await updateStateResponse.json());
            }
            find();
        }
   },[check])

    const updateData = (newData) => {
        setData({ ...data, ...newData });
        setCheck(true);
      };
      const save = async () => {
        const APIKEY="fdea282050c20d0db06fd5af5caf9945";
        if (data.name && data.email && data.address && data.region && data.number && data.state) {
            try {
                await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.region}&appid=${APIKEY}`)
                .then(response=>response.json())
                .then(data =>{
                const newLatLng = { lat: data.coord.lat , long:data.coord.lon };
                updateData({ location: newLatLng });
                }); 
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

    const [stateLoc,setStateLoc]=useState([]);
    useEffect(()=>{
        const get=async()=>{
            const res=await getStates();
            setStateLoc(res);
        }
        get();
    },[check])
    return (
        <>
            <button className="border-2 rounded-xl bg-blue-500 text-white p-2" onClick={() => setOpen(o => !o)}>Add Theatre</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} className='moviedesc-modal' style={{width:"80%"}} modal nested>
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
                                <div>Region</div>
                                <input onChange={(e) => setData({ ...data, region: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg" type="text"  />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <div>City</div>
                                <input onChange={(e) => setData({ ...data, address: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg" type="text"  />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <div>State</div>
                                <select onChange={(e) => setData({ ...data, state: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg min-w-full">
                                <option>choose State...</option>
                                    {
                                        stateLoc.map((item,idx)=>(
                                            <option value={item._id}>{item.name}</option>
                                        ))
                                    }
                            
                                </select>
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
                                <div className="flex mx-auto gap-1 w-[10%]">
                                    <button
                                        className="btn flex flex-col justify-center btn-light text-black "
                                        onClick={() => deleteItem(item._id)}
                                    >
                                        <DeleteIcon/>
                                    </button>
                                    <button
                                        className="btn flex flex-col justify-center btn-light text-black"
                                    >
                                        <EditIcon/>
                                    </button>
                                    {
                                        (item?.status) ? (
                                            <button onClick={()=>showall(item._id)}>
                                                <Shows/>
                                            </button>
                                        ) : (
                                            <></>
                                        )
                                    }
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