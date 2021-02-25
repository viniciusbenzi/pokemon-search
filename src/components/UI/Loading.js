import React, { Component } from 'react'
import PubSub from 'pubsub-js'
//import { Edit } from '@material-ui/icons';

const styleCurtain = {
	position: 'fixed',
	top: '0',
	width: '100%',
	height: '100vh',
	background: 'rgb(224, 31, 31)',
	zIndex: 1000,
	textAlign: 'center'
}

const styleGif = {
	position: 'absolute',
	width: '400px',
	left: '50%',
	top: '50%',
	marginTop: '-160px',
	marginLeft: '-200px'
}


export default class Loading extends Component {

	constructor() {
		super();

		this.state = {
			loading: true
		}
	}

	componentDidMount() {
		PubSub.subscribe('loading', function(name, value) {
			this.setState({
				loading: value
			});
		}.bind(this));
	}

	render() {
		return(
			<div>
				{this.state.loading ? 
					<div style={styleCurtain}>
						<img style={styleGif} src="/assets/loading/poke.gif" alt="Loading..." />
					</div>
				: null}
			</div>
		);
	}
}