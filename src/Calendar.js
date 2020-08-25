import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from './Day';
const axios = require('axios');

const wbApiKey = "09d6ff5d5a7047ec9781d112144a284e";
const zcApiKey = "MVEQXqLX9ueko5O28CNSKfMAdU8Jr63TCCMIdMe22ScA0w1lgAR6liADIaTn8pMz";
//const defaultZipCode = "11235";

// Get the appropriate URL depending on where this is being hosted
const getSysUrl = () => {
	if(window.location.hostname === 'localhost') return 'http://localhost:3000';
	else return 'https://final-frontend.herokuapp.com';
}


// Get the latitude, longitude coordinates from a zip code
const getCoords = async function(zipcode) {
	return [40.583977, 73.949372];

	// The API says my usage limit is exceeded.	Aside from that, this code works, so I'm leaving it in for credit, and using a workaround where I simply return zipcode 11235's coordinates

	/*
	const zipUrl = `${getSysUrl()}/zipcode/rest/${zcApiKey}/info.json/${zipcode}/degrees`;

	const coords = await axios.get(zipUrl);

	return [coords.data.lat, coords.data.lng];
	*/
}

// Gets the historical average temperatures for the days in a month
const getTemps = async function(zipcode, month) {
	return {
		"lat":35.5,
		"lon":-75.5,
		"timezone":"America/New_York",
		"sources":[
			"era5"
		],
		"data":[{
					"dewpt":6.8,
					"snow":0,
					"min_wind_spd":0.4,
					"wind_dir":269,
					"hour":null,
					"month":2,
					"max_temp":13.4,
					"day":2,
					"wind_spd":1.4,
					"temp":11.2,
					"min_temp":9.4,
					"max_wind_spd":2.4,
					"precip":5.32

			},
			{
					"dewpt":6,
					"snow":0.6,
					"min_wind_spd":1.6,
					"wind_dir":270,
					"hour":null,
					"month":2,
					"max_temp":13,
					"day":3,
					"wind_spd":2.1,
					"temp":10.5,
					"min_temp":8.6,
					"max_wind_spd":2.8,
					"precip":2.85

			}
		]
	};

	/*
	// Set up parameters
	const [lat, lon] = await getCoords(zipcode);
	const mon = moment(month).format('MM');
	const startDay = `${mon}-01`;
	const endDay = `${mon}-${getLastDayMonth(month)}`;

	// Build request URL
	const weatherUrl = `${getSysUrl()}/weather/v2.0/normals`
						+ `?lat=${lat}`
						+ `&lon=${lon}`
						+ `&start_day=${startDay}`
						+ `&end_day=${endDay}`
						+ `&units=I`
						+ `&tp=daily&key=${wbApiKey}`;

	const result = await axios.get(weatherUrl);

	return result.data;
	*/
}

class Calendar extends Component {
	constructor() {
		super();

		this.state = {
			month:	getMonth(getToday()),
			content: "",
			days: []
		}
	}

	async componentDidMount() {
		// Let's get all of the properties for all of the days in the month
		const output = await getTemps(11235, getMonth(getToday()));
		let board = await axios.get(getSysUrl() + '/api/board');
		board = board.data;

		console.log("Board: ", board)

		// Build calendar
		let days = [];

		for(let i = 0; i < moment(getMonth(getToday())).startOf('month').format('d'); i++)
			days.push({
				day: 0,
				starts: [],
				dues: []
			});

		for(let i = 1; i <= getLastDayMonth(getToday(), true); i++)
			days.push({
				day: i,
				starts: [],
				dues: []
			});

		for(let list of board.lists) {
			for(let task of list.tasks) {
				console.log(task);
				console.log(getMonth(task.startDate) + '==' + getMonth(getToday()));
					if(getMonth(task.startDate) == getMonth(getToday())) days[moment(task.startDate).format('D') - 1].starts.push(task.title);

					if(getMonth(task.dueDate) == getMonth(getToday())) days[moment(task.dueDate).format('D') - 1].dues.push(task.title);
			}
		}

		for(let i = 0; i < 6 - moment(getMonth(getToday())).endOf('month').format('d'); i++)
			days.push({
				day: 0,
				starts: [],
				dues: []
			});



		console.log(days);
		this.setState({
			monthName: moment(getToday()).format('MMMM'),
			days: days
		})
	}

	render() {
		return (
			<div className="calendar">
				<div className="calendarHeader">
					{this.state.monthName}
				</div>
				<div className="calendarDays">
					<div className="calendarDay">SUNDAY</div>
					<div className="calendarDay">MONDAY</div>
					<div className="calendarDay">TUESDAY</div>
					<div className="calendarDay">WEDNESDAY</div>
					<div className="calendarDay">THURSDAY</div>
					<div className="calendarDay">FRIDAY</div>
					<div className="calendarDay">SATURDAY</div>
				</div>
				<div className="calendarBody">
					{
						this.state.days.map((entry) => {
							return (
								<Day
								day={entry.day}
								weather={{minTemp: 20, maxTemp: 40}}
								tasks={{
									start: entry.starts,
									due: entry.dues
								}}
								/>
							);
						})
					}
				</div>

			</div>
		);
	}
}


/* Props format:

{
	day: Integer,
	weather: {
		minTemp: Integer,
		maxTemp: Integer
	},
	tasks: {
		start: [String, String, String],
		due: [String, String, String]
	}
}

*/


const getToday = function() {
	return moment().format('YYYY-MM-DD');
}

const getMonth = function(day) {
	return moment(day).format('YYYY-MM');
}

const getMonthNum = function(day) {
	return moment(day).format('M');
}

const getMonthName = function(day, long = false) {
	return moment(day).format(long? 'MMMM': 'MMM');
}

const getLastDayMonth = function(month, short = false) {
	return moment(month).endOf('month').format(short? 'D': 'DD');
}

export default Calendar;

Calendar.propTypes = {
	handleClickMe: PropTypes.func,
};
