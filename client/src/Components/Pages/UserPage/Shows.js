import React, { useEffect, useContext } from 'react'
import { useState } from 'react';
import Popup from 'reactjs-popup';
import CloseIcon from '@mui/icons-material/Close';
import './shows.css';
import context from '../../../Context/context';

function Shows() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [data, setData] = useState({ showname: "", date: "", time: "", movie: "",ticketPrice: "", totalSeat: "" });
    const [listdata,setListData]=useState([]);
    const {addShows,clickid,getTheatre,updateTheatre,getShows,setclickid} = useContext(context);
    const [isLoading,setisLoading]=useState();
    const closeModal = () => {
        setOpen(false);
        setListData();
    }
    const closeModal2 = () => {
        setOpen2(false);
        setListData();
    }
    useEffect( () => {
        const fetchbtn = async() => {
            if(clickid){
                try {

                    setisLoading(true); 

                    const fetchedData = [];
                    const response = await fetch(`http://localhost:8000/theatre/${clickid}/shows`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const res = await response.json();
                    console.log(res);
                    fetchedData.push(res.ShowsOwned);
                    setListData(fetchedData[0]);
                    setisLoading(false);
                    setclickid();
                    
                }
                catch (err) {
                    console.log(err);
                    setisLoading(false)
                }
            }
        }
        fetchbtn();
    },[clickid])

    const save = async() => {
        const res  = await addShows(data);
        const theatre = await getTheatre(clickid);
        theatre.shows.push(res.newShow._id);
        await updateTheatre(clickid,theatre);
        const show = await getShows(res.newShow._id);
        setListData(prevListData => [...prevListData, show]);
    }
    return (
        <>
            <button className="border-2 rounded-xl bg-blue-500 text-white p-2" onClick={() => {setOpen(true);}}>Shows</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} className='moviedesc-modal' modal nested>
                {
                    close => (
                        <div className='flex flex-col gap-4 my-3 w-[90%] md:w-full px-4  mx-auto rounded-2xl '>
                            <div className="flex justify-between">
                                <div>Theatre Name</div>
                                <button onClick=
                                    {() => {
                                        close();
                                    }}>
                                    <CloseIcon/>
                                </button>
                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    SHOWS
                                </div>
                                <button className="border-2 rounded-xl bg-blue-500 text-white p-2" onClick={() => {setOpen2(true); setOpen(false);}}>Add Shows</button>
                            </div>
                            <div className="md:col-span-5 md:col-start-4">
                            <ul className="list-group ">

                                {isLoading ? (
                                        <div>Loading...</div>
                                    ):(listdata?.length) ? <div className="flex px-5 py-2">
                                    <div className="w-[10%] text-center flex flex-col justify-center ">
                                        ShowName
                                    </div>
                                    <div className="w-[20%] text-center flex flex-col justify-center ">
                                        Date
                                    </div>
                                    <div className="w-[20%] text-center flex flex-col justify-center ">
                                        Time
                                    </div>
                                    <div className="w-[20%]  text-center flex flex-col justify-center">
                                        Movie
                                    </div>
                                    <div className="w-[20%] text-center flex flex-col justify-center  ">
                                        ticketPrice
                                    </div>
                                    <div className='w-[10%] text-center'>
                                        totalSeat
                                    </div>
                                </div> : <></>}
                                {isLoading ? (
                                        <div></div>
                                    ):listdata?.map((item, index) => (
                                    <li className="list-group-item border-2 border-black rounded-2xl my-1 px-5 py-2 flex justify-between  d-flex justify-content-between"
                                        key={index}>
                                        <div className="flex w-full ">
                                            <div className="w-[10%] text-center flex flex-col justify-center ">
                                                {item?.showname}
                                            </div>
                                            <div className="w-[20%] text-center flex flex-col justify-center ">
                                                {item?.date}
                                            </div>
                                            <div className="w-[20%] text-center flex flex-col justify-center ">
                                                {item?.time}
                                            </div>
                                            <div className="w-[20%] text-center flex flex-col justify-center ">
                                                {item?.movie}
                                            </div>
                                            <div className="w-[20%] text-center flex flex-col justify-center">
                                                {item?.ticketPrice}
                                            </div>
                                            <div className="w-[10%] text-center flex flex-col justify-center">
                                                {item?.totalSeat}
                                            </div>
                                            {/* <div className="flex mx-auto gap-3">
                                                <button
                                                    className="btn flex flex-col justify-center btn-light  bg-blue-700 text-white px-2"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="btn flex flex-col justify-center btn-light  bg-blue-700 text-white px-2 "
                                                    // onClick={() => editItem(index)}
                                                >
                                                    Edit
                                                </button>
                                            </div> */}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    )
                }
            </Popup>
            <Popup open={open2} closeOnDocumentClick onClose={closeModal2} style={{width:"80%"}} modal nested>
            {
                close => (
                    <div className='flex z-20 gap-4 w-[100%] md:w-full flex-col mx-auto p-4 rounded-2xl '>
                        <div className="flex justify-between border-b-2">
                            <div className=''>Theatre</div>
                            <button onClick=
                                {() => {
                                    close();
                                    setOpen(true);
                                }}>
                                <CloseIcon/>
                            </button>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='font-bold'>
                                ADD SHOW
                            </div>
                            <div className='flex w-[100%] justify-between gap-3'>
                                <div className='flex-col w-[35%]'>
                                    <div>
                                        Show Name
                                    </div>
                                    <input onChange={(e) => setData({...data, showname: e.target.value})} type='text' className='border-2 rounded-lg w-[100%]'/>
                                </div>
                                <div className='flex-col w-[35%]'>
                                    <div>
                                        Date
                                    </div>
                                    <input onChange={(e) => setData({...data, date: e.target.value})} type='date' className='border-2 rounded-lg w-[100%]'/>
                                </div>
                                <div className='flex-col w-[35%]'>
                                    <div>
                                        Time
                                    </div>
                                    <input onChange={(e) => setData({...data, time: e.target.value})} type='time' className='border-2 rounded-lg w-[100%]'/>
                                </div>
                            </div>
                            <div className='flex w-[100%] justify-between gap-3'>
                                <div className='flex-col w-[35%]'>
                                    <div>
                                        Movie
                                    </div>
                                    <input onChange={(e) => setData({...data, movie: e.target.value})} type='text' className='border-2 rounded-lg w-[100%]'/>
                                </div>
                                <div className='flex-col w-[35%]'>
                                    <div>
                                        Ticket Price
                                    </div>
                                    <input onChange={(e) => setData({...data, ticketPrice: e.target.value})} type='number' className='border-2 rounded-lg w-[100%]'/>
                                </div>
                                <div className='flex-col w-[35%]'>
                                    <div>
                                        Total Seat
                                    </div>
                                    <input onChange={(e) => setData({...data, totalSeat: e.target.value})} type='number' className='border-2 rounded-lg w-[100%]'/>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => {close(); setOpen(true);}}  className='cursor-pointer'>
                                    Cancel
                                </button>
                                <button onClick={ () => {save(); close(); setOpen(true);}} className='cursor-pointer'>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </Popup>
        </>
    )
}

export default Shows