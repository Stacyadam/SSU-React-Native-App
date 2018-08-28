import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import SSUIcon from '../shared/icons/SSUIcon';
import UiSettings from '../../config/UiSettings';

const { greyThree, orange } = UiSettings.styles.colors;

class Coupon extends Component {
	render() {
		const { item } = this.props;

		const image = item.locations[0] ? item.locations[0].banner || item.locations[0].logo : '';
		const name = item.locations[0] ? item.locations[0].name : '';

		return (
			<View
				style={{ flex: 1, padding: 10, flexDirection: 'row', alignItems: 'center' }}
				onPress={() => this.goToDetails()}
			>
				<Image source={{ uri: image }} style={{ height: 70, width: 65, borderRadius: 10, marginRight: 10 }} />
				<View style={{ justifyContent: 'flex-start', paddingVertical: 4, width: '65%' }}>
					<Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{name}</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<SSUIcon name="gift" size={24} color={orange} />
						<Text style={{ color: orange, marginLeft: 10 }}>{this.figureOutOffer(item)}</Text>
					</View>
				</View>
			</View>
		);
	}

	getImage() {
		const { item } = this.props;
		if (!item.locations[0]) return;
		if (item.locations[0].banner) {
			return item.locations[0].banner;
		} else if (item.locations[0].logo) {
			return item.locations[0].logo;
		}
	}

	getName() {
		const { item } = this.props;
		if (!item.locations[0]) return;
		if (item.locations[0].name) {
			return item.locations[0].name;
		}
	}

	figureOutOffer(offer) {
		if (offer.dollar_amount_detail) {
			return offer.dollar_amount_detail.description;
		} else if (offer.percentage_off_detail) {
			return offer.percentage_off_detail.description;
		} else if (offer.product_detail) {
			return offer.product_detail.description;
		} else {
			return offer.promo_code_detail.title;
		}
	}
}

const styles = StyleSheet.create({});

export default Coupon;
