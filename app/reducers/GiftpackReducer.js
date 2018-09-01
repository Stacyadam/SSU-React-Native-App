import { SAVE_USER_GIFTPACKS, SAVE_GIFTPACK } from '../types';
import { convertMilitaryTime, getOfferDetails, dayString, getDistance } from '../utilities';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case SAVE_USER_GIFTPACKS: {
			const giftPacksArray = action.payload.giftpacks.map(i => {
				return {
					giftPackName: i.gift_pack.name,
					giftPackPrice: i.gift_pack.price,
					giftPackOffers: i.gift_pack.gift_pack_offers
						.map(i => {
							return {
								locationName: i.location_name,
								locationImage: i.location_image,
								...(i.offer.promo_code_detail && { isPromoCode: true }),
								rules: i.offer.redemption_rules,
								offerDetails: getOfferDetails(i.offer),
								locations: i.offer.locations
									.map(
										({
											name,
											address,
											city,
											state,
											zip,
											neighborhood,
											phone,
											latitude,
											longitude,
											hours
										}) => {
											const userLat = action.payload.userLocation.latitude;
											const userLon = action.payload.userLocation.longitude;
											const distance = getDistance(userLat, userLon, latitude, longitude);

											return {
												name,
												address: `${address}, ${city}, ${state} ${zip}`,
												neighborhood,
												phone,
												distance,
												latitude,
												longitude,
												hours: hours.map(({ day, open, close }) => {
													return {
														day: dayString(day),
														open,
														openString: convertMilitaryTime(open),
														close,
														closeString: convertMilitaryTime(close)
													};
												})
											};
										}
									)
									.sort((a, b) => {
										if (a.distance && b.distance) {
											return a.distance - b.distance;
										}
									})
							};
						})
						.sort((a, b) => {
							if (a.locations.length && b.locations.length) {
								return a.locations[0].distance - b.locations[0].distance;
							}
						})
				};
			});

			const allOffers = giftPacksArray.map(g => g.giftPackOffers);
			const combinedGiftPacks = {
				giftPackName: 'All Available Offers',
				giftPackOffers: [].concat(...allOffers).sort((a, b) => {
					if (a.locations.length && b.locations.length) {
						return a.locations[0].distance - b.locations[0].distance;
					}
				})
			};
			const giftPacks = [combinedGiftPacks, ...giftPacksArray];
			return {
				...state,
				userGiftPacks: giftPacks
			};
		}

		case SAVE_GIFTPACK: {
			return {
				...state,
				giftPack: action.payload
			};
		}

		default:
			return state;
	}
};
