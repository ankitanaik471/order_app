import React, { PropTypes } from 'react';
import { compose } from 'redux';
import ReactDOM from 'react-dom';
import MapData from '../../../api/MapData/MapData';
import {Button} from 'react-bootstrap';
import scriptLoader from 'react-async-script-loader';
import './Location.scss';

// var count = 0;
var t;

// // TODO:
// var lat = 41.854885;
// var lng = -88.081807;
// // http://jsfiddle.net/robschmuecker/XZXLk/ -- functionality

// const style = {
//   width: '100%',
//   height: '100%'
// };
// // Start marker
// function start_markar_fun(){ 
//   count++;
//   lat = lat + 10;
//   lng = lng + 10;

//   t = setTimeout(start_markar_fun, 1000);
//   console.log(count, lat, lng);
// }
// var start_markar = function(event){
//   start_markar_fun();
// }

// // Pause marker
// function pause_markar_fun(){
//   clearTimeout(t);
//   console.log('stop me at '+count);
// }
// var pause_markar = function(event){
//   pause_markar_fun();
// }

// // Reset marker
// function reset_marker_fun(){
//   pause_markar_fun();
//   count = 0
//   console.log('Reset me '+ count);
// }
// var reset_markar = function(event){
//   reset_marker_fun();
// }


export class Location extends React.Component{  

  constructor(props){
    super();
    this.Map = undefined;
    this.Marker = undefined;

    this.map = undefined;
    this.marker = undefined;

    this.time = 2;

    this.defaultPosition = {lat: -25.363, lng: 131.044}
  }

  
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished 
      if (isScriptLoadSucceed) {
        this.Map = window.google.maps.Map;
        this.Marker = window.google.maps.Marker;
        this.map = new this.Map(document.getElementById('map'), {
          zoom: 2,
          center: this.defaultPosition
        });

        this.marker = new this.Marker({
          position: this.defaultPosition,
          map: this.map
        });
        this.afterScriptLoad();
      }
      else this.props.onError()
    }
  }

  randomMarker() {
    console.log(this.marker);
  }

  afterScriptLoad() {    

    t = setInterval(() => {
      // console.log("latitude"+this.defaultPosition.lat);
      // console.log("longitude"+this.defaultPosition.lng);
      if ( this.defaultPosition.lat > 0 ) {        
        this.marker.setPosition(new window.google.maps.LatLng(this.defaultPosition.lat, this.defaultPosition.lng++));
      }else {
        this.marker.setPosition(new window.google.maps.LatLng(this.defaultPosition.lat++, this.defaultPosition.lng));         
      }
      
    }, 100); 
  }
  startEvent(){
    console.log("start latitude"+this.defaultPosition.lat);
    console.log("start longitude"+this.defaultPosition.lng);
    this.afterScriptLoad();
    console.log('update data');
  }
  pauseEvent(){
    console.log("pause latitude"+this.defaultPosition.lat);
    console.log("pause longitude"+this.defaultPosition.lng);
    clearInterval(t);
  }
  reset(){
    this.defaultPosition = {lat: -25.363, lng: 131.044};  
    this.map = new this.Map(document.getElementById('map'), {
      zoom: 2,
      center: this.defaultPosition
    });
    this.marker = new this.Marker({
      position: this.defaultPosition,
      map: this.map
    });
     
    clearInterval(t);
    console.log('reset me');
  }
  render(){
    return (
      <div className="map-container">
        <h1>Moving Marker</h1>
        <div id="map"></div>
        <div className="buttons-container">
          <button onClick = {() => this.startEvent()}>START</button>                 
          <button onClick = {() => this.pauseEvent()}>PAUSE</button>                 
          <button onClick = {() => this.reset()}>RESET</button>                 
        </div>
      </div>    
    )
  }
}

export default scriptLoader(
  [
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1qXVmfbeiGzcixjj8covUIoPEYNs_yPY',
  ],
)(Location)