import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const MapData = new Mongo.Collection('MapData');

MapData.allow({
  insert: () => true,
  update: () => true, 
  remove: () => true,
});

MapData.deny({
  insert: () => true,
  update: () => true, 
  remove: () => true,
});

MapData.schema = new SimpleSchema({
	owner: {
	    type: String,
	    label: 'The ID of the user this document belongs to.',
  	},
	longitude: {
		type: Number,
		label: 'longitude',
	},
	latitude: {
		type: Number,
		label: 'latitude',
	}
});

MapData.attachSchema(MapData.schema);
export default MapData; 