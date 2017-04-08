module.exports.createMessage = ({from, text}) => {
    if (from && text) {
        return {from, text, createdAt: new Date()};
    } else {
        return null;
    }
};
