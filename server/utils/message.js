var generateMessage = (from, text) => {
    if (from && text) {
        return {from, text, createdAt: new Date().getTime()};
    } else {
        return null;
    }
};

module.exports = {generateMessage};
