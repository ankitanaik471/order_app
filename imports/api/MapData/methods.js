import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MapData } from './MapData';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
	'mapdata.insert': function mapDataInsert(doc){
		check(doc, {
			longitude: String,
			latitude: String,
		});

		try {
	      return MapData.insert({ owner: this.userId, ...doc });
	    } catch (exception) {
	      throw new Meteor.Error('500', exception);
	    }
	}
});

rateLimit({
  methods: [
    'mapdata.insert',
  ],
  limit: 5,
  timeRange: 1000,
});