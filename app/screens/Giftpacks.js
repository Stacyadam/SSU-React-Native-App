import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Picker, TextInput, FlatList, Linking } from 'react-native';
import StandardHeader from '../components/headers/StandardHeader';
import UiSettings from '../config/UiSettings';
import Divider from '../components/shared/Divider';
import SelectList from '../components/shared/SelectList';
import ModalSelector from 'react-native-modal-selector';
import CouponList from '../components/giftpacks/CouponList';
import { getUserGiftpacks } from '../actions/GiftpackActions';

const { greySix, orange, greyFive, greyTwo } = UiSettings.styles.colors;

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

			const giftPackListData = this.props.userGiftPacks
				.map(({ giftPackName, giftPackPrice }, i) => {
					return {
						id: i,
						giftPackName,
						giftPackPrice: giftPackPrice
					};
				})
				.filter(({ giftPackPrice }) => giftPackPrice !== undefined);

			this.setState({ giftPackListData });
		}
	}

	state = {
		giftPackNames: [],
		giftPackOffers: [],
		textInputValue: '',
		index: 0,
		selectedIndex: 0,
		giftPackListData: []
	};

	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		console.log(this.setState.giftPackListData);
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
					<Text>Loading</Text>
				</View>
			);
		} else {
			return (
				<View>
					<StandardHeader title="GIFT PACKS" navigator={this.props.navigator} />
					<OptionsWrapper style={{ paddingVertical: 10 }}>
						<Option index={0} onPress={() => this.setState({ selectedIndex: 0 })}>
							My Offers
						</Option>
						<Option index={1} onPress={() => this.setState({ selectedIndex: 1 })}>
							Shop
						</Option>
						<Option index={2} onPress={() => this.setState({ selectedIndex: 2 })}>
							Help
						</Option>
					</OptionsWrapper>
					<Divider color={orange} width={2.5} />
					{this.state.selectedIndex === 0 && (
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
										placeholder="All Available Offers"
										value={this.state.textInputValue}
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
							<View style={{ backgroundColor: 'papayawhip', height: 165, width: '100%' }} />
							<Divider color={orange} width={2.5} />
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
									width: '100%',
									height: 200,
									marginLeft: 6,
									alignItems: 'center'
								}}
							>
								<FlatList
									data={this.state.giftPackListData}
									horizontal
									keyExtractor={item => item.id.toString()}
									ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
									renderItem={({ item }) => (
										<View style={{ alignItems: 'center', justifyContent: 'center' }}>
											<TouchableOpacity
												style={{ backgroundColor: 'brown', height: 160, width: 125 }}
												onPress={() =>
													Linking.openURL('https://www.smallshopsunited.com/giftpacks/shop')
												}
											>
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
														${parseInt(item.giftPackPrice)}
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
												{item.giftPackName}
											</Text>
										</View>
									)}
								/>
							</View>
						</View>
					)}
				</View>
			);
		}
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
	userGiftPacks: state.giftPacks.userGiftPacks,
	token: state.account.token,
	loading: state.global.loading
});

const mapDispatchToProps = dispatch => ({
	getUserGiftpacks: token => dispatch(getUserGiftpacks(token))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Giftpacks);
