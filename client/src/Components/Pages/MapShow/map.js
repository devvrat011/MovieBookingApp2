import React, { useContext, useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet';
import osm from "./osm-provider";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import img from "../../Images/map-marker-512.webp";
import context from '../../../Context/context';


const markerIcon = new L.Icon({
  iconUrl: img,
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [3, -46]
});



const arr = {
  Delhi: [{ lng: 77.015076, lat: 28.993082 }, { lng: 75.015176, lat: 28.993082 }, { lng: 73.015276, lat: 28.993082 }, { lng: 70.015176, lat: 28.993082 }],
}
const Map = () => {

  const APIKEY = "fdea282050c20d0db06fd5af5caf9945";
  const [center, setCenter] = useState({ lng: 77.015076, lat: 28.993082 });
  const [check, setCheck] = useState(false);
  const [list, setList] = useState([{ lng: 77.145133, lat: 28.9782558 }, { lng: 77.198692, lat: 28.543680 }, { lng: 77.015076, lat: 28.993082 }])
  const [listData, setListData] = useState();
  const {getStates} = useContext(context);
  const ZOOM_LEVEL = 8;
  const mapRef = useRef();
  // useEffect(()=>{
  //   if(check){
  //     get();
  //     setCheck(false);
  //   }
  // },[check]);

  const [stateLoc,setStateLoc]=useState([]);
    useEffect(()=>{
        const get=async()=>{
            const res=await getStates();
            setStateLoc(res);
        }
        get();
    },[])

  const fetchdata = async (id) => {
    try {
      const fetchedData = [];
      const response = await fetch(`http://localhost:8000/state/${id}/theatre`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();
      fetchedData.push(res.TheatreOwned);
      setListData(fetchedData[0]);
    }
    catch (e) {
      console.log(e);
    }
  }
  
  const get = async () => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${center.lat}&lon=${center.lng}&appid=${APIKEY}`).then(response => response.json()).then(data => console.log(data))
  }
  const getLat = async (val) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${APIKEY}`)
      .then(response => response.json())
      .then(data => {
        const newLatLng = { lng: data.coord.lon, lat: data.coord.lat };
        setList((prevList) => [...prevList, newLatLng]);
      });
  }

  // useEffect(() => {
  //     navigator.geolocation.getCurrentPosition((pos) => {
  //     console.log(pos);
  //     setCenter({lng:pos.coords.longitude,lat:pos.coords.latitude});
  //   //   getLat();
  //     setCheck(true);
  //   })
  // },[])
  const [value, setValue] = useState();
  const [id,setId]=useState();
  return (
    <div className='z-100'>
      <div className=' w-[60%] rounded-xl h-10 flex gap-2' >
        <input type='text' className='border-2 w-full h-full text-xl' onChange={(e) => setValue(e.target.value)} />
        <select onChange={(e) => setId(e.target.value )} className="p-1 border-2 border-zinc-400 rounded-lg min-w-full">
          <option>choose State...</option>
          {
            stateLoc.map((item, idx) => (
              <option value={item._id}>{item.name}</option>
            ))
          }

        </select>
        <div onClick={() => fetchdata(id)} className='border-2 text-white bg-blue-400 rounded-xl p-2 flex flex-col justify-center'>
          Search
        </div>
      </div>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
      >
        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
        {
          listData?.map((item, id) => (
            <Marker key={id} position={[item.location.lat, item.location.long]} icon={markerIcon} >
              <Popup>
                <b>show marker</b>
              </Popup>
            </Marker>
          ))
        }
      </MapContainer>

    </div>
  )
}
export default Map;