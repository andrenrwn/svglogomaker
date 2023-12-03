import { input, select, Separator } from '@inquirer/prompts';
import { promises as fs } from 'fs';
import sharp from 'sharp';
import terminalImage from 'terminal-image';
import { Logo, Circle, Square, Triangle, Polygon, Text } from './lib/shapes.mjs';
import { validateHTMLColor, validateHTMLColorName, validateHTMLColorHex, HTMLColors } from './lib/validatecolor.mjs';
import chalk from 'chalk';

const mylogo = new Logo;

//-------------------------------------------------

// Define menu selections
let choices = [
    new Separator(), // common sections in README files
    {
        name: "circle",
        value: "circle",
        description: "Add a Circle",
    },
    {
        name: "triangle",
        value: "triangle",
        description: "Add a Triangle",
    },
    {
        name: "square",
        value: "square",
        description: "Square",
    },
    {
        name: "pentagon",
        value: "pentagon",
        description: "Add a Pentagon",
    },
    {
        name: "hexagon",
        value: "hexagon",
        description: "Add a Hexagon",
    },
    {
        name: "septagon",
        value: "septagon",
        description: "Add a Septagon",
    },
    {
        name: "octagon",
        value: "octagon",
        description: "Add a Octagon",
    },
    {
        name: "polygon",
        value: "polygon",
        description: "Add an n-sided Polygon",
    },
    new Separator(), // uncommon sections
    {
        name: "text",
        value: "text",
        description: "Add text for the logo",
    },
    new Separator(), // uncommon sections
    {
        name: "setcolor",
        value: "setcolor",
        description: "Add color to the last shape",
    },
    new Separator(),
    {
        name: "remove",
        value: "remove",
        description: "Remove the last shape",
    },
    new Separator(),
    {
        name: "render",
        value: "render",
        description: "Finish and render logo",
    },
    new Separator(),
    {
        name: "quit",
        value: "quit",
        description: "Cancel and quit program",
    },
];

let logo_text;
let logo_textcolor;

let logocomponents = []; // array of objects

function displaycomponents() {
    console.log(chalk.yellow.bgBlue("─".repeat((process.stdout.columns || 10) - 1)) + "\n");
    console.log("Logo components: ");
    if (logocomponents.length > 0) {
        for (let i = 0; i < logocomponents.length; i++) {
            let color = logocomponents[i].fill;
            let hexcolor;
            if (validateHTMLColorName(color)) {
                hexcolor = HTMLColors[color.toLowerCase()];
            } else if (validateHTMLColorHex(color)) {
                hexcolor = color.toUpperCase();
            } else {
                hexcolor = "#000000";
            };
            let componentname = logocomponents[i].name;
            if (logocomponents[i].name === 'text') {
                componentname += ': ' + logocomponents[i].text;
            };
            console.log("shape: ", componentname, "color: ", chalk.hex(hexcolor)(logocomponents[i].fill), chalk.bgHex(hexcolor)(logocomponents[i].fill));
        };
    } else {
        console.log(chalk.red("<empty>"));
    }
    console.log(chalk.yellow.bgBlue("─".repeat((process.stdout.columns || 10) - 1)) + "\n");
};

// a while loop menu for user to select options to add to the logo
let answer;
do {
    displaycomponents();
    answer = await select({
        message: "Select a shape to add:\n",
        choices: choices,
        pageSize: choices.length,
        loop: true,
    });
    console.log("Selected: ", answer);

    switch (answer) {
        case "text":
            let logo_text = await input({ message: 'Enter up to 3 characters for your logo:', validate: (mystring) => (mystring.length <= 3 && mystring.length >= 0) ? true : 'Please enter up to 3 characters' });
            logocomponents.push(new Text({ text: logo_text }));
            break;
        case "circle":
            logocomponents.push(new Circle);
            break;
        case "triangle":
            logocomponents.push(new Triangle);
            break;
        case "square":
            logocomponents.push(new Square);
            break;
        case "pentagon":
            logocomponents.push(new Polygon({ sides: 5 }));
            break;
        case "hexagon":
            logocomponents.push(new Polygon({ sides: 6 }));
            break;
        case "septagon":
            logocomponents.push(new Polygon({ sides: 7 }));
            break;
        case "octagon":
            logocomponents.push(new Polygon({ sides: 8 }));
            break;
        case "polygon":
            let polygonsides = await input({
                message: 'Enter number of polygon sides from 3 to 20:',
                validate: (myvalue) => {
                    let mynum = parseInt(myvalue);
                    if ((mynum >= 3) && (mynum <= 20)) {
                        return true;
                    } else {
                        return 'Please enter an integer between 3 to 20'
                    };
                }
            });
            logocomponents.push(new Polygon({ sides: polygonsides }));
            break;
        case "setcolor":
            if (logocomponents.length > 0) {
                let color = await input({ message: 'Enter a color for the last shape:', validate: (mystring) => (validateHTMLColor(mystring)) ? true : 'Please enter a valid HTML color name ie. "Blue" or hex string, ie. "#12abcd"' });
                logocomponents[logocomponents.length - 1].setColor(color);
            };
            break;
        case "remove":
            logocomponents.pop();
            break;
        case "quit":
            process.exit();
            break;
        default:
    }
} while (answer !== "render");

// render mylogo 
for (let i = 0; i < logocomponents.length; i++) {
    mylogo.addshape(logocomponents[i].render());
};

let svgfile = 'logo.svg';
let imgfile = 'logo.png';
let svgdata = mylogo.render();

try {
    await fs.writeFile(svgfile, svgdata);
} catch (err) {
    console.log(err);
}

let logoimg = await sharp(Buffer.from(svgdata));

await logoimg.toFile(imgfile);

console.log("svg result:", svgdata);

console.log(await terminalImage.file(imgfile, { width: '80%', height: '80%' }));
