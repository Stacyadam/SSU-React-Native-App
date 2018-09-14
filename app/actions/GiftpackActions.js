import { SAVE_AVAILABLE_GIFTPACKS, SAVE_USER_GIFTPACKS } from '../types';
import * as GlobalActions from './GlobalActions';
import * as AccountActions from './AccountActions';
import api from '../utilities/api';

export function getUserGiftpacks(permission) {
	return async dispatch => {
		try {
			let {
				data: { user_gift_packs }
			} = await api.get(
				'/users/me?expand[userGiftPacks.offerRedemptions]=*&expand[userGiftPacks.offerRedemptions.giftPackOffer]=*&expand[userGiftPacks.offerRedemptions.giftPackOffer.offer.dollarAmountDetail]=*&expand[userGiftPacks.offerRedemptions.giftPackOffer.offer.dollarAmountDetail]=*' +
					'&expand[userGiftPacks.offerRedemptions.giftPackOffer.offer.sportPromoDetail]=*&expand[userGiftPacks.offerRedemptions.giftPackOffer.offer.promoCodeDetail]=*&expand[userGiftPacks.offerRedemptions.giftPackOffer.offer.percentageOffDetail]=*&expand[userGiftPacks.giftPack]=*' +
					'&expand[userGiftPacks.giftPack.giftPackOffers]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.availableTimes]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.productDetail]=*' +
					'&expand[userGiftPacks.giftPack.giftPackOffers.offer.dollarAmountDetail]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.sportPromoDetail]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.promoCodeDetail]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.percentageOffDetail]=*' +
					'&expand[userGiftPacks.giftPack.giftPackOffers.offer.locations]=*&expand[userGiftPacks.giftPack.giftPackOffers.offer.locations.hours]=*'
			);
			user_gift_packs = user_gift_packs.filter(gp => gp.gift_pack !== null);

			if (permission === 'denied') {
				dispatch(saveUserGiftpacks(user_gift_packs, false));
			}
			navigator.geolocation.getCurrentPosition(
				({ coords: { latitude, longitude }, timestamp }) => {
					const userLocation = { timestamp, latitude, longitude };
					//TODO: this isn't working
					//AccountActions.setUserLocation(userLocation);
					dispatch(saveUserGiftpacks(user_gift_packs, userLocation));
					dispatch(GlobalActions.toggleLoading(false));
					return { user_gift_packs, userLocation };
				},
				e => e,
				{ maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
			);
			return user_gift_packs;
		} catch (e) {
			//TODO: this should update the global error object in state with e.response and then display something to the user.
			return e;
		}
	};
}

export function getAvailableGiftPacks() {
	return async dispatch => {
		try {
			const {
				data: { data }
			} = await api.get('/gift-packs');
			dispatch(saveAvailableGiftPacks(data));
			return true;
		} catch (e) {
			console.log(e.response);
			return e;
		}
	};
}

export function saveAvailableGiftPacks(availableGiftPacks) {
	return {
		type: SAVE_AVAILABLE_GIFTPACKS,
		payload: availableGiftPacks
	};
}

export function saveUserGiftpacks(giftpacks, userLocation) {
	return {
		type: SAVE_USER_GIFTPACKS,
		payload: { giftpacks, userLocation }
	};
}
