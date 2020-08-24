
// Get the appropriate URL depending on where this is being hosted
const getSysUrl = () => {
	if(location.hostname == 'localhost') return 'http://localhost:3000';
	else return 'https://final-frontend.herokuapp.com';
}

// Same, but for backend
const getBackUrl = () => {
	if(location.hostname == 'localhost') return 'http://localhost:3500';
	else return 'https://tasx-backend.herokuapp.com';
}

document.querySelector('.calendarLink').href = getBackUrl();
