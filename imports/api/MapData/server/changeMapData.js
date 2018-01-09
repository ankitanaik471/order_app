import { Mongo } from 'meteor/mongo';
import MapData from '../MapData';

setInterval(function(){
 //change coordinates
 MapData.update('t3mjoPNAv9Z2jnGFy',{
 	lat : Math.random()*1.23,
 	lng : Math.random()*0.6,
 })
},1000);