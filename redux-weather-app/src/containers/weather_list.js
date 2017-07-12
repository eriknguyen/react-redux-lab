import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMapNew from '../components/google_map';

export class WeatherList extends Component {

	// render data of each city
	renderWeather(cityData) {
		const name = cityData.city.name;

		const temps = cityData.list.map(weather => weather.main.temp);
		const humidities = cityData.list.map(weather => weather.main.humidity);
		const pressures = cityData.list.map(weather => weather.main.pressure);

		// using ES6 destructuring
		const { lon, lat } = cityData.city.coord;
		/*
		// equivalent with:
		const lon = cityData.city.coord.lon;
		const lat = cityData.city.coord.lat;*/


		return (
			<tr key={name}>
				<td><GoogleMapNew lon={lon} lat={lat} /></td>
				<td><Chart data={temps} color="orange" unit="K" /></td>
				<td><Chart data={pressures} color="green" unit="hPa" /></td>
				<td><Chart data={humidities} color="black" unit="%" /></td>
			</tr>
		);
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (K)</th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		);
	}
}

// use state.weather, weather is get from reducers
// function mapStateToProps(state) {
// 	return { weather: state.weather };
// }

// shorter form by using ES6 syntax
// { weather } === { weather: weather }
function mapStateToProps({ weather }) {
	return { weather };
}

// export container
export default connect(mapStateToProps)(WeatherList);