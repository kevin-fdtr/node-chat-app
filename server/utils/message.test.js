var expect = require('expect');

var {generateMessage} = require('./message');

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