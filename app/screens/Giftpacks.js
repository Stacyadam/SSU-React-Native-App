import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	FlatList,
	Linking,
	ActivityIndicator,
	Image
} from 'react-native';
import Dimensions from 'Dimensions';
import StandardHeader from '../components/headers/StandardHeader';
import UiSettings from '../config/UiSettings';
import Divider from '../components/shared/Divider';
import ModalSelector from 'react-native-modal-selector';
import CouponList from '../components/giftpacks/CouponList';
import SSUIcon from '../components/shared/icons/SSUIcon';
import { getUserGiftpacks, getAvailableGiftPacks } from '../actions/GiftpackActions';
import AsyncImage from '../components/shared/AsyncImage';

const { width } = Dimensions.get('window');
const { greySix, orange, greyFive } = UiSettings.styles.colors;

class Giftpacks extends Component {
	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent({ id }) {
		if (id === 'willAppear') {
			if (!this.props.userGiftPacks.length) this.props.getUserGiftpacks(this.props.token);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.userGiftPacks !== this.props.userGiftPacks) {
			const giftPackNames = this.props.userGiftPacks.map((g, i) => ({ key: i, label: g.giftPackName }));
			const giftPackOffers = this.props.userGiftPacks.map(g => g.giftPackOffers);

			this.setState({ giftPackNames });
			this.setState({ giftPackOffers });
		}
		if (prevProps.availableGiftPacks !== this.props.availableGiftPacks) {
			const { availableGiftPacks } = this.props;
			this.setState({ availableGiftPacks });
		}
	}

	state = {
		availableGiftPacks: [],
		giftPackNames: [],
		giftPackOffers: [],
		textInputValue: '',
		index: 0,
		selectedIndex: 0
	};

	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		const OptionsWrapper = ({ children, style }) => <View style={[styles.optionsWrapper, style]}>{children}</View>;
		const Option = ({ children, onPress, index }) => {
			const { selectedIndex } = this.state;
			return (
				<TouchableOpacity onPress={() => onPress()}>
					<Text style={[selectedIndex === index && { color: orange, fontWeight: 'bold' }]}>{children}</Text>
				</TouchableOpacity>
			);
		};

		if (this.props.loading) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" color={orange} animating={this.props.loading} />
				</View>
			);
		} else {
			return (
				<View>
					<StandardHeader title="GIFT PACKS" navigator={this.props.navigator} />
					<OptionsWrapper
						style={[{ paddingVertical: 10 }, !this.props.hasGiftPacks && { paddingHorizontal: 70 }]}
					>
						{this.props.hasGiftPacks && (
							<Option index={0} onPress={() => this.setState({ selectedIndex: 0 })}>
								My Offers
							</Option>
						)}
						<Option index={1} onPress={() => this.getAvailableGiftPacks(this.props.token)}>
							Shop
						</Option>
						<Option index={2} onPress={() => this.setState({ selectedIndex: 2 })}>
							Help
						</Option>
					</OptionsWrapper>
					<Divider color={orange} width={2.5} />
					{this.state.selectedIndex === 0 &&
						this.props.hasGiftPacks && (
							<View>
								<View style={{ padding: 20 }}>
									<ModalSelector
										optionTextStyle={{ color: greySix }}
										optionContainerStyle={{ backgroundColor: orange }}
										selectTextStyle={{ color: '#FFF' }}
										selectedItemTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
										data={this.state.giftPackNames}
										initValue="All Available Offers"
										onChange={option => {
											this.setState({ textInputValue: option.label, index: option.key });
										}}
									>
										<TextInput
											style={{
												backgroundColor: orange,
												borderRadius: 10,
												paddingLeft: 20,
												height: 30,
												color: '#FFF'
											}}
											editable={false}
											placeholderTextColor="#FFF"
											placeholder="All Available Offers"
											value={this.state.textInputValue}
										/>
										<SSUIcon
											name="chevron-down"
											size={12}
											color="#FFF"
											style={{ position: 'absolute', top: 8, right: 20 }}
										/>
									</ModalSelector>
								</View>
								<Divider color={orange} width={2.5} />
								<CouponList
									data={this.state.giftPackOffers[this.state.index]}
									navigator={this.props.navigator}
								/>
							</View>
						)}
					{this.state.selectedIndex === 1 && (
						<View>
							<AsyncImage
								source={require('../assets/giftpacks_shop_banner.png')}
								style={{ height: 150, width }}
								resizeMode="contain"
								spinnerSize="small"
							/>

							<Divider color={orange} width={2.5} style={{ marginTop: 8 }} />
							<Text
								style={{
									color: greyFive,
									textAlign: 'center',
									fontSize: 18,
									fontWeight: 'bold',
									marginVertical: 10
								}}
							>
								Gift Pack Products
							</Text>
							<View
								style={{
									width,
									height: 200,
									marginLeft: 6,
									alignItems: 'center'
								}}
							>
								<FlatList
									data={this.state.availableGiftPacks}
									horizontal
									keyExtractor={item => item.id.toString()}
									ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
									renderItem={({ item }) => (
										<View style={{ alignItems: 'center', justifyContent: 'center' }}>
											<TouchableOpacity
												style={{ height: 160, width: 125 }}
												onPress={() =>
													Linking.openURL('https://www.smallshopsunited.com/giftpacks/shop')
												}
											>
												<Image
													style={{ height: 160, width: 125 }}
													source={require('../assets/generic_GP.png')}
												/>
												<View
													style={{
														position: 'absolute',
														top: 20,
														right: 4,
														backgroundColor: orange,
														padding: 4,
														width: 40,
														height: 40,
														borderRadius: 50,
														justifyContent: 'center'
													}}
												>
													<Text
														style={{
															color: '#FFF',
															fontSize: 14,
															textAlign: 'center',
															fontWeight: 'bold'
														}}
													>
														${parseInt(item.price)}
													</Text>
												</View>
											</TouchableOpacity>
											<Text
												style={{
													marginVertical: 4,
													color: greySix,
													fontSize: 16,
													textAlign: 'center',
													width: '80%'
												}}
											>
												{item.name}
											</Text>
										</View>
									)}
								/>
							</View>
						</View>
					)}
					{this.state.selectedIndex === 2 && (
						<View style={{ padding: 24 }}>
							<Text style={{ color: greySix, fontWeight: 'bold' }}>How do I redeem in-store offers?</Text>
							<Text style={{ marginBottom: 20 }}>
								Simply provide each merchant your member card or your account phone number at the
								point-of purchase when ready to cash in on their offer.
							</Text>
							<Text style={{ color: greySix, fontWeight: 'bold' }}>How do I redeem online offers?</Text>
							<Text style={{ marginBottom: 20 }}>
								First get your online promo code for the offer, copy it, then follow the link to the
								merchant's website to apply the code when making your purchase.
							</Text>
							<Text style={{ color: greySix, fontWeight: 'bold' }}>
								How many times can I use each offer?
							</Text>
							<Text style={{ marginBottom: 20 }}>
								Each offer is valid one-time unless otherwise specified.
							</Text>
						</View>
					)}
				</View>
			);
		}
	}

	getAvailableGiftPacks(token) {
		this.setState({ selectedIndex: 1 });
		this.props.getAvailableGiftPacks(token);
	}
}

const styles = StyleSheet.create({
	optionsWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 40
	},
	selected: {
		color: orange,
		fontWeight: 'bold'
	},
	unSelected: {
		color: greySix
	}
});

const mapStateToProps = state => ({
	availableGiftPacks: state.giftPacks.availableGiftPacks,
	userGiftPacks: state.giftPacks.userGiftPacks,
	hasGiftPacks: state.giftPacks.hasGiftPacks,
	token: state.account.token,
	loading: state.global.loading
});

const mapDispatchToProps = dispatch => ({
	getUserGiftpacks: token => dispatch(getUserGiftpacks(token)),
	getAvailableGiftPacks: token => {
		dispatch(getAvailableGiftPacks(token));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Giftpacks);
