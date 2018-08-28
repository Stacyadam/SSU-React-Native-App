import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import ModalHeader from '../components/headers/ModalHeader';

class CouponDetailsModal extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		const { item } = this.props;
		const name = item.locations[0] ? item.locations[0].name : '';
		const image = item.locations[0] ? item.locations[0].banner || item.locations[0].logo : '';
		console.log(item);
		return (
			<View>
				<ModalHeader title={name} navigator={this.props.navigator} />
				<Image source={{ uri: image }} style={{ height: 200, width: '100%', marginTop: 1 }} />
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default CouponDetailsModal;
