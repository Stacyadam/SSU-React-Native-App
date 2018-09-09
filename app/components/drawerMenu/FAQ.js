import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/shared/buttons/Button';
import Divider from '../shared/Divider';
import SSUIcon from '../shared/icons/SSUIcon';
import ModalHeader from '../headers/ModalHeader';

import UiSettings from '../../config/UiSettings';

const { greyOne, greyTwo, errorRed, orange, greySix, greyFive, blue } = UiSettings.styles.colors;

class FAQ extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	state = {
		showLoyaltyQuestions: true,
		showGiftPacksQuestions: true
	};

	loyaltyQuestions = [
		{
			q: 'How do I earn loyalty points?',
			a:
				'Provide each merchant your account phone number or member card to earn credits with every in-store purchase.'
		},
		{
			q: 'How do I redeem my rewards?',
			a:
				'Once you have created your member account, provide your account phone number or member card at the point of purchase, and let the merchant know you want to redeem your credits. Just be aware that each business sets the rules for their own loyalty program, so there may be some restrictions on when or how much you can redeem at any one time.'
		},
		{
			q: 'Can I earn new points when I redeem rewards?',
			a:
				'Yes, if you already have a member account, you’ll have the option to skip the shipping process and immediately add a Gift Pack directly to your account during Checkout.'
		},
		{
			q: 'Where can I use my loyalty credits?',
			a:
				"Credits earned with one merchant may only be redeemed with that same merchant; however, businesses with multiple locations may choose to 'group' their locations, in which case credits may be earned and redeemed interchangeably across locations."
		}
	];

	giftPackQuestions = [
		{
			q: 'What is a Gift Pack?',
			a:
				'A Gift Pack is a collection of one-time offers from local businesses and popular attractions in the community. What makes them special is that we never deal with physical coupons. All offers can be redeemed in-stores using a single member card (included), or just your phone number.'
		},
		{
			q: 'How do I activate my Gift Pack?',
			a:
				'Go to www.smallshopsunited.com/activate, then simply follow the prompts to redeem your code and link your new card.'
		},
		{
			q: 'Can I add a Gift Pack directly to my member account?',
			a:
				'Yes, provided the purchase amount is larger than the amount you’re redeeming, of course. (Example: A member redeeming $10 on a $25 purchase will earn new points on the $15 spent after discount)'
		},
		{
			q: 'How frequently can I redeem each Gift Pack offer?',
			a:
				'Generally speaking, each offer may be redeemed one time during the calendar year. However, there are some offers in our sports package that may be used multiple times throughout the season.'
		},
		{
			q: 'How do I redeem my Gift Pack offers?',
			a:
				'For in-store offers, cash in on your savings by providing your member card or your account phone number at the point of purchase. For online offers, first open the offer in your member account, then generate your unique promo code. Then apply your promo code when making your purchase on the vendor’s site.'
		},
		{
			q: 'How do I send Gift Packs to friends?',
			a:
				'We strongly recommend that you have all Gift Packs first shipped to your own address, then distribute to friends as you see fit. We do not provide gift messaging at this time.'
		},
		{
			q: 'How many Gift Packs can I add to my account?',
			a:
				'Individuals are allowed to activate one of each type of Gift Pack in their account per year. For example; in 2018 a member can have one each of the Restaurant Pack, the Family Pack, and the Sports Pack. A member can never have two of any particular Gift Pack in their account.'
		},
		{
			q: 'What is your return policy?',
			a: 'We cannot accept returns of this product.'
		}
	];

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ModalHeader title="FAQ" navigator={this.props.navigator} />
				<ScrollView style={{ padding: 20, flex: 1 }}>
					<View style={{ paddingHorizontal: 30, marginTop: 10, marginBottom: 20 }}>
						<Text style={{ fontSize: 20, textAlign: 'center', color: greySix }}>
							FREQUENTLY ASKED QUESTIONS
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => this.setState({ showLoyaltyQuestions: !this.state.showLoyaltyQuestions })}
					>
						<View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
							<Text
								style={{
									color: orange,
									textAlign: 'center',
									fontSize: 16,
									marginBottom: 10,
									fontWeight: 'bold'
								}}
							>
								LOYALTY SERVICES
							</Text>
							<SSUIcon
								name={this.state.showLoyaltyQuestions ? 'chevron-up' : 'chevron-down'}
								size={14}
								color={orange}
								style={{ marginLeft: 5 }}
							/>
						</View>
					</TouchableOpacity>
					{this.state.showLoyaltyQuestions && this.renderLoyaltyQuestions()}
					<TouchableOpacity
						onPress={() => this.setState({ showGiftPacksQuestions: !this.state.showGiftPacksQuestions })}
					>
						<View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
							<Text
								style={{
									color: orange,
									textAlign: 'center',
									fontSize: 16,
									marginBottom: 10,
									fontWeight: 'bold'
								}}
							>
								GIFT PACKS
							</Text>
							<SSUIcon
								name={this.state.showGiftPacksQuestions ? 'chevron-up' : 'chevron-down'}
								size={14}
								color={orange}
								style={{ marginLeft: 5 }}
							/>
						</View>
					</TouchableOpacity>
					<View style={{ marginBottom: 20 }}>
						{this.state.showGiftPacksQuestions && this.renderGiftPacksQuestions()}
					</View>
				</ScrollView>
			</View>
		);
	}

	renderLoyaltyQuestions() {
		return this.loyaltyQuestions.map(({ q, a }, i) => (
			<View key={i} style={{ marginBottom: 10 }}>
				<Text style={{ color: blue, fontWeight: 'bold', marginBottom: 5 }}>{q}</Text>
				<Text style={{ color: greySix }}>{a}</Text>
			</View>
		));
	}

	renderGiftPacksQuestions() {
		return this.giftPackQuestions.map(({ q, a }, i) => (
			<View key={i} style={{ marginBottom: 10 }}>
				<Text style={{ color: blue, fontWeight: 'bold', marginBottom: 5 }}>{q}</Text>
				<Text style={{ color: greySix }}>{a}</Text>
			</View>
		));
	}
}

export default FAQ;
