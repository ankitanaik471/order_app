import React from 'react';
import PropTypes from 'prop-types';
import MapData from '../../../api/MapData/MapData';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';
import Location from '../Location/Location';


const GoogleMap = ({ documents }) => (	
	<div className="GoogleMap">				
		{documents.map(({_id, longitude, latitude}) => (
				<div className="myDiv" key={_id}>{longitude}, {latitude}
					<br />
					<br />
					<Location lat={latitude} lng={longitude}></Location>
				</div>
			))}
			<br />
			<br />
			<div>						
				<Button onClick={()=> Meteor.call('changeData', function(){}) }>Start</Button>
				<Button onClick={()=> Meteor.call('pauseChange', function(){}) }>Pause</Button>
				<Button onClick={()=> Meteor.call('resetValues', function(){}) }>Reset</Button>
				<Button onClick={()=> Meteor.call('mapdata.remove', function(){}) }>Clear</Button>					
			</div>
	</div>
);

GoogleMap.PropTypes = {
	documents: PropTypes.object.isRequired,
}

export default withTracker(({ match }) => {
	const subscription = Meteor.subscribe('MapData');
  	return {
	    documents: MapData.find().fetch(),
  	};
})(GoogleMap)