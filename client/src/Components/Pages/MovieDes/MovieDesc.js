import React, { useEffect } from 'react'
import Popup from 'reactjs-popup';
import '../ProfilePage/Profile.css';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function MovieDes({ list, setList }) {
    const [data, setData] = useState({ name: "", description: "", duration: "", language: "", date: "", genre: "", url: "" });
    const [open, setOpen] = useState(false);

    const save = async () => {
        if (data.name && data.description && data.duration && data.date && data.url) {
            console.log(typeof (data.duration));
            console.log(data);
            try {
                const response = await fetch('http://localhost:8000/movie/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const res = await response.json();
                console.log(res);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    const closeModal = () => {
        setOpen(o => !o);
    }
    return (
        <>
            <button className="border-2 rounded-xl bg-blue-500 text-white p-2" onClick={() => setOpen(o => !o)}>Add Movie</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} className='moviedescription-modal' modal nested>
                {
                    close => (
                        <div className='flex gap-4 w-[90%] md:w-full flex-col p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-lg'>

                            <div className="absolute left-[90%] top-[4%]">
                                <div></div>
                                <button onClick=
                                    {() => {
                                        close();
                                    }}>
                                    <CloseIcon style={{ color: "grey" }} />
                                </button>
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <div className="flex justify-between">Movie Name
                                </div>
                                <input onChange={(e) => setData({ ...data, name: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg min-w-full" type="text" />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <div>Movie Description</div>
                                <textarea onChange={(e) => setData({ ...data, description: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg" rows="4" cols="56" />
                            </div>
                            <div className="flex justify-between ">
                                <div className="flex gap-2 flex-col">
                                    <div>Movie Duration</div>
                                    <input onChange={(e) => setData({ ...data, duration: Number(e.target.value) })} className="p-1 border-2 border-zinc-400 rounded-lg" type="number" />
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <div>Language</div>
                                    <select onChange={(e) => setData({ ...data, language: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg">
                                        <option>Choose..</option>
                                        <option>English</option>
                                        <option>Hindi</option>
                                    </select>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <div>Movie Release Date</div>
                                    <input onChange={(e) => setData({ ...data, date: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg" type="date" />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex gap-2 flex-col">
                                    <div>Genre</div>
                                    <select onChange={(e) => setData({ ...data, genre: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg">
                                        <option>Choose..</option>
                                        <option >Action</option>
                                        <option >Romance</option>
                                        <option >Drama</option>
                                        <option >Comedy</option>
                                    </select>
                                </div>
                                <div className=" flex gap-2 flex-col">
                                    <div>Poster URL</div>
                                    <input onChange={(e) => setData({ ...data, url: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg w-80" type="url" />
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
        </>
    )
}

export default MovieDes