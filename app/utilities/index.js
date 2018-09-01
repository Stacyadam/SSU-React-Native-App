export const convertMilitaryTime = time => {
	time = time.split(':');
	const hours = time[0];
	const minutes = time[1];
	if (hours > 0 && hours < 12) {
		return `${hours}:${minutes} A.M.`;
	} else if (hours == 12) {
		return `${hours}:${minutes} P.M.`;
	} else if (hours >= 13) {
		return `${hours - 12}:${minutes} P.M.`;
	} else if (hours == 0) {
		return `12:00 A.M.`;
	}
};

export const getOfferDetails = offer => {
	if (offer.dollar_amount_detail) {
		return offer.dollar_amount_detail.description;
	} else if (offer.percentage_off_detail) {
		return offer.percentage_off_detail.description;
	} else if (offer.product_detail) {
		return offer.product_detail.description;
	} else if (offer.promo_code_detail) {
		return offer.promo_code_detail.title;
	}
};

export const dayString = day => {
	if (day === 0) {
		return 'Monday';
	} else if (day === 1) {
		return 'Tuesday';
	} else if (day === 2) {
		return 'Wednesday';
	} else if (day === 3) {
		return 'Thursday';
	} else if (day === 4) {
		return 'Friday';
	} else if (day === 5) {
		return 'Saturday';
	} else if (day === 6) {
		return 'Sunday';
	}
};

export const getDistance = (lat1, lon1, lat2, lon2) => {	
	var p = 0.017453292519943295;    
	var c = Math.cos;
	var a = 0.5 - c((lat2 - lat1) * p)/2 + 
			c(lat1 * p) * c(lat2 * p) * 
			(1 - c((lon2 - lon1) * p))/2;
  
	return ((12742 * Math.asin(Math.sqrt(a))) * 0.62137119).toFixed(1);
};