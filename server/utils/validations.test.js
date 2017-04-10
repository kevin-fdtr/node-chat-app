var expect = require('expect');

var {isRealString} = require('./validations');

describe('isRealString', () => {
    it('should only accept string', () => {
        var res = isRealString(123);
        expect(res).toBe(false);
        var res = isRealString({id: 123});
        expect(res).toBe(false);
        var res = isRealString(true);
        expect(res).toBe(false);
    });
    it('should not accept a string of spaces', () => {
        var res = isRealString('    ');
        expect(res).toBe(false);
    });
    it('should accpet a string', () => {
        var res = isRealString('string');
        expect(res).toBe(true);
    });
    it('should accpet a string with leading spaces', () => {
        var res = isRealString('  string  ');
        expect(res).toBe(true);
    });
});