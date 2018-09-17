import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AsyncImage from '../shared/AsyncImage';
import SSUIcon from '../shared/icons/SSUIcon';
import UiSettings from '../../config/UiSettings';

const { greyThree, orange, errorRed } = UiSettings.styles.colors;

class Coupon extends Component {
	render() {
		const {
			redeemed,
			item: { locationImage, locationName, offerDetails, locations, isPromoCode, redeemedOn }
		} = this.props;

		if (!redeemed) {
			return (
				<View
					style={{ flex: 1, padding: 10, flexDirection: 'row', alignItems: 'center' }}
					onPress={() => this.goToDetails()}
				>
					<AsyncImage
						source={{ uri: locationImage }}
						style={{ height: 70, width: 65, borderRadius: 10, marginRight: 10 }}
						spinnerSize="small"
					/>
					<View style={{ height: '100%', justifyContent: 'flex-start', paddingVertical: 4, width: '65%' }}>
						<Text
							style={{ fontSize: 18, fontFamily: 'Omnes-Regular', fontWeight: 'bold', marginBottom: 8 }}
						>
							{locationName}
						</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
							<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 16, color: orange }}>
								{offerDetails}
							</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 12, marginRight: 4 }}>
								View more information & restrictions
							</Text>
							<SSUIcon name="caret-down" size={14} color={orange} />
						</View>
					</View>
					{isPromoCode && (
						<View
							style={{
								position: 'absolute',
								right: 4,
								bottom: '34%',
								backgroundColor: orange,
								width: 40,
								borderRadius: 50,
								padding: 6
							}}
						>
							<Text
								style={{ fontFamily: 'Omnes-Regular', color: '#FFF', fontSize: 9, textAlign: 'center' }}
							>
								Get Promo Code
							</Text>
						</View>
					)}

					{locations.length && locations[0].distance ? (
						<View style={{ position: 'absolute', top: 10, right: 8 }}>
							<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 11 }}>
								{locations[0].distance} mi
							</Text>
						</View>
					) : (
						<View>
							<Text />
						</View>
					)}
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1, padding: 10, paddingRight: 0, flexDirection: 'row', alignItems: 'center' }}>
					<AsyncImage
						source={{ uri: locationImage }}
						style={{ height: 70, width: 65, borderRadius: 10, marginRight: 10 }}
						spinnerSize="small"
					/>
					<View style={{ height: '100%', justifyContent: 'flex-start', paddingVertical: 4, width: '75%' }}>
						<Text
							style={{ fontSize: 18, fontFamily: 'Omnes-Regular', fontWeight: 'bold', marginBottom: 8 }}
						>
							{locationName}
						</Text>
						<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 16, marginBottom: 6, color: greyThree }}>
							{offerDetails}
						</Text>
						<Text
							style={{ fontFamily: 'Omnes-Regular', fontWeight: 'bold', fontSize: 14, color: errorRed }}
						>
							Offer Redeemed on {new Date(redeemedOn).toLocaleDateString('en-US')}
						</Text>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({});

export default Coupon;
