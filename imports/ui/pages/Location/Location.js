import React, { PropTypes } from 'react';
import { compose } from 'redux';
import ReactDOM from 'react-dom';
import Cache from './GoogleMap/ScriptCache';
import GoogleApi from './GoogleMap/GoogleApi';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Button} from 'react-bootstrap';

import './Location.scss';

var counter = 0;
const style = {
  width: '100%',
  height: '100%'
};

function start_markar_fun(){  
  setInterval(function() {
    counter += 1;   
    console.log(counter);
    if (counter <= 0) {
        counter = 1;
    }
  }, 1000);
}

function pause_markar_fun(){
  if ( counter < 0 ) {
    counter = 0;
    console.log(counter);
  }
}
  
var start_markar = function(event){
  start_markar_fun();
}
var pause_markar = function(event){
  pause_markar_fun();
}
export class Location extends React.Component{ 

  constructor(props){
    super();
  }
  
  render(){    
    return (
      <div className="map-container">
        <h1>Moving Marker</h1>  
        <Map
          google={this.props.google}
          zoom={10}
          initialCenter={{
            lat: 41.854885,
            lng: -88.081807
          }}
          style={style}>
          <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
        </Map>
        <div className="buttons-container">
          <Button bsStyle="success" onClick={start_markar}>Start</Button>
          <Button bsStyle="warning" onClick={pause_markar}>Pause</Button>
          <Button bsStyle="primary">Reset</Button>
        </div>
      </div>    

    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyB1qXVmfbeiGzcixjj8covUIoPEYNs_yPY')
})(Location)