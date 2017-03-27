import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
var axios = require('axios');


class Topology extends Component {

  componentDidMount(){
    console.log('Entered!');
    var that = this;
    setInterval(function() {
      console.log('setTimeout on');
      that.props.fetchSensorDetails();
      that.props.fetchSensordata();
    }, 10000);
  }

  render() {

    var topologyData= {
   };
   var flag = 0;
   var topo;

   var links = [];
   var nodes = [];
   var count = 50;
   var nodesObject = new Object();
   nodesObject["name"] = "Gateway";
   nodesObject["x"] = 400;
   nodesObject["y"] = 100;
   nodesObject["device_type"] = "router";
   nodes.push(nodesObject);

   var i =0;
   var datares = this.props.sensorDetails;
   var sensorData = this.props.sensorData;

   if(datares.length > 0){
   for (i = 0; i < datares.rows.length; i++) {
     var nodesObject = new Object();
     var linksObject = new Object();
     nodesObject["id"] = datares.rows[i].doc.SensorID;
     nodesObject["name"] = "Sensor" + datares.rows[i].doc.SensorID;
     nodesObject["Latitude"] = datares.rows[i].doc.Latitude;
     nodesObject["Longitude"] = datares.rows[i].doc.Longitude;
     nodesObject["Temperature"] = sensorData[0];
     nodesObject["Moisture"] = sensorData[1];
     nodesObject["Salinity"] = sensorData[2];
     nodesObject["Ph"] = sensorData[3];
     nodesObject["x"] = 660 - count;
     count = count + 150;
     nodesObject["y"] = count;
     nodesObject["device_type"] = "server";
     nodes.push(nodesObject);
     linksObject["source"] = i;
     linksObject["target"] = 0;
     links.push(linksObject);
   }

   var linksObject = new Object();
   linksObject["source"] = i;
   linksObject["target"] = 0;
   links.push(linksObject);

   topologyData.nodes = nodes;
   topologyData.links = links;
   draw();
 }

return(

 function draw() {
   (function(nx) {
     /**
     * define application
     */
     var Shell = nx.define(nx.ui.Application, {
       methods: {
         start: function() {
           //your application main entry

           if(flag==0){
             // initialize a topology
             topo = new nx.graphic.Topology({
               // set the topology view's with and height
               width: 1000,
               height: 580,
               // node config
               nodeConfig: {
                 // label display name from of node's model, could change to 'model.id' to show id
                 label: 'model.name',
                 iconType: 'model.device_type'
               },
               // link config
               linkConfig: {
                 // multiple link type is curve, could change to 'parallel' to use parallel link
                 linkType: 'curve'
               },

               /*nodeSetConfig: {
               label: 'model.id',
               iconType: 'model.iconType'
             },*/
             // show node's icon, could change to false to show dot
             showIcon: true
           });
           flag = 1;
         }
         //set data to topology
         topo.data(topologyData);
         //attach topology to document
         topo.attach(this);
       }
     }
   });

   /**
   * create application instance
   */
   var shell = new Shell();

   /**
   * invoke start method
   */
   shell.start();
 })(nx);
 }
);
    //return(<div>hi</div>);
}
}

function mapStateToProps(state){
  var data = state.auth.data;
  let sensorData = [];
  var sensorDetails = [];
  if (data) {
    var n = data.rows.length;
    sensorData = [
      data.rows[n - 1].doc.data.temperature,
      data.rows[n - 1].doc.data.moisture,
      data.rows[n - 1].doc.data.salinity,
      data.rows[n - 1].doc.data.humidity
    ];
  }
  if(state.auth.sensordetails){
    sensorDetails = state.auth.sensordetails;
  }
  return {sensorData: sensorData, sensorDetails:sensorDetails};
}

export default connect(mapStateToProps, actions)(Topology);
