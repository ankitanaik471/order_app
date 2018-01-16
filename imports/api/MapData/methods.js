import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import MapData from './MapData';
import rateLimit from '../../modules/rate-limit';

var time;

Meteor.methods({	
	'mapdata.insert': function mapDataInsert(doc){
		check(doc, {
			longitude: Number,
			latitude: Number,
		});

		try {
	      return MapData.insert({owner: this.userId, ...doc});
	    } catch (exception) {
	      throw new Meteor.Error('Someting went wrong', exception);
	    }
	},	
	'mapdata.remove': function mapdataRemove(){
		try{
			return MapData.remove({});			
		}catch(exception){
			throw new Meteor.Error('Someting went wrong', exception);			
		}
	},
	'mapdata.update': function mapdataUpdate(doc_id, doc){
		try{
			return MapData.update(doc_id, { $set: doc });
		}catch(exception){
			throw new Meteor.Error('Someting went wrong', exception);			
		}
	},
	changeData(){
		if ( MapData.find().fetch().length == 0 ) {
			const doc = {
				longitude: MapData.schema._schema.longitude.defaultValue,
	  			latitude: MapData.schema._schema.latitude.defaultValue
			}
			Meteor.call('mapdata.insert', doc, function(e,r){});
		}else{
			var doc = MapData.findOne();
			time = setInterval(() => {
				doc.latitude = doc.latitude + 0.005;
				doc.longitude = doc.longitude + 0.005;
				Meteor.call('mapdata.update', doc._id, doc, function(e,r){});
			}, 1000);
		}		
	},
	pauseChange(){
		clearInterval(time);
	},
	resetValues(){
		var doc = MapData.findOne();		
		doc.latitude = MapData.schema._schema.longitude.defaultValue;
		doc.longitude = MapData.schema._schema.latitude.defaultValue;
		Meteor.call('mapdata.update', doc._id, doc, function(e,r){});		
	},
});

MapData.after.insert(function(user_id, doc){
	console.log(doc);
	try{
		time = setInterval(() => {
			doc.latitude = doc.latitude + 0.005;
			doc.longitude = doc.longitude + 0.005;
			Meteor.call('mapdata.update', doc._id, doc, function(e,r){});
		}, 1000);
	}catch(exception){
		throw new Meteor.Error('error', exception);
	}	
});

Meteor.startup(() => {
	console.log('im a starter');
});

rateLimit({
  methods: [
    'mapdata.insert',
    'mapdata.remove',
    'mapdata.update',
  ],
  limit: 5,
  timeRange: 1000,
});