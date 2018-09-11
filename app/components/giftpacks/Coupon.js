import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AsyncImage from '../shared/AsyncImage';
import SSUIcon from '../shared/icons/SSUIcon';
import UiSettings from '../../config/UiSettings';

const { greyThree, orange } = UiSettings.styles.colors;

class Coupon extends Component {
	render() {
		const {
			item: { locationImage, locationName, offerDetails, locations, isPromoCode }
		} = this.props;
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
					<Text style={{ fontSize: 18, fontFamily: 'Omnes-Regular', fontWeight: 'bold', marginBottom: 8 }}>
						{locationName}
					</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
						<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 16, color: orange }}>{offerDetails}</Text>
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
						<Text style={{ fontFamily: 'Omnes-Regular', color: '#FFF', fontSize: 9, textAlign: 'center' }}>
							Get Promo Code
						</Text>
					</View>
				)}

				{locations.length && locations[0].distance ? (
					<View style={{ position: 'absolute', top: 10, right: 8 }}>
						<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 11 }}>{locations[0].distance} mi</Text>
					</View>
				) : (
					<View>
						<Text />
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default Coupon;
