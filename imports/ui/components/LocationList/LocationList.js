import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Table, Alert, Button } from 'react-bootstrap';
import MapDataCollection from '../../../api/MapData/MapData';

const LocationList = ({ loading, documents, match, history }) => ( !loading ? (
		<div className="LocationList">
			<br/>
			<h3>Database {documents.length}</h3>			
			<hr/>
			{documents.length ? 
				<Table responsive>
					<thead>
						<tr>
							<th>longitude</th>
	            			<th>latitude</th>
						</tr>
					</thead>
					<tbody>
						{documents.map(({_id, longitude, latitude})=>(
							<tr key={_id}>
								<td>{longitude}</td>
								<td>{latitude}</td>
							</tr>
						))}
					</tbody>
				</Table> : <Alert bsStyle="warning">No Orders</Alert> }
		</div>
	)	: <div> No data found </div>
);

LocationList.PropTypes = {
	loading: PropTypes.bool.isRequired,
	documents: PropTypes.arrayOf(PropTypes.object).isRequired,
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
}

export const LocationListWithTracker = withTracker(() => {
  const subscription = Meteor.subscribe('MapData');
  return {
    loading: !subscription.ready(),
    documents: MapDataCollection.find().fetch(),
  };
})(LocationList);