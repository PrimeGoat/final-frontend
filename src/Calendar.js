import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Calendar extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="calendar">
			</div>
		);
	}
}

export default Calendar;

Calendar.propTypes = {
	handleClickMe: PropTypes.func,
};
