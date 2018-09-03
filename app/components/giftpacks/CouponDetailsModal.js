import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList,
	Platform,
	Linking,
	ScrollView,
	Clipboard
} from 'react-native';
import call from 'react-native-phone-call';
import ModalSelector from 'react-native-modal-selector';
import MapView from 'react-native-maps';
import ModalHeader from '../headers/ModalHeader';
import AsyncImage from '../shared/AsyncImage';
import Button from '../shared/buttons/Button';
import SSUIcon from '../shared/icons/SSUIcon';
import Divider from '../shared/Divider';
import TransparentModal from '../modals/TransparentModal.js';
import UiSettings from '../../config/UiSettings';

const { blue, errorRed, orange, greyTwo, greySix, greyThree, greyFive, greyFour, greyOne } = UiSettings.styles.colors;

class CouponDetailsModal extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	state = {
		open: false,
		clipboardContent: '',
		today: null,
		todaysHours: null,
		selectedLocation: { ...this.props.item.locations[0] },
		showHoursModal: false
	};

	componentWillMount() {
		const week = new Date().getDay();
		const today = week === 0 ? 6 : week - 1;

		this.setState({ today });

		const time = new Date();
		const now = `${time.getHours()}${time.getMinutes()}`;

		const todaysHours = this.state.selectedLocation.hours.find(e => e.day === today);
		this.setState({ todaysHours });

		if (todaysHours) {
			const open = todaysHours.open.replace(':', '');
			const close = todaysHours.close.replace(':', '');

			if (now > open && now < close) {
				this.setState({ open: true });
			}
		} else {
			console.log('this is hitting the else');
			this.setState({ open: false });
		}
	}

	render() {
		const {
			item: { locationName, locationImage, offerDetails, rules }
		} = this.props;

		const locationHours = this.state.selectedLocation.hours;

		return (
			<View style={{ flex: 1 }}>
				<ModalHeader title={locationName} navigator={this.props.navigator} />
				<ScrollView>
					<AsyncImage
						spinnerSize="large"
						source={{ uri: locationImage }}
						style={{ height: 165, width: '100%', marginTop: 1 }}
					/>
					<View
						style={{
							paddingVertical: 10,
							paddingLeft: 16,
							borderBottomColor: greyTwo,
							borderBottomWidth: 3
						}}
					>
						<Text style={{ fontSize: 22, marginBottom: 6 }}>{locationName}</Text>
						<TouchableOpacity
							onPress={() => this.showHoursModal()}
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							{this.renderHours()}
							<SSUIcon name="caret-down" size={18} color={orange} style={{ marginLeft: 4 }} />
						</TouchableOpacity>
					</View>
					<MapView
						initialRegion={{
							latitude: this.state.selectedLocation.latitude,
							longitude: this.state.selectedLocation.longitude,
							latitudeDelta: 0.05,
							longitudeDelta: 0.05
						}}
						region={{
							latitude: this.state.selectedLocation.latitude,
							longitude: this.state.selectedLocation.longitude,
							latitudeDelta: 0.05,
							longitudeDelta: 0.05
						}}
						style={{ width: '100%', height: 75 }}
					>
						<MapView.Marker
							coordinate={{
								latitude: this.state.selectedLocation.latitude,
								longitude: this.state.selectedLocation.longitude
							}}
							image={require('../../assets/FFStorePin.png')}
						/>
					</MapView>
					{this.renderAddress()}
					<View
						style={{
							display: 'flex',
							borderTopColor: greyTwo,
							borderTopWidth: 3,
							paddingVertical: 4,
							paddingHorizontal: 10,
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<TouchableOpacity
							style={{ flexDirection: 'row', alignItems: 'center' }}
							onPress={() => call({ number: this.state.selectedLocation.phone }).catch(console.error)}
						>
							<SSUIcon name="phone" size={28} color={greyFive} style={{ marginLeft: 4 }} />
							<View style={{ marginLeft: 10 }}>
								<Text>Call</Text>
								<Text style={{ color: greyFour }}>
									{this.formatPhoneNumber(this.state.selectedLocation.phone)}
								</Text>
							</View>
						</TouchableOpacity>
						<View style={{ borderLeftColor: greyTwo, borderLeftWidth: 2.5, marginVertical: 2 }} />
						<TouchableOpacity
							style={{ flexDirection: 'row', alignItems: 'center' }}
							onPress={() => this.getDirections()}
						>
							<SSUIcon name="car" size={28} color={greyFive} style={{ marginLeft: 4 }} />
							<View style={{ marginLeft: 10 }}>
								<Text>Get Directions</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View
						style={{
							borderTopColor: greyTwo,
							borderTopWidth: 3,
							paddingVertical: 4,
							paddingHorizontal: 10
						}}
					>
						{this.props.item.isPromoCode ? (
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
									<Text style={{ color: orange }}>YOUR UNIQUE</Text>
									<Text style={{ color: orange }}>PROMOTIONAL CODE</Text>
								</View>
								<TouchableOpacity
									onPress={async () => await Clipboard.setString(this.props.item.promoCode)}
									style={{
										borderColor: greyThree,
										borderWidth: 1,
										paddingVertical: 10,
										paddingHorizontal: 26,
										alignItems: 'center'
									}}
								>
									<Text style={{ color: blue, fontWeight: 'bold' }}>{this.props.item.promoCode}</Text>
									<View style={{ backgroundColor: '#FFF', position: 'absolute', bottom: -4.5 }}>
										<Text style={{ fontSize: 8, color: orange }}>Copy to clipboard</Text>
									</View>
								</TouchableOpacity>

								<Button
									onPress={() => Linking.openURL(this.props.item.locationWebsite)}
									height={10}
									fontSize={14}
								>
									Go To Purchase
								</Button>
							</View>
						) : (
							<View style={{ flexDirection: 'row' }}>
								<SSUIcon name="check" size={28} color={orange} style={{ marginLeft: 4 }} />
								<View style={{ marginLeft: 10 }}>
									<Text style={{ color: orange }}>Loyalty Offer</Text>
									<Text style={{ fontSize: 12, marginBottom: 10 }}>{offerDetails}</Text>
									<Text style={{ color: orange }}>Conditions:</Text>
									<Text style={{ fontSize: 12 }}>{rules}</Text>
								</View>
							</View>
						)}
					</View>
					<TransparentModal visible={this.state.showHoursModal}>
						<View
							style={{
								height: '50%',
								width: '90%',
								backgroundColor: '#FFF',
								borderRadius: 10,
								padding: 16
							}}
						>
							<FlatList
								data={locationHours}
								keyExtractor={item => item.day.toString()}
								ItemSeparatorComponent={() => (
									<Divider color={greyTwo} width={2} style={{ marginVertical: 6 }} />
								)}
								renderItem={({ item }) => (
									<View
										style={{
											flexDirection: 'row'
										}}
									>
										<Text style={{ flex: 1.1, color: orange, fontWeight: 'bold' }}>
											{item.dayString}:
										</Text>
										<Text style={{ flex: 1.75, color: greySix, fontWeight: 'normal' }}>
											{item.openString} - {item.closeString}
										</Text>
									</View>
								)}
							/>
							<TouchableOpacity
								onPress={() => this.setState({ showHoursModal: false })}
								style={{ backgroundColor: orange, paddingVertical: 8, marginHorizontal: 50 }}
							>
								<Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Close</Text>
							</TouchableOpacity>
						</View>
					</TransparentModal>
				</ScrollView>
			</View>
		);
	}

	renderHours() {
		const { open, todaysHours } = this.state;

		if (open) {
			return (
				<Text style={{ fontSize: 12, fontWeight: 'bold', color: blue }}>
					Open{' '}
					<Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black' }}>
						until {todaysHours.closeString}
					</Text>
				</Text>
			);
		} else {
			return <Text style={{ fontSize: 12, fontWeight: 'bold', color: errorRed }}>Closed</Text>;
		}
	}

	renderAddress() {
		const {
			item: { locations }
		} = this.props;

		const data = locations.map((location, i) => ({
			key: i,
			label: location.name,
			location
		}));

		if (locations.length > 1) {
			return (
				<ModalSelector
					optionTextStyle={{ color: greySix }}
					optionContainerStyle={{ backgroundColor: orange }}
					selectTextStyle={{ color: '#FFF' }}
					selectedItemTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
					initValue={this.state.selectedLocation.name}
					data={data}
					onChange={option => {
						this.setState({
							selectedLocation: { ...option.location }
						});
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							borderTopColor: greyTwo,
							borderTopWidth: 3,
							paddingVertical: 4,
							paddingLeft: 10,
							justifyContent: 'flex-start'
						}}
					>
						<View style={{ flex: 2 }}>
							<Text style={{ fontSize: 12 }}>{this.state.selectedLocation.address}</Text>
							<Text style={{ fontSize: 12, color: greyThree }}>
								{this.state.selectedLocation.neighborhood}
							</Text>
						</View>
						<SSUIcon name="caret-down" size={30} color={orange} style={{ flex: 0.2, marginTop: -4 }} />
					</View>
				</ModalSelector>
			);
		} else {
			return (
				<View
					style={{
						flexDirection: 'row',
						borderTopColor: greyTwo,
						borderTopWidth: 3,
						paddingVertical: 4,
						paddingLeft: 10
					}}
				>
					<View>
						<Text style={{ fontSize: 12 }}>{this.state.selectedLocation.address}</Text>
						<Text style={{ fontSize: 12, color: greyThree }}>
							{this.state.selectedLocation.neighborhood}
						</Text>
					</View>
				</View>
			);
		}
	}

	formatPhoneNumber(number) {
		const match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
		return `(${match[1]})${match[2]}-${match[3]}`;
	}

	getDirections() {
		const lat = this.state.selectedLocation.latitude;
		const lng = this.state.selectedLocation.longitude;
		const name = this.state.selectedLocation.name.replace('&', 'and');

		const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
		const latLng = `${lat},${lng}`;
		const label = name;
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`
		});

		Linking.openURL(url);
	}

	showHoursModal() {
		const {
			item: { locations }
		} = this.props;

		const locationHours = this.state.selectedLocation.hours;

		this.setState({ showHoursModal: true });
	}
}

const styles = StyleSheet.create({});

export default CouponDetailsModal;
