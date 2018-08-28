import { Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');

let UiSettings = {
	styles: {
		colors: {
			white: '#FFF',
			errorRed: '#cc0000',
			greyOne: '#F3F3EF',
			greyTwo: '#D4CFC7',
			greyThree: '#BCB5AC',
			greyFour: '#A0998F',
			greyFive: '#746D65',
			greySix: '#383127',
			green: '#61BF68',
			darkGreen: '#52AB58',
			blue: '#3EACC9',
			darkBlue: '#3298B3',
			orange: '#FE9024',
			darkOrange: '#E87819'
		},
		sizing: {
			inputHeight: 35
		},
		defaultPadding: width * 0.04,
		smallPadding: width * 0.02,
		xsmallPadding: width * 0.01
	},
	deviceHeight: height,
	deviceWidth: width,
	drawerWidth: width * 0.87,
	customerService: '18002102370',
	appTechSupport: '18332445729',
	otaStagingKey:
		Platform.OS == 'ios'
			? 'Lo5s1iZoVNyogarEi6-0krfqoXe1c6fe5586-ffc9-47f5-ad84-ae31325735ca'
			: '_HR_z7Ih-c0THJV_y7vu1nYgknI4rJN4zheJ7',
	pickupDescription:
		'Confirmation receipt and photo ID necessary for pickup at front desk or at drive-thru. You will be notified via e-mail when your order is ready for pickup.',
	states: {
		Alabama: 'AL',
		Alaska: 'AK',
		Arizona: 'AZ',
		Arkansas: 'AR',
		California: 'CA',
		Colorado: 'CO',
		Connecticut: 'CT',
		Delaware: 'DE',
		'District Of Columbia': 'DC',
		Florida: 'FL',
		Georgia: 'GA',
		Hawaii: 'HI',
		Idaho: 'ID',
		Illinois: 'IL',
		Indiana: 'IN',
		Iowa: 'IA',
		Kansas: 'KS',
		Kentucky: 'KY',
		Louisiana: 'LA',
		Maine: 'ME',
		Maryland: 'MD',
		Massachusetts: 'MA',
		Michigan: 'MI',
		Minnesota: 'MN',
		Mississippi: 'MS',
		Missouri: 'MO',
		Montana: 'MT',
		Nebraska: 'NE',
		Nevada: 'NV',
		'New Hampshire': 'NH',
		'New Jersey': 'NJ',
		'New Mexico': 'NW',
		'New York': 'NY',
		'North Carolina': 'NC',
		'North Dakota': 'ND',
		Ohio: 'OH',
		Oklahoma: 'OK',
		Oregon: 'OR',
		Pennsylvania: 'PA',
		'Rhode Island': 'RI',
		'South Carolina': 'SC',
		'South Dakota': 'SD',
		Tennessee: 'TN',
		Texas: 'TX',
		Utah: 'UT',
		Vermont: 'VT',
		Virginia: 'VA',
		Washington: 'WA',
		'West Virginia': 'WV',
		Wisconsin: 'WI',
		Wyoming: 'WY'
	}
};

UiSettings.defaultNavBarStyles = {
	navBarBackgroundColor: UiSettings.styles.colors.lightGrey,
	navBarButtonColor: UiSettings.styles.colors.darkBlue,
	navBarTextColor: UiSettings.styles.colors.darkBlue
};

export default UiSettings;
