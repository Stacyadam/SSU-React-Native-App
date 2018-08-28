import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import StandardHeader from '../components/headers/StandardHeader';
import UiSettings from '../config/UiSettings';
import Divider from '../components/shared/Divider';
import DropList from '../components/shared/DropList';
import CouponList from '../components/giftpacks/CouponList';
import { getUserGiftpacks } from '../actions/GiftpackActions';

const { greySix, orange } = UiSettings.styles.colors;

class Giftpacks extends Component {
	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent({ id }) {
		if (id === 'willAppear') {
			if (!this.props.giftPacks.userGiftPacks.length) this.props.getUserGiftpacks(this.props.token);
		}
	}

	//use getDerivedStateFromProps(props, state) instead
	componentWillReceiveProps(nextProps) {
		if (nextProps.giftPacks.userGiftPacks.length) {
			const names = nextProps.giftPacks.userGiftPacks.map(({ gift_pack }) => gift_pack.name);
			const offers = nextProps.giftPacks.userGiftPacks.map(({ gift_pack }) => gift_pack.offers);
			console.log('offers', offers);

			this.setState({ giftPackNames: names });
			this.setState({ giftPackOffers: offers });
		}
	}

	state = {
		giftPackNames: [],
		giftPackOffers: []
	};

	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		const OptionsWrapper = ({ children, style }) => <View style={[styles.optionsWrapper, style]}>{children}</View>;
		const Option = ({ children, selected }) => {
			return (
				<TouchableOpacity>
					<Text style={[selected ? styles.selected : styles.unSelected]}>{children}</Text>
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
				<View style={{ marginBottom: 200 }}>
					<StandardHeader title="GIFT PACKS" navigator={this.props.navigator} />
					<OptionsWrapper style={{ paddingVertical: 10 }}>
						<Option selected>My Offers</Option>
						<Option>Shop</Option>
						<Option>Help</Option>
					</OptionsWrapper>
					<Divider color={orange} width={2.5} />
					<View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
						<DropList
							defaultValue="All Offers"
							options={[...this.state.giftPackNames]}
							onSelect={e => console.log(e)}
						/>
					</View>
					<Divider color={orange} width={2.5} />
					<CouponList data={this.state.giftPackOffers[1]} navigator={this.props.navigator} />
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
	giftPacks: state.giftPacks,
	user: state.account.user,
	token: state.account.token,
	loading: state.global.loading
});

const mapDispatchToProps = dispatch => ({
	getUserGiftpacks: token => {
		dispatch(getUserGiftpacks(token));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Giftpacks);
