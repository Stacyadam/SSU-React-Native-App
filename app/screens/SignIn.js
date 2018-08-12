import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';

class SignIn extends Component {
	state = {
		text: ''
	};
	render() {
		return (
			<View>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={text => this.setState({ text })}
					value={this.state.text}
				/>
				<Button backgroundColor="#03A9F4" title="Sign Up" onPress={() => console.log('hi')} />
			</View>
		);
	}
}

export default SignIn;
