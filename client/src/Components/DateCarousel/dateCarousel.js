import React, { useRef,useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./dateCarousel.css";
const DateCarousel = ({ onSelectDate,setDateS }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateRange = [];
  const startDate = new Date();
  // setDateS(startDate.toDateString());
  startDate.setDate(startDate.getDate());
  for (let i = 0; i <9; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    dateRange.push(currentDate);
  }

  const settings = {
    infinite: false,
    centerPadding: '0',
    slidesToShow: 5,
    speed: 500,
    focusOnSelect: true,
    afterChange: (index) => {
      setSelectedDate(dateRange[index]);
      onSelectDate(dateRange[index]);
    },
  };

  const formatDate = (date) => {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  let sliderRef = useRef(null); 
  return (
    <div className="date-carousel">
      <Slider {...settings} ref={sliderRef}>
        {dateRange.map((date, index) => (
          <div
            key={index}
            className={`date-card  rounded-2xl  w-[20%] ${date.toDateString()===selectedDate.toDateString() ? 'selected' : ''}`}
          >
            {date.toLocaleString('en-US', { month: 'short' })}<br></br>
            {date.getDate()}<br></br>
            {date.toLocaleString('en-US', { weekday: 'short' })}<br></br>
            {/* {formatDate(date)} */}
          </div>
        ))}
          {/* <button onClick={() => sliderRef.current.slickNext()}>Next &rarr;</button> */}
      </Slider>
    </div>
  );
};

export default DateCarousel;
