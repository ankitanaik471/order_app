import { Meteor } from 'meteor/meteor'; 
import { check } from 'meteor/check'; 
import MapData from '../MapData';

Meteor.publish('MapData', function mapdata() { 
  return MapData.find({ owner: this.userId }); 
}); 
 
// Note: documents.view is also used when editing an existing document. 
Meteor.publish('mapdata.view', function mapdataView(documentId) { 
  check(documentId, String); 
  return MapData.find({ _id: documentId, owner: this.userId }); 
});  