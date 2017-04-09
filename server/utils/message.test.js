var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Kevin';
        var text = 'A message';
        var res = generateMessage(from, text);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({
            from,
            text
        });
        // expect(res.from).toBe(from);
        // expect(res.text).toBe(text);
    });
});
describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var from = 'Kevin';
        var latitude = 987;
        var longitude = 123;
        var res = generateLocationMessage(from, latitude, longitude);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({
            from,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`
        });
    });
});