import { expect } from 'chai';


describe('Math functions', function() {
    const a = 4;
    const b = 5;
    const c = 9;
    const d = -1;

    it.skip('A + B = C', function() {
        expect(a - b).to.eq(9);
    })
    it.only('A - B = D', function() {
        expect(d).to.eq(a - b);
    })


})