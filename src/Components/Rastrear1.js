import React from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import './Rastrear.css';
import { useState, useEffect } from 'react';






function MyComponent() {
   
  //criando um state para guardar a posicao
    const [posicao, setPosicao] = useState({lat: 0, lng: 0});
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
  
   function buscaArduino(url){
     let request = new XMLHttpRequest()
       request.open("GET", url, false)
       request.send()
       return request.responseText
   }

   // Similar ao componentDidMount e componentDidUpdate:
   useEffect(() => {
      setInterval(() => atualizaMaps(), 10000);
  });
     
   
   function atualizaMaps(){
   var data = buscaArduino("https://busfinder-v3.azure-api.net/api/arduinos/1")
   var arduino = JSON.parse(data);
   console.log(arduino)
   lat = arduino.latitude
   lng = arduino.longitude
   }
   
   const { isLoaded } = useJsApiLoader({
     id: 'google-map-script',
     googleMapsApiKey: "AIzaSyAOUROgRQYXM6byUsgBe-Wo39RSE5oMYWE"
   });

   return (
       <div className='mapa'>
       {isLoaded ? (
       <GoogleMap
         mapContainerStyle={{width:'60%', height:'60%'}}
         center={posicao}
         zoom={17}
       >
         { /* Child components, such as markers, info windows, etc.*/  }
         <></>
         <Marker position={posicao} />
       </GoogleMap>
       ) : <></>
       }
   </div>
   )

   
   

 }

export default MyComponent;