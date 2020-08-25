import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

const Day = (props) => {
	const {day, weather, tasks} = props;

	let taskText = [];
	if(tasks.start != "") taskText.push("Tasks to start:\n" + tasks.start.join('\n'));
	if(tasks.due != "")   taskText.push("Tasks due:\n" + tasks.due.join('\n'));

	if(day)
		return (
			<div className="day">
				<div className="dayNumber">{day}</div>
				<div className="dayTemps">
					Avg hi: {weather.maxTemp}<br />
					Avg lo: {weather.minTemp}
				</div>
				<div className="dayTasks">
					{taskText.join('\n')}
				</div>
			</div>
		)
	else
		return (
			<div className="day"></div>
		);
}

export default Day;

Day.propTypes = {
	handleClickMe: PropTypes.func,
};
