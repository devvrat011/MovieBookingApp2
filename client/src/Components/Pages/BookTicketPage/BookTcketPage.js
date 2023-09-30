import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Popup from 'reactjs-popup';
import Navbar from "../Navbars/Navbar";
import context from "../../../Context/context";
import { useParams } from "react-router-dom";
import "./BookTicket.css";
import DateCarousel from "../../DateCarousel/dateCarousel";

const BookTicketPage = () => {

  const [modal, setModal] = useState(false);
  const startDate = new Date();
  const [dateS,setDateS]=useState(startDate.toDateString());
  const {id} = useParams();
  const {getMovie,movieData,getTheatre,getShows}=useContext(context);
  const [theatredata,setTheatreData]  = useState();
  const [some,setSome] = useState(true);
   
    useEffect(()=>{
        getMovie(id);
    },[]);
    useEffect(() => {
      const find = async() => {
        const fetchedData = [];
        for(let i=0;i<movieData.theatres.length;i++){
          const res = await getTheatre(movieData.theatres[i]);
          for(let j=0;j<res.shows.length;j++){
            const value = await getShows(res.shows[j]);
            res.shows[j] = value;
          }
          fetchedData.push(res);
        }
        setTheatreData(fetchedData);
      }
      find();
    },[movieData])
  const [change,setChange] =useState(false);
  const [data, setData] = useState({ name: "dfa", theatre: "dfaj", date: "adf", time: "adf", amount: 100 });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const rows = 5;
  const cols = 5;
  const [open, setOpen] = useState(false);

  const confirmBooking = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/booking/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        await response.json();
        // console.log();
    } catch (e) {
      console.log(e);
    }
  }

  const closeModal = () => {
    setOpen(o => !o);
  }
  const toggleSeat = (row, col) => {
    const seat = { row, col };
    const isSelected = isSelectedSeat(seat);

    if (isSelected) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats?.filter(
          (selectedSeat) =>
            selectedSeat.row !== row || selectedSeat.col !== col
        )
      );
    }
    else {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
    }
  };

  useEffect( () => {
    if(change)
    {
      confirmBooking(data);
      setSelectedSeats([]);
      setChange(false);
    }
  },[data,change])

  const save =async () => {
      
      const seats=[];
      selectedSeats?.map((seat, key) => {   
            seats.push((seat.row - 1) * 5 + seat.col)
          }   
      )
      console.log(seats);
      setData({...data, name: "dshdj",theatre: "6503e39b7e191d9ca497d879", date: dateS,
      time: "19:30", amount: 420,seats:seats});
      setChange(true);
  }

  const isSelectedSeat = (seat) =>
    selectedSeats?.some(
      (selectedSeat) =>
        selectedSeat.row === seat.row && selectedSeat.col === seat.col
    );

  const generateSeatsGrid = () => {
    const grid = [];
    let c = 0;
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        const seat = { row, col };
        c++;
        const isSelected = isSelectedSeat(seat);
        grid.push(
          <div
            key={c}
            className={`w-10 h-10 shadow-2xl rounded-lg hover:scale-105 flex-col flex justify-center border-gray-500 text-center text-lg font-bold ${isSelected ? "bg-blue-500 text-white" : "bg-gray-300"
              } cursor-pointer`}
            onClick={() => toggleSeat(row, col)}
          >
            {c}
          </div>
        );
      }
    }
    return grid;
  };

  const handleDateSelect = (selectedDate) => {
    console.log('Selected Date:', selectedDate.toDateString());
    setDateS(selectedDate.toDateString());
  };
  return (
    <div>
      <Navbar />
      <div className="border-2 w-full h-28 flex flex-col justify-center px-4 font-bold text-3xl">
        {movieData?.name}
      </div>
      <DateCarousel onSelectDate={handleDateSelect} setDateS={setDateS} />
      {
        theatredata?.map((item,id) => (
            <div className="w-full">
            <div className="border-2 rounded-xl w-[95%] mx-auto h-20 flex p-2 my-2">
              <div className="w-[30%]">
                <div className="font-bold text-xl px-[10%]">{item?.name}</div>
                <div className="px-[10%]">{item.address}</div>
              </div>
              <div className="w-[70%] flex cursor-pointer gap-4">
                {
                  item.shows?.map((val,id1) => (
                    <div
                      onClick={() => { setModal(true); setOpen(o => !o); }}
                      className="p-2 border-2 text-center rounded-xl text-xl font-bold flex flex-col justify-center"
                    >
                      {val.showname}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        ))
      }
      <Popup open={open} closeOnDocumentClick onClose={closeModal}   modal nested>
        {
          close => (
            <div className='flex gap-4 w-[100%]  md:w-[100%] flex-col p-10 mx-auto bg-white rounded-2xl shadow-lg'>
              <div className="absolute left-[90%] top-[4%]">
                <div></div>
                <button onClick=
                  {() => {
                    close();
                  }}>
                  <CloseIcon style={{ color: "grey" }} />
                </button>
              </div>
              <div className="max-w-sm mx-auto text-center grid grid-cols-5 gap-4">
                {generateSeatsGrid()}
              </div>
              <div className="text-center font-bold">Screen</div>
              <div className="h-1.5 bg-gray-500 rounded-br-[900%] rounded-bl-[900%]"></div>
              {selectedSeats?.length ?
                (<div className="text-center mt-4">
                  <span className="font-bold">Selected Seats :</span> {selectedSeats?.length}<br></br>
                  <div className="flex gap-2 w-min  mx-auto mt-2">
                    {selectedSeats.map((seat, key) => {
                      return (
                        <div >
                          {(seat.row - 1) * 5 + seat.col}
                        </div>
                      )
                    })}
                  </div>
                  <div onClick={() => {
                    save();
                  }} className="border-2 p-2 rounded-xl mt-4 font-bold w-[40%] mx-auto bg-blue-600 text-white shadow-2xl cursor-pointer hover:scale-105">
                    Pay Rs {selectedSeats?.length * 100}
                  </div>
                </div>) : ""}
            </div>
          )
        }
      </Popup>
    </div>


  );
};

export default BookTicketPage;