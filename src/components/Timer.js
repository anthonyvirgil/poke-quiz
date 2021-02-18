import { Component } from 'react';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.onGameOver = props.callback;
		this.state = {
			seconds: parseInt(props.seconds) || 60,
		};
	}

	countdown() {
		let timeRemaining = this.state.seconds - 1;
		this.setState((state) => ({
			seconds: timeRemaining,
		}));

		if (timeRemaining <= 0) {
			clearInterval(this.interval);

			this.onGameOver(true);
		}
	}

	componentDidMount() {
		this.interval = setInterval(() => this.countdown(), 1000);
	}

	componentWillUnmount() {}

	formatTime(secs) {
		let hours = Math.floor(secs / 3600);
		let minutes = Math.floor(secs / 60) % 60;
		let seconds = secs % 60;
		return [hours, minutes, seconds]
			.map((v) => ('' + v).padStart(2, '0'))
			.filter((v, i) => v !== '00' || i > 0)
			.join(':');
	}

	render() {
		return <div>Timer: {this.formatTime(this.state.seconds)}</div>;
	}
}

export default Timer;
