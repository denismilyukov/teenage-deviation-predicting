import { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ColumnChart extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			backgroundColor: "transparent",
			labelFontSize: 20,
			animationEnabled: true,
			axisY: {
				labelFontColor: "#424c3b",
				labelFontFamily: "Montserrat",
				labelFontWeight: "bold",
				includeZero: true,
				suffix: "%"
			},
			axisX: {
				labelFormatter: function() {
                    return "";  
                },
				title:"Наведите, чтобы просмотреть детали",
				titleFontColor: "#424c3b",
				titleFontFamily: "Montserrat",
				titleFontSize: 15
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			data: [
			// {
			// 	type: "stackedColumn",
			// 	name: "General",
			// 	showInLegend: true,
			// 	yValueFormatString: "#,###k",
			// 	dataPoints: [
			// 		{ label: "Jan", y: 14 },
			// 		{ label: "Feb", y: 12 },
			// 		{ label: "Mar", y: 14 },
			// 		{ label: "Apr", y: 13 },
			// 		{ label: "May", y: 13 },
			// 		{ label: "Jun", y: 13 },
			// 		{ label: "Jul", y: 14 },
			// 		{ label: "Aug", y: 14 },
			// 		{ label: "Sept", y: 13 },
			// 		{ label: "Oct", y: 14 },
			// 		{ label: "Nov", y: 14 },
			// 		{ label: "Dec", y: 14 }
			// 	]
			// },
            {
                type: "stackedColumn",
				color: "#8e9b83",
				name: "Доля девиантного населения",
                dataPoints: this.props.data.map(elem => {
                    return { 
                        label: elem.name,
                        y: elem.result
                    }
                })
            }]
		}

		return (
            <div className={this.props.className}>
                <CanvasJSChart options = {options} />
            </div>
		);
	}
}                         