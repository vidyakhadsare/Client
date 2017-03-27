import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

var LineChart = require('react-chartjs').Bar;
var axios = require('axios');

const bgcolor = [
  'rgba(255,99,132,1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
];

const backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)'
];

const chartOptions =  {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
};

class Graph extends Component {

  componentDidMount(){
    var that = this;
    setInterval(function() {
      console.log('setTimeout on');
      that.props.fetchSensordata();
    }, 10000);
  }

  render() {
    // move chart data out. only update data in function.
    var chartData = {
      labels: ["Temperature", "Salinity", "Moisture", "Humidity"],
      datasets: [{
        label: '# of Votes',
        data: this.props.sensorData,
        backgroundColor: backgroundColor,
        borderColor: bgcolor,
        borderWidth: 1
      }]
    };
    return (
      <LineChart data={chartData} options={chartOptions}/>
    );
  }
}

function mapStateToProps(state){
  var data = state.auth.data;
  let sensorData = [];
  if (data) {
    var n = data.rows.length;
    sensorData = [
     data.rows[n - 1].doc.data.temperature,
     data.rows[n - 1].doc.data.moisture,
     data.rows[n - 1].doc.data.salinity,
     data.rows[n - 1].doc.data.humidity
   ];
  }
  return {sensorData: sensorData};
}

export default connect(mapStateToProps, actions)(Graph);
