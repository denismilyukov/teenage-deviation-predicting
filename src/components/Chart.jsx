import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Chart extends Component {
	render() {
		const options = {
			theme: "light",
			animationEnabled: true,
			exportFileName: "Deviant Part Diagram",
			backgroundColor: "transparent",
			data: [{
				type: "pie",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
                toolTipContent: "{label}: <strong>{y}%</strong>",
				dataPoints: [
					{
						y: 100-this.props.data,
						label: "Недевиантное население",
						color: "#578fd0",
					},
					{ 
						y: this.props.data,
						label: "Девиантное население",
						color: "#cf4b4b",
					},
				]
			}]
		}
		return (
            <div className={this.props.className}>
                <CanvasJSChart options = {options}/>
            </div>
		);
	}
}