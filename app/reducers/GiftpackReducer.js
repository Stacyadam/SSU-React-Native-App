import { SAVE_USER_GIFTPACKS, SAVE_GIFTPACK, SAVE_AVAILABLE_GIFTPACKS } from '../types';
import { convertMilitaryTime, getOfferDetails, dayString, getDistance } from '../utilities';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case SAVE_USER_GIFTPACKS: {
			if (!action.payload.giftpacks.length) {
				return {
					...state,
					hasGiftPacks: false
				};
			}

			console.log(action.payload.giftpacks);

			const giftPacksArray = action.payload.giftpacks.map(i => {
				return {
					giftPackName: i.gift_pack.name,
					giftPackPrice: i.gift_pack.price,
					giftPackOffers: i.gift_pack.gift_pack_offers
						.filter(({ offer }) => offer.locations.length > 0)
						.map(i => {
							return {
								locationName: i.location_name,
								locationImage: i.location_image,
								locationWebsite: i.location_website,
								...(i.offer.promo_code_detail && {
									isPromoCode: true,
									promoCode: i.offer.promo_code_detail.code
								}),

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
											let distance = '';
											if (action.payload.userLocation) {
												const userLat = action.payload.userLocation.latitude;
												const userLon = action.payload.userLocation.longitude;
												distance = getDistance(userLat, userLon, latitude, longitude);
											}

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
														day,
														dayString: dayString(day),
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

			const hasOfferRedemptions = action.payload.giftpacks.some(gp => gp.offer_redemptions.length > 0);

			if (hasOfferRedemptions) {
				const redeemedOffersArray = action.payload.giftpacks.map(gp => {
					if (gp.offer_redemptions.length) {
						gp.offer_redemptions.map(g => {
							return {
								locationName: g.gift_pack_offer.location_name,
								locationImage: g.gift_pack_offer.location_image,
								offerDetails: getOfferDetails(g.gift_pack_offer.offer)
							};
						});
					}
				});

				const redeemedOffers = {
					giftPackName: 'Redeemed Offers',
					giftPackOffers: redeemedOffersArray
				};

				giftPacks.push(redeemedOffers);
			}

			return {
				...state,
				userGiftPacks: giftPacks,
				hasGiftPacks: true
			};
		}

		case SAVE_AVAILABLE_GIFTPACKS: {
			const availableGiftPacks = action.payload
				.filter(({ inactive }) => inactive !== 1)
				.map(({ id, name, price }) => ({ id, name, price }));
			return {
				...state,
				availableGiftPacks
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
