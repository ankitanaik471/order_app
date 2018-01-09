import React from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';
import MapData from '../../../api/MapData/MapData';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';

var id;

const doc = { 
  longitude: MapData.schema._schema.longitude.defaultValue,
  latitude: MapData.schema._schema.latitude.defaultValue
}
const changeValue = () => {		
	Meteor.call('mapdata.insert', doc, function(e,r){
		if (e) {
			console.log('error');
		}else{	
			id = r;			
		}
	});
};

const GoogleMap = ({ documents, history }) => (
	console.log(documents),
	<div className="GoogleMap">				
		{documents.map(({_id, longitude, latitude}) => (
				<div className="myDiv" key={_id}>{longitude}, {latitude}</div>
			))}
				<br />
				<br />
				<div>
				<span>{ doc.latitude }</span>				
				<span>{ doc.longitude }</span>				
				<br />
				<Button onClick={()=>changeValue()}>start</Button>
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