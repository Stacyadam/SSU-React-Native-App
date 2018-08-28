import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import StandardHeader from '../components/headers/StandardHeader';

class Settings extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		return (
			<View>
				<StandardHeader title="Settings" navigator={this.props.navigator} />
			</View>
		);
	}
}

const styles = StyleSheet.create({

});

export default Settings;