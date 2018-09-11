import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import StandardHeader from '../components/headers/StandardHeader';
import UiSettings from '../config/UiSettings';
import SSUIcon from '../components/shared/icons/SSUIcon';

const { orange, blue, greyFour } = UiSettings.styles.colors;

class Home extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	state = {
		index: 0
	};

	render() {
		const GiftPacks = () => (
			<View>
				<TouchableOpacity
					onPress={() =>
						this.props.navigator.switchToTab({
							tabIndex: 1
						})
					}
				>
					<Image
						source={require('../assets/home_gift_packs.png')}
						style={{ width: null, height: 135 }}
						resizeMode="contain"
					/>
					<View style={{ marginTop: -24, paddingHorizontal: 50 }}>
						<Text style={{ color: orange, textAlign: 'center', fontSize: 18, marginBottom: 8 }}>
							<Text style={{ fontWeight: 'bold' }}>SMALL SHOPS</Text> Gift Packs
						</Text>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 13,
								fontFamily: 'Omnes-Regular',
								marginBottom: 8
							}}
						>
							Get instant savings from great local spots and the coolest attractions in your community.
						</Text>
						<Text style={{ color: blue, textAlign: 'center', fontWeight: 'bold' }}>Get Started</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.setState({ index: 1 })}
					style={{ position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' }}
				>
					<SSUIcon name="chevron-right" size={24} color={greyFour} />
				</TouchableOpacity>
			</View>
		);

		const Loyalty = () => (
			<View>
				<TouchableOpacity onPress={() => Linking.openURL('https://www.smallshopsunited.com/loyalty')}>
					<Image
						source={require('../assets/home_loyalty.png')}
						style={{ width: null, height: 110, marginTop: 20 }}
						resizeMode="contain"
					/>
					<View style={{ paddingHorizontal: 50 }}>
						<Text style={{ color: orange, textAlign: 'center', fontSize: 18, marginBottom: 8 }}>
							<Text style={{ fontWeight: 'bold' }}>SMALL SHOPS</Text> Loyalty
						</Text>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 13,
								fontFamily: 'Omnes-Regular',
								marginBottom: 8
							}}
						>
							Earn daily rewards with every purchase at participating small businesses.
						</Text>
						<Text style={{ color: blue, textAlign: 'center', fontWeight: 'bold' }}>Learn More</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.setState({ index: 0 })}
					style={{ position: 'absolute', left: 14, top: 0, bottom: 0, justifyContent: 'center' }}
				>
					<SSUIcon name="chevron-left" size={24} color={greyFour} />
				</TouchableOpacity>
			</View>
		);

		return (
			<View>
				<StandardHeader title="SMALL SHOPS UNITED" navigator={this.props.navigator} />
				<View>
					<Image
						source={require('../assets/home_thank_you.jpg')}
						style={{ width: '100%', height: 220, marginRight: 4 }}
					/>
					{this.state.index === 0 && <GiftPacks />}
					{this.state.index === 1 && <Loyalty />}
				</View>
			</View>
		);
	}
}

export default Home;
