import React from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';
import MapData from '../../../api/MapData/MapData';

const GoogleMap = ({ googlemap }) => (
	<div className="GoogleMap">
		<h1> Stateless Component </h1>
	</div>
);

GoogleMap.PropTypes = {
	googlemap: PropTypes.object.isRequired,
}

export default scriptLoader(
  [
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1qXVmfbeiGzcixjj8covUIoPEYNs_yPY',
  ],
)(GoogleMap)