import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import StandardHeader from '../components/headers/StandardHeader';

class Home extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		return (
			<View>
				<StandardHeader title="Home" navigator={this.props.navigator} />
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default Home;
