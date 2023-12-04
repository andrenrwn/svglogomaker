// Use this in your terminal:
// $ NODE_OPTIONS="--experimental-vm-modules npx jest"
// $ export NODE_OPTIONS

import { Logo, Shape, Rectangle, Square, Ellipse, Circle, Triangle, Polygon, Text } from '../lib/shapes.mjs';

// A testing suite for the Shape class
describe('Shape object test', () => {
    it('shape object exists', () => {
        let myshape = new Shape;
        let myshapetype = typeof (myshape);
        expect(myshapetype).toEqual('object');
    });
    it('Shape.render() should return an empty string', () => {
        let myshape = new Shape;
        expect(myshape.render()).toMatch("");
    });
    it('Shape.renderattr() should not contain undefined: class properties via deconstructed constructor params', () => {
        let myshape = new Shape;
        expect(myshape.renderattr().toLowerCase()).not.toMatch(/"undefined"/);
    });
});

// A testing suite for the Triangle class
describe('Triangle object test', () => {
    it('Triangle object exists', () => {
        let myshape = new Triangle;
        let myshapetype = typeof (myshape);
        expect(myshapetype).toEqual('object');
    });
    it('Triangle.render() should contain <polygon.../> with three points', () => {
        let myshape = new Triangle;
        let myregex = /^<polygon\s+.*?points="\s*?(?:\d+?,\s+\d+?\s+){2}(?:\d+?,\s+\d+?\s*?").*?\/>/; // matches three coordinates
        expect(myshape.render()).toMatch(myregex);
    });
    it('Triangle.setColor() result in the correct fill value', () => {
        let myshape = new Triangle;
        const mycolor = "Orange";
        myshape.setColor(mycolor);
        let myrender = myshape.render();
        let myfill = myrender.match(/^<polygon.*?(?:\s+fill\s*?=\s*?"(.+?)").*\/>/)[1];
        expect(mycolor).toMatch(myfill);
    });
    it('Triangle.render() should not contain undefined', () => {
        let myshape = new Triangle;
        expect(myshape.render().toLowerCase()).not.toMatch(/"undefined"/);
    });
});

// A testing suite for the Square class
describe('Square object test', () => {
    it('Square object exists', () => {
        let myshape = new Square;
        let myshapetype = typeof (myshape);
        expect(myshapetype).toEqual('object');
    });
    it('Square.render() should contain <rect.../>', () => {
        let myshape = new Square;
        expect(myshape.render()).toMatch(/^<rect\s+?.*/);
    });
    it('Square.render() should have equal height and width', () => {
        let myshape = new Square;
        let myrender = myshape.render();
        let myheight = myrender.match(/^<rect.*?(?:\s+height\s*?=\s*?"(.+?)").*\/>/)[1];
        let mywidth = myrender.match(/^<rect.*?(?:\s+width\s*?=\s*?"(.+?)").*\/>/)[1];
        expect(myheight).toMatch(mywidth);
    });
    it('Square.setColor() result in the correct fill value', () => {
        let myshape = new Square;
        const mycolor = "Navy";
        myshape.setColor(mycolor);
        let myrender = myshape.render();
        let myfill = myrender.match(/^<rect.*?(?:\s+fill\s*?=\s*?"(.+?)").*\/>/)[1];
        expect(mycolor).toMatch(myfill);
    });
    it('Square.render() should not contain undefined', () => {
        let myshape = new Square;
        expect(myshape.render().toLowerCase()).not.toMatch(/"undefined"/);
    });
});

// A testing suite for the Circle class
describe('Circle object test', () => {
    it('Circle object exists', () => {
        let myshape = new Circle;
        let myshapetype = typeof (myshape);
        expect(myshapetype).toEqual('object');
    });
    it('Circle.render() should contain <circle.../>', () => {
        let myshape = new Circle;
        let myregex = /^<circle\s+.*\/>/; // matches three coordinates
        expect(myshape.render()).toMatch(myregex);
    });
    it('Circle.render() should contain cx, cy, and r', () => {
        let myshape = new Circle;
        let myrender = myshape.render();
        expect(myrender.match(/^<circle\s+.*?cx\s*=\s*".*\/>/) &&
            myrender.match(/^<circle\s+.*?cy\s*=\s*".*\/>/) &&
            myrender.match(/^<circle\s+.*?r\s*=\s*".*\/>/)
        ).toBeTruthy();
    });
    it('Circle.setColor() result in the correct fill value', () => {
        let myshape = new Circle;
        const mycolor = "Yellow";
        myshape.setColor(mycolor);
        let myrender = myshape.render();
        let myfill = myrender.match(/^<circle.*?(?:\s+fill\s*?=\s*?"(.+?)").*\/>/)[1];
        expect(mycolor).toMatch(myfill);
    });
    it('Circle.render() should not contain undefined', () => {
        let myshape = new Circle;
        expect(myshape.render().toLowerCase()).not.toMatch(/"undefined"/);
    });
});

// A testing suite for the Polygon class
describe('Polygon object test', () => {
    it('Polygon object exists', () => {
        let myshape = new Polygon;
        let myshapetype = typeof (myshape);
        expect(myshapetype).toEqual('object');
    });
    it('Polygon.render() should contain <polygon.../> with multiple points (at least one)', () => {
        let myshape = new Polygon;
        let myregex = /^<polygon\s+.*?points\s*=\s*"\s*?(?:\d+?,\s+\d+?\s+){0,}(?:\d+?,\s+\d+?\s*?").*\/>/; // matches multiple x, y points with spaces in between
        expect(myshape.render()).toMatch(myregex);
    });
    it('Polygon.setColor() result in the correct fill value', () => {
        let myshape = new Polygon;
        const mycolor = "Green";
        myshape.setColor(mycolor);
        let myrender = myshape.render();
        let myfill = myrender.match(/^<polygon.*?(?:\s+fill\s*?=\s*?"(.+?)").*\/>/)[1];
        expect(mycolor).toMatch(myfill);
    });
    it('Polygon.render() should not contain undefined', () => {
        let myshape = new Polygon;
        expect(myshape.render().toLowerCase()).not.toMatch(/"undefined"/);
    });
});
