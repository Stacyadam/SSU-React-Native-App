import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Divider from '../shared/Divider';
import Coupon from './Coupon';
import UiSettings from '../../config/UiSettings';

const { greyThree } = UiSettings.styles.colors;

class CouponList extends Component {
	render() {
		const { data } = this.props;
		return (
			<FlatList
				data={data}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => this.goToDetails(item)}>
						<Coupon item={item} />
					</TouchableOpacity>
				)}
				ItemSeparatorComponent={() => <Divider color={greyThree} width={2.5} />}
			/>
		);
	}

	goToDetails(item) {
		this.props.navigator.showModal({
			screen: 'SSU.CouponDetailsModal',
			passProps: { item }
		});
	}
}

const styles = StyleSheet.create({});

export default CouponList;
