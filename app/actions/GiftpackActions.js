import { SAVE_USER_GIFTPACKS } from '../types';
import * as GlobalActions from './GlobalActions';
import * as AccountActions from './AccountActions';

import axios from 'axios';

export function getUserGiftpacks(token) {
	return async dispatch => {
		try {
			dispatch(GlobalActions.toggleLoading(true));
			const {
				data: { user_gift_packs }
			} = await axios.get(
				`https://dev-api.smallshopsunited.com/v4/users/me?expand[userGiftPacks.offerRedemptions]=*&expand[userGiftPacks.offerRedemptions.detail]=*&expand[userGiftPacks.offerRedemptions.giftPackOffer]=*&expand[userGiftPacks.giftPack]=*&expand[userGiftPacks.giftPack.giftPackOffers]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.availableTimes]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.productDetail]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.dollarAmountDetail]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.sportPromoDetail]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.promoCodeDetail]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.percentageOffDetail]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.locations]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.locations.hours]=*`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			console.log(user_gift_packs);
			navigator.geolocation.getCurrentPosition(
				({ coords: { latitude, longitude }, timestamp }) => {
					const userLocation = { timestamp, latitude, longitude };
					console.log(userLocation);
					AccountActions.setUserLocation(userLocation);
					dispatch(saveUserGiftpacks(user_gift_packs, userLocation));
					dispatch(GlobalActions.toggleLoading(false));
					return { user_gift_packs, userLocation };
				},
				e => e,
				{ maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
			);
		} catch (e) {
			//TODO: this should update the global error object in state with e.response and then display something to the user.
			console.log(e.response);
			return e;
		}
	};
}

export function saveUserGiftpacks(giftpacks, userLocation) {
	return {
		type: SAVE_USER_GIFTPACKS,
		payload: { giftpacks, userLocation }
	};
}
