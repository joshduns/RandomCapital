const capitalsList = require('./Capitals.js')
const capitals = capitalsList.capitals


const randomLat = () => {
    let coord = Math.random() * 90;
    const direction_integer = Math.floor(Math.random() * 2);
    if (direction_integer === 1) {
        coord = coord * -1;
    }
    return coord
};

const randomLong = () => {
    let coord = Math.random() * 180;
    const direction_integer = Math.floor(Math.random() * 2);
    if (direction_integer === 1) {
        coord = coord * -1;
    }
    return coord
};

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
};

// This function will create a random lat/long and search for the closest world capital.
const findRandomCapital = () => {
    const lat = randomLat();
    const long = randomLong();
    let closestDistance;
    let closestCapital;
    for (i=0; i < capitals.length; i++) {
        let capital = capitals[i];
        let capLat = capital.attributes.LATITUDE;
        let capLong = capital.attributes.LONGITUDE;
        let d = distance(lat, long, capLat, capLong, 'M');
        if (closestDistance === undefined || d < closestDistance) {
            console.log(`${capital.attributes.CITY} is closer. ${d} < ${closestDistance}`)
            closestDistance = d;
            closestCapital = capital;
        }
    }
    return `The input lat/long was ${lat.toFixed(2)}\u00B0, ${long.toFixed(2)}\u00B0. The closest world capital is ${closestCapital.attributes.CITY}, ${closestCapital.attributes.COUNTRY} which is ${closestDistance.toFixed(1)} miles away.`
}

// This function will take a user defined lat/long and search for the closest world capital.
const findClosestCapital = (lat, long) => {
    let closestDistance;
    let closestCapital;
    for (i=0; i < capitals.length; i++) {
        let capital = capitals[i];
        let capLat = capital.attributes.LATITUDE;
        let capLong = capital.attributes.LONGITUDE;
        let d = distance(lat, long, capLat, capLong, 'M');
        if (closestDistance === undefined || d < closestDistance) {
            console.log(`${capital.attributes.CITY} is closer. ${d} < ${closestDistance}`)
            closestDistance = d;
            closestCapital = capital;
        }
    }
    return `The input lat/long was ${lat.toFixed(2)}\u00B0, ${long.toFixed(2)}\u00B0. The closest world capital is ${closestCapital.attributes.CITY}, ${closestCapital.attributes.COUNTRY} which is ${closestDistance.toFixed(1)} miles away.`
}

console.log(findRandomCapital());


