import { SAVE_USER_GIFTPACKS, SAVE_GIFTPACK } from '../types';
import * as GlobalActions from './GlobalActions';
import axios from 'axios';

export function getUserGiftpacks(token) {
	return async dispatch => {
		try {
			dispatch(GlobalActions.toggleLoading(true));
			const {
				data: { user_gift_packs }
			} = await axios.get(
				`https://dev-api.smallshopsunited.com/v4/users/me?expand[userGiftPacks.offerRedemptions]=*&expand[userGiftPacks.offerRedemptions.detail]=*&expand[userGiftPacks.offerRedemptions.giftPackOffer]=*&expand[userGiftPacks.giftPack]=*&expand[userGiftPacks.giftPack.offers]=*&expand[userGiftPacks.giftPack.offers.availableTimes]=*&expand[userGiftPacks.giftPack.offers.productDetail]=*&expand[userGiftPacks.giftPack.offers.dollarAmountDetail]=*&expand[userGiftPacks.giftPack.offers.sportPromoDetail]=*&expand[userGiftPacks.giftPack.offers.promoCodeDetail]=*&expand[userGiftPacks.giftPack.offers.percentageOffDetail]=*&expand[userGiftPacks.giftPack.offers.locations]=*&expand[userGiftPacks.giftPack.offers.locations.hours]=*`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			dispatch(saveUserGiftpacks(user_gift_packs));
			dispatch(GlobalActions.toggleLoading(false));
			//dispatch(getGiftpack('2018-family-pack', token));
			return user_gift_packs;
		} catch (e) {
			console.log(e);
			return e;
		}
	};
}

export function getGiftpack(giftpackName, token) {
	return async dispatch => {
		try {
			const {
				data: { data }
			} = await axios.get(
				`https://dev-api.smallshopsunited.com/v4/gift-packs?expand[giftPackOffers]=*&expand[giftPackOffers.giftPack]=*&expand[giftPackOffers.offer]=*&expand[giftPackOffers.offer.availableTimes]=*&expand[giftPackOffers.offer.productDetail]=*&expand[giftPackOffers.offer.dollarAmountDetail]=*&expand[giftPackOffers.offer.sportPromoDetail]=*&expand[giftPackOffers.offer.promoCodeDetail]=*&expand[giftPackOffers.offer.percentageOffDetail]=*&expand[giftPackOffers.offer.locations]=*&expand[giftPackOffers.offer.locations.hours]=*&filter[slug]=${giftpackName}`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			dispatch(saveGiftpack(data));
			return data;
		} catch (e) {
			console.log(e);
			return e;
		}
	};
}

export function saveGiftpack(giftpack) {
	return {
		type: SAVE_GIFTPACK,
		payload: giftpack
	};
}

export function saveUserGiftpacks(giftpacks) {
	return {
		type: SAVE_USER_GIFTPACKS,
		payload: giftpacks
	};
}
