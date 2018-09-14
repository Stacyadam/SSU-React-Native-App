import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native';
import Divider from '../shared/Divider';
import Coupon from './Coupon';
import UiSettings from '../../config/UiSettings';

const { greyThree } = UiSettings.styles.colors;
const { deviceHeight } = UiSettings;

class CouponList extends Component {
	render() {
		const { data } = this.props;

		const isRedeemed = this.props.data && this.props.data.some(el => el.redeemed === true);

		if (!isRedeemed) {
			return (
				<FlatList
					style={{ marginBottom: 350 }}
					data={data}
					keyExtractor={item => item.locationImage}
					ItemSeparatorComponent={() => <Divider color={greyThree} width={2.5} />}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => this.goToDetails(item)}>
							<Coupon item={item} />
						</TouchableOpacity>
					)}
				/>
			);
		} else {
			return (
				<FlatList
					style={{ marginBottom: 350 }}
					data={data}
					keyExtractor={item => item.locationImage}
					ItemSeparatorComponent={() => <Divider color={greyThree} width={2.5} />}
					renderItem={({ item }) => <Coupon redeemed={true} item={item} />}
				/>
			);
		}
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
