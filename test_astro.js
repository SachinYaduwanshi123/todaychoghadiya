const Astronomy = require('astronomy-engine');

function getPanchang(date) {
    const sunVector = Astronomy.GeoVector(Astronomy.Body.Sun, date, true);
    const moonVector = Astronomy.GeoVector(Astronomy.Body.Moon, date, true);
    
    const sunEcl = Astronomy.Ecliptic(sunVector);
    const moonEcl = Astronomy.Ecliptic(moonVector);
    
    // Moon - Sun
    let diff = moonEcl.elon - sunEcl.elon;
    if (diff < 0) diff += 360;
    
    const tithiIndex = Math.floor(diff / 12);
    const nakshatraIndex = Math.floor(moonEcl.elon / (360 / 27));
    
    let sum = moonEcl.elon + sunEcl.elon;
    if (sum >= 360) sum -= 360;
    const yogaIndex = Math.floor(sum / (360 / 27));
    
    const karanaIndex = Math.floor(diff / 6);
    
    return {
        sun_lon: sunEcl.elon,
        moon_lon: moonEcl.elon,
        tithiIndex,
        nakshatraIndex,
        yogaIndex,
        karanaIndex
    };
}

console.log(getPanchang(new Date()));
