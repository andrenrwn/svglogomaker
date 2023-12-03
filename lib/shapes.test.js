import { Shape } from 'shapes.js';

// A testing suite for Arithmetic is created.
describe('Shape basic test', () => {
    // A test is created to check that quotient does in fact return the quotient of the two numbers.
    describe('Shape exists', () => {
        it('shape object exists', () => {
            const myshape = new Shape;
            const myshapetype = typeof(myshape);
            expect(myshapetype).toEqual('object');
        });
    });
});