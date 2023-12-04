// Use this in your terminal:
// $ NODE_OPTIONS="--experimental-vm-modules npx jest"
// $ export NODE_OPTIONS

import { validateHTMLColor, HTMLColors, HTMLColors_keywords, getHTMLColorName, validateHTMLColorName, validateHTMLColorKeyword, validateHTMLColorHex } from '../lib/validatecolor.mjs';

describe('Test color validator, ie. Seashell', () => {
    it('validate some colors', () => {
        expect(HTMLColors['seashell']).toBeDefined();
    });
    it('validate some color keywords, ie. transparent', () => {
        expect(HTMLColors_keywords['transparent']).toBeDefined();
    });
    it('check a color with validateHTMLColorName', () => {
        expect(validateHTMLColorName("Blue")).toBeTruthy();
        expect(validateHTMLColorName("This is not a color")).toBeFalsy();
    });
    it('check a color with validateHTMLColorKeyword', () => {
        expect(validateHTMLColorKeyword("transparent")).toBeTruthy();
        expect(validateHTMLColorKeyword("This is not a keyword")).toBeFalsy();
    });
    it('check a color with validateHTMLColorHex', () => {
        expect(validateHTMLColorHex("#F7f7F7")).toBeTruthy();
        expect(validateHTMLColorHex("#defghi")).toBeFalsy();
    });
    it('check getHTMLColorName() returns the extended name of a hex color', () => {
        console.log(getHTMLColorName("#FFF0F5"));
        expect(getHTMLColorName("#FFF0F5")).toMatch("lavenderblush");
    });
    it('check a color with validateHTMLColor', () => {
        expect(validateHTMLColor("steelblue")).toBeTruthy();
        expect(validateHTMLColor("#8a2be2")).toBeTruthy();
        expect(validateHTMLColor("not a color")).toBeFalsy();
    });
});


// Test use cases
// const mycolors = [
//     "yellow",
//     "blue",
//     "green",
//     "#F7F7F7",
//     "yellowwithatintofsomething",
// ];

// console.log("");
// for (let i = 0; i < mycolors.length; i++) {
//     let negate = "";
//     if (!validateHTMLColorName(mycolors[i])) {
//         negate = "not ";
//     };
//     console.log(`"${mycolors[i]}" is ${negate}an HTML color name`);
// };

// console.log("");
// for (let i = 0; i < mycolors.length; i++) {
//     let negate = "";
//     if (!validateHTMLColorHex(mycolors[i])) {
//         negate = "not ";
//     };
//     console.log(`"${mycolors[i]}" is ${negate}a HEX color`);
// }

// console.log("");
// for (let i = 0; i < mycolors.length; i++) {
//     let negate = "";
//     if (!validateHTMLColor(mycolors[i])) {
//         negate = "not ";
//     };
//     console.log(`"${mycolors[i]}" is ${negate}a HTML color`);
// }
