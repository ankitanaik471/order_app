import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

import scriptLoader from 'react-async-script-loader';
import MapData from '../../../api/MapData/MapData';
import { LocationListWithTracker } from '../../components/LocationList/LocationList';

import './Location.scss';

var t;
export class Location extends React.Component{  

  constructor(props){
    super();
    this.Map = undefined;
    this.Marker = undefined;

    this.map = undefined;
    this.marker = undefined;

    this.time = 2;

    this.defaultPosition = {lat: -25.363, lng: 131.044};
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
      }
      else this.props.onError()
    }
  }

  randomMarker() {
    console.log(this.marker);
  }

  afterScriptLoad() {    
    t = setInterval(() => {
      if ( this.defaultPosition.lat > 0 ) {        
        this.marker.setPosition(new window.google.maps.LatLng(this.defaultPosition.lat, this.defaultPosition.lng++));
      }else {
        this.marker.setPosition(new window.google.maps.LatLng(this.defaultPosition.lat++, this.defaultPosition.lng));         
      }
      
    }, 100); 
  }

  startEvent(){
    this.afterScriptLoad();    
  }

  pauseEvent(){
    clearInterval(t);
    const doc = { 
      longitude: this.defaultPosition.lat,
      latitude: this.defaultPosition.lng
    }
    Meteor.call('mapdata.insert', doc, function(e,r){      
      if (e) {
        console.log('error is' + e);
      }else{
        console.log('result is' + r);
      }
    });
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
    const doc = { 
      longitude: this.defaultPosition.lat,
      latitude: this.defaultPosition.lng
    }
    Meteor.call('mapdata.insert', doc, function(e,r){      
      if (e) {
        console.log('error is' + e);
      }else{
        console.log('result is' + r);
      }
    });
  }

  removeall(){
    Meteor.call('mapdata.remove', function(e,r){});
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
          <button onClick = {() => this.removeall()}>D-All</button>                 
        </div>
        <LocationListWithTracker></LocationListWithTracker>
      </div>    
    )
  }
}

Location.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default scriptLoader(
  [
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1qXVmfbeiGzcixjj8covUIoPEYNs_yPY',
  ],
)(Location)