import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import scriptLoader from 'react-async-script-loader';

import './Location.scss';

export class Location extends React.Component{  

  constructor(props){
    super(props);
    this.Map = undefined;
    this.Marker = undefined;
    this.map = undefined;
    this.marker = undefined;
  }
  
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished 
      if (isScriptLoadSucceed) {
        this.Map = window.google.maps.Map;
        this.Marker = window.google.maps.Marker;

        this.map = new this.Map(document.getElementById('map'), {
          zoom: 2,
          center: new window.google.maps.LatLng(0, 0)
        });

        this.marker = new this.Marker({
          position: new window.google.maps.LatLng(0, 0),
          map: this.map
        });
      }
      else this.props.onError()
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    console.log(this.props);
    this.marker.setPosition(new window.google.maps.LatLng(this.props.lat, this.props.lng));
  }

  render(){
      return (
      <div className="map-container">        
        <div id="map"></div>
      </div>    
    )
  }
}

export default scriptLoader(
  [
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1qXVmfbeiGzcixjj8covUIoPEYNs_yPY',
  ],
)(Location)