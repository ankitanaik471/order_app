import React from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';
import MapData from '../../../api/MapData/MapData';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';

const GoogleMap = ({ documents, history }) => (
	console.log(documents),
	<div className="GoogleMap">				
		{documents.map(({_id, longitude, latitude}) => (
				<div className="myDiv" key={_id}>{longitude}, {latitude}</div>
			))}
			<br />
			<br />
			<div>						
				<Button onClick={()=> Meteor.call('changeData', function(){}) }>Start</Button>
				<Button onClick={()=> Meteor.call('pauseChange', function(){}) }>Pause</Button>
				<br />
			</div>
	</div>
);

GoogleMap.PropTypes = {
	documents: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
}

export default withTracker(({ match }) => {
	const subscription = Meteor.subscribe('MapData');
  	return {
	    documents: MapData.find().fetch(),
  	};
})(GoogleMap)