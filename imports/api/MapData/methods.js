import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import MapData from './MapData';
import rateLimit from '../../modules/rate-limit';

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

});

MapData.after.insert(function(id, doc){
	setInterval(() => {
		console.log(id);
		console.log(doc);		
		doc.latitude = doc.latitude * 0.5;
		doc.longitude = doc.longitude * 0.5;
		MapData.update(id, {$set: doc});
	}, 500);		
});

// MapData.after.update(function(id, doc)){
// 	setTimeout();
// }

rateLimit({
  methods: [
    'mapdata.insert',
    'mapdata.remove',
  ],
  limit: 5,
  timeRange: 1000,
});