var generateMessage = (from, text) => {
    if (from && text) {
        return {from, text, createdAt: new Date().getTime()};
    } else {
        return null;
    }
};

var generateLocationMessage = (from, latitude, longitude) => {
    if (from && latitude && longitude) {

        return {
            from, 
            url: `https://www.google.com/maps?q=${latitude},${longitude}`,
            createdAt: new Date().getTime()};
    } else {
        return null;
    }
};

module.exports = {generateMessage, generateLocationMessage};
