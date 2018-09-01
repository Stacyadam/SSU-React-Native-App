import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Divider from '../shared/Divider';
import Coupon from './Coupon';
import UiSettings from '../../config/UiSettings';

const { greyThree } = UiSettings.styles.colors;
const { deviceHeight } = UiSettings;

class CouponList extends Component {
	render() {
		const { data } = this.props;
		return (
			<FlatList
				style={{ marginBottom: deviceHeight / 3.25 }}
				data={data}
				keyExtractor={item => item.locationName}
				ItemSeparatorComponent={() => <Divider color={greyThree} width={2.5} />}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => this.goToDetails(item)}>
						<Coupon item={item} />
					</TouchableOpacity>
				)}
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
