import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Documents from '../../../api/Documents/Documents';
import { withTracker } from 'meteor/react-meteor-data';
var title = 'order';

const Search = ({ filter }) => (	
  <div className="search">
    <input
      placeholder="Filter ..."
      name="name"
      onChange={(event) => Meteor.call('displayMe', event.target.value, function(event){})}
    />
    <div>
    	<br />
    	Total Documents : { filter.length }
    	{ filter.map(({ _id, name, description }) => (
    		<div key={_id}>
    			<p><b>{name} :</b> {description}</p>
    		</div>
    	)) }
    </div>
  </div>
);

Search.PropTypes = {
	filter: PropTypes.object,
}

export default withTracker(() => {
	const subscription = Meteor.subscribe('documents');
	return {
		filter: Documents.find().fetch(),
	}
})(Search);