import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import UiSettings from '../../config/UiSettings';

const { orange } = UiSettings.styles.colors;

class AsyncImage extends Component {
	state = { loading: true };

	render() {
		const { source, style, spinnerSize, resizeMode } = this.props;

		return (
			<View>
				<Image style={style} source={source} onLoadEnd={() => this.setState({ loading: false })} />
				<ActivityIndicator
					size={spinnerSize}
					color={orange}
					animating={this.state.loading}
					resizeMode={resizeMode}
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				/>
			</View>
		);
	}
}

export default AsyncImage;
