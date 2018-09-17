import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native';
import Divider from '../shared/Divider';
import Coupon from './Coupon';
import UiSettings from '../../config/UiSettings';
import { getUserGiftpacks } from '../../actions/GiftpackActions';
import * as GlobalActions from '../../actions/GlobalActions';

const { greyThree } = UiSettings.styles.colors;

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
					refreshing={this.props.refreshing}
					onRefresh={() => this.props.getUserGiftpacks()}
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
					refreshing={this.props.refreshing}
					onRefresh={() => this.props.getUserGiftpacks()}
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

const mapStateToProps = state => ({
	refreshing: state.global.refreshing
});

const mapDispatchToProps = dispatch => ({
	getUserGiftpacks: async () => {
		dispatch(GlobalActions.toggleRefreshing(true));
		await dispatch(getUserGiftpacks());
		dispatch(GlobalActions.toggleRefreshing(false));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CouponList);
