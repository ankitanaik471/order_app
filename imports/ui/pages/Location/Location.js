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

const style = {
  width: '100%',
  height: '100%'
};

function start_markar_fun(){ 
  count++;
  t = setTimeout(start_markar_fun, 1000);
  console.log(count);
}

function pause_markar_fun(){
  clearTimeout(t);
  console.log('stop me at '+count);
}

function reset_marker_fun(){
  pause_markar_fun();
  count = 0
  console.log('Reset me '+ count);
}
  
var start_markar = function(event){
  start_markar_fun();
}

var pause_markar = function(event){
  pause_markar_fun();
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
          <Button bsStyle="primary" onClick={reset_markar}>Reset</Button>
        </div>
      </div>    

    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyB1qXVmfbeiGzcixjj8covUIoPEYNs_yPY')
})(Location)