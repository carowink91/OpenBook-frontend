import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {

  render(){
    return(
      <div className="chart">
        {this.props.chartData ?
          <Line
          data={this.props.chartData}

          options={{
            title: {
              display: true,
              text: 'Feelings Rollercoaster',
              fontSize: 20,
              fontColor: 'white'
            },
            legend: {
              display: false,
              position: 'left'
            }
          }}
          />
          :
          null
        }
      </div>
    )
  }
}

export default Chart
