let twoLetterISO = [
    "ae","ar","at","au","be","bg","br","ca","ch","cn","co","cu","cz","de","eg",
    "fr","gb","gr","hk","hu","id","ie","il","in","it","jp","kr","lt","lv","ma",
    "mx","my","ng","nl","no","nz","ph","pl","pt","ro","rs",
    "ru","sa","se","sg","si","sk","th","tr","tw","ua","us","ve","za"
];

var isoCountries = {
    'AE': 'United Arab Emirates',
    'AR': 'Argentina',
    'AT': 'Austria',
    'AU': 'Australia',
    'BE': 'Belgium',
    'BG': 'Bulgaria',
    'BR': 'Brazil',
    'CA': 'Canada',
    'CH': 'Switzerland',
    'CN': 'China',
    'CO': 'Colombia',
    'CU': 'Cuba',
    'CZ': 'Czech Republic',
    'DE': 'Germany',
    'EG': 'Egypt',
    'FR': 'France',
    'GB': 'United Kingdom',
    'GR': 'Greece',
    'HK': 'Hong Kong',
    'HU': 'Hungary',
    'ID': 'Indonesia',
    'IE': 'Ireland',
    'IL': 'Israel',
    'IN': 'India',
    'IT': 'Italy',
    'JP': 'Japan',
    'KR': 'Korea',
    'LT': 'Lithuania',
    'LV': 'Latvia',
    'MA': 'Morocco',
    'MX': 'Mexico',
    'MY': 'Malaysia',
    'NG': 'Nigeria',
    'NL': 'Netherlands',
    'NO': 'Norway',
    'NZ': 'New Zealand',
    
};

let countries = []; 

twoLetterISO.forEach(element => {
    let obj = {
        iso_2_alpha: element,
        png: `https://flagcdn.com/24x18/${element}.png`,
        countryName: getCountryName(element.toUpperCase()),
    };
    countries.push(obj); 
});

// Limit to only 12 countries
countries = countries.slice(0, 12);

function getCountryName(countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

console.log(countries);

export default countries;
