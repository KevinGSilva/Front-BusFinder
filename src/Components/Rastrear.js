import React from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import './Rastrear.css';
import { useEffect } from 'react';


/*const center = {
  lat: -21.833174443413146,
  lng: -44.80633633086434
};*/


class MyComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      id: 0,
      latitude: 0,
      longitude: 0,
      hora: 0,
      minuto: 0,
      segundo: 0,
      center:{lat: -21.833174443413146, lng: -44.80633633086434},
      arduino:[]
    }

    this.BuscaRota = this.BuscaRota.bind(this);
    this.BuscaArduinos = this.BuscaArduinos.bind(this);
  }



  componentDidMount(){
    this.BuscaArduinos();
    setInterval(BuscaArduinos, 5000);
  }

  BuscaArduinos = () => {
    //window.location.reload();
    fetch("https://busfinder-v3.azure-api.net/api/arduinos/1")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ arduino: dados })
            })
  }

  BuscaRota (id){

    fetch("https://busfinder-v3.azure-api.net/api/arduinos/1" + id)
    .then(resposta => resposta.json())
            .then(arduino => {
                this.setState(
                    {
                        id: arduino.id,
                        latitude: arduino.latitude,
                        longitude: arduino.longitude,
                        hora: arduino.hora,
                        minuto: arduino.minuto,
                        segundo: arduino.segundo
                    }
                )
            })
  }
  


  render() {
    
    return (
      <div className='mapa'>
      <LoadScript
        googleMapsApiKey="AIzaSyAOUROgRQYXM6byUsgBe-Wo39RSE5oMYWE"
      >
        <GoogleMap
          mapContainerStyle={{width:'60%', height:'60%'}}
          center={this.state.center}
          zoom={16}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
          <Marker position={this.state.center}></Marker>
        </GoogleMap>
      </LoadScript>
      </div>
    )
  }
}


  
/*function atualizaMaps(myVar){
  var myVar = setInterval(MyComponent, 10000);
  return (myVar);
}*/

  /*function MyComponent() {

    function buscaArduino(url){
      let request = new XMLHttpRequest()
        request.open("GET", url, false)
        request.send()
        return request.responseText
    }

    


    var data = buscaArduino("https://busfinder-v3.azure-api.net/api/arduinos/1")
        var arduino = JSON.parse(data);
        console.log(arduino)
        var latitude = arduino.latitude
        var longitude = arduino.longitude
      
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyAOUROgRQYXM6byUsgBe-Wo39RSE5oMYWE"
    });

    var posicao ={lat: latitude,
        lng: longitude
    }

    /*useEffect(() => {

      setInterval(MyComponent, 10000);
      
    });
    
    return (
        <div className='mapa'>
        {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{width:'60%', height:'60%'}}
          center={posicao}
          zoom={17}
        >
          {  Child components, such as markers, info windows, etc.  }
          <></>
          <Marker position={posicao} />
        </GoogleMap>
        ) : <></>
        }
    </div>
    )
    

    
    

  }*/

  


export default MyComponent;