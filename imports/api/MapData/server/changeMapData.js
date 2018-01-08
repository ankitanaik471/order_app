import MapData from '../MapData';
setInterval(function(){
 //change coordinates
 MapData.update('12344',{
 	lat : Math.random()*1.23,
 	lng : Math.random()*0.6,
 })
},1000)
