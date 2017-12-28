import React, { PropTypes } from 'react';
import { compose } from 'redux';
import ReactDOM from 'react-dom';
import Cache from './GoogleMap/ScriptCache';
import GoogleApi from './GoogleMap/GoogleApi';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Button} from 'react-bootstrap';

import './Location.scss';

var count = 0;
var t;

// TODO:
var lat = 41.854885;
var lng = -88.081807;

const style = {
  width: '100%',
  height: '100%'
};
// Start marker
function start_markar_fun(){ 
  count++;
  lat = lat + 0.5;
  lng = lng + 0.5;

  t = setTimeout(start_markar_fun, 1000);
  console.log(count, lat, lng);
}
var start_markar = function(event){
  start_markar_fun();
}

// Pause marker
function pause_markar_fun(){
  clearTimeout(t);
  console.log('stop me at '+count);
}
var pause_markar = function(event){
  pause_markar_fun();
}

// Reset marker
function reset_marker_fun(){
  pause_markar_fun();
  count = 0
  console.log('Reset me '+ count);
}
var reset_markar = function(event){
  reset_marker_fun();
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
            lat: lat,
            lng: lng
          }}
          style={style}>
          <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
        </Map>
        <div className="buttons-container">
          <Button bsStyle="success" onClick={start_markar}>Start</Button>
          <Button bsStyle="warning" onClick={pause_markar}>Pause</Button>
          <Button bsStyle="primary" onClick={reset_markar}>Reset</Button>
        </div>
      </div>    

    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyB1qXVmfbeiGzcixjj8covUIoPEYNs_yPY')
})(Location)