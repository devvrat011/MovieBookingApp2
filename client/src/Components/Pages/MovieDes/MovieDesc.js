import React, { useEffect } from 'react'
import Popup from 'reactjs-popup';
import '../ProfilePage/Profile.css';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
// import 'reactjs-popup/dist/index.css';

function MovieDes({ list, setList }) {
    const [data, setData] = useState({ name: "", desc: "", duration: "", lang: "", date: "", genre: "", url: "", });
    const [id, setId] = useState(0);
    const [open, setOpen] = useState(false);

    const save = () => {
        if (data.name && data.desc && data.duration && data.date && data.url) {
            setData(prev => { return { ...prev, id: id } });
            let temp = list.slice();
            temp.push(data);
            setList(temp);
            setId(prev => prev + 1);
            setData({ id: id });
        }

    }

    const closeModal = () => {
        setData({ id: id });
        setOpen(o => !o);
    }

    return (
        <>
            <button onClick={() => setOpen(o => !o)}>Add Movie</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} className='moviedesc-modal' modal nested>
                {
                    close => (
                        <div className='flex gap-4 w-[90%] md:w-full flex-col p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-lg'>

                            <div className="absolute left-[90%] top-[4%]">
                                <div></div>
                                <button onClick=
                                    {() => {
                                        close();
                                        setId(prev => prev + 1);
                                        setData({ id: id });
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
                                <textarea onChange={(e) => setData({ ...data, desc: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg" rows="4" cols="56" />
                            </div>
                            <div className="flex justify-between ">
                                <div className="flex gap-2 flex-col">
                                    <div>Movie Duration</div>
                                    <input onChange={(e) => setData({ ...data, duration: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg" type="number" />
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <div>Language</div>
                                    <select onChange={(e) => setData({ ...data, lang: e.target.value })} className="p-1 border-2 border-zinc-400 rounded-lg">
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
        </>
    )
}

export default MovieDes