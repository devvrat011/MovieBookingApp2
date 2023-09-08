import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Popup from 'reactjs-popup';

const BookTicketPage = () => {
  const [modal, setModal] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const rows = 5;
  const cols = 5;
  const [id, setId] = useState(0);
    const [open, setOpen] = useState(false);
  const closeModal = () => {
   
    setOpen(o => !o);
}

  const toggleSeat = (row, col) => {
    const seat = { row, col };
    const isSelected = isSelectedSeat(seat);

    if (isSelected) {

      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter(
          (selectedSeat) =>
            selectedSeat.row !== row || selectedSeat.col !== col
        )
      );
    } else {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
    }
    console.log(selectedSeats);
  };

  const isSelectedSeat = (seat) =>
    selectedSeats.some(
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
            className={`w-10 h-10 border rounded-lg flex-col flex justify-center border-gray-500 text-center text-lg font-bold ${isSelected ? "bg-blue-500 text-white" : "bg-gray-300"
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

  return (
    <div>
      <div className="border-2 w-full h-28 flex flex-col justify-center px-4 font-bold text-3xl">
        Movie NAME
      </div>
      <div className="w-full">
        <div className="border-2 rounded-xl w-[95%] mx-auto h-20 flex p-2 my-2">
          <div className="w-[30%]">
            <div className="font-bold text-xl px-[10%]">Theatre Name</div>
            <div className="px-[10%]">Address</div>
          </div>
          <div className="w-[70%] flex cursor-pointer">
            <div
              onClick={() => {setModal(true); setOpen(o => !o);}}
              className="border-2 w-20 text-center rounded-xl text-xl font-bold flex flex-col justify-center"
            >
              12:00
            </div>
          </div>
        </div>
      </div>
      {/* <button className="border-2 rounded-xl bg-blue-500 text-white p-2" onClick={() => }>Add Movie</button> */}
      <Popup open={open} closeOnDocumentClick onClose={closeModal} className='moviedesc-modal' modal nested>
        {
          close => (
            <div className='flex gap-4 w-[100%] md:w-full flex-col p-10 max-w-lg mx-auto bg-white rounded-2xl shadow-lg'>
              <div className="absolute left-[90%] top-[4%]">
                <div></div>
                <button onClick=
                  {() => {
                    close();
                  }}>
                  <CloseIcon style={{ color: "grey" }} />
                </button>
              </div>
              <div className="max-w-sm mx-auto text-center grid grid-cols-5 gap-6">
                {generateSeatsGrid()}
              </div>
              <div className="text-center mt-4">
                Selected Seats: {selectedSeats.length}<br></br>

                {/* {selectedSeats} */}

              </div>

            </div>
          )
        }
      </Popup>

      </div>
    
    
  );
};

export default BookTicketPage;