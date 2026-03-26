const Astronomy = require('astronomy-engine');

function getTithiRatio(date) {
    const sun = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Sun, date, true));
    const moon = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Moon, date, true));
    let diff = moon.elon - sun.elon;
    if (diff < 0) diff += 360;
    return diff / 12;
}

function findTithiEnd(startDate) {
    let current = startDate.getTime();
    const startTithi = Math.floor(getTithiRatio(startDate));
    
    // Jump in 1 hr intervals to find the hour it changes (max 30 hours)
    let endHour = current;
    for(let i=1; i<=30; i++) {
        const d = new Date(current + i * 3600000);
        const t = Math.floor(getTithiRatio(d));
        if (t !== startTithi) {
            endHour = current + (i-1) * 3600000;
            break;
        }
    }
    
    // Now we are within 1 hour before the change. Step by minute.
    for(let m=1; m<=60; m++) {
        const d = new Date(endHour + m * 60000);
        const t = Math.floor(getTithiRatio(d));
        if (t !== startTithi) {
            return d;
        }
    }
    return new Date(endHour + 3600000); // fallback
}

const now = new Date();
console.log("Current Tithi Index:", Math.floor(getTithiRatio(now)));
console.log("Ends at:", findTithiEnd(now));
