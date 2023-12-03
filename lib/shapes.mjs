// Shapes library
// --------------
// Provides shapes to set as the background of a fixed logo

// Example SVGs
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes
// <svg width="10em" height="10em" viewBox="0 0 16 16" class="bi bi-bicycle" fill="black" xmlns="http://www.w3.org/2000/svg">
//   <path fill-rule="evenodd" d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5zm1.5 2.443l-.508.814c.5.444.85 1.054.967 1.743h1.139L5.5 6.943zM8 9.057L9.598 6.5H6.402L8 9.057zM4.937 9.5a1.997 1.997 0 0 0-.487-.877l-.548.877h1.035zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765l1.027-1.643zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53L11.55 8.623z"></path>
// </svg>

const examplesvg = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="200">
    <circle cx="150" cy="100" r="80" fill="green" />
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>
</svg>
`;

export class Logo {
    constructor(width = 300, height = 200) {
        this.name = 'Logo';
        this.width = width;
        this.height = height;
        this.shapes = [];
    };
    // this.shapes is an array of SVG strings that represent a shape
    addshape(shape) {
        this.shapes.push(shape);
    };
    render() {
        let logostr = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${this.width}" height="${this.height}">\n`;
        for (let i = 0; i < this.shapes.length; i++) {
            logostr += this.shapes[i] + "\n";
        };
        logostr += '</svg>';
        return (logostr);
    };
};

export class Shape {
    constructor({ stroke = "black", fill = "transparent", stroke_width = 5 } = {}) {
        this.stroke = stroke;
        this.fill = fill;
        this.stroke_width = stroke_width;
    };
    setColor(color) {
        this.fill = color;
        this.stroke = color;
    };
    render() {
        return "";
    };
    // render attributes of SVG element
    renderattr() {
        return (`stroke="${this.stroke}" fill="${this.fill}" stroke-width="${this.stroke_width} "`);
    };
}

export class Rectangle extends Shape {
    constructor({ x = 20, y = 20, width = 260, height = 160, rx = 0, ry = 0, stroke, fill, stroke_width } = {}) {
        super({ stroke, fill, stroke_width });
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rx = rx;
        this.ry = ry;
        this.name = 'rectangle';
    };
    render() {
        // <rect x="10" y="10" width="30" height="30"/>
        // <rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
        return (`<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" rx="${this.rx}" ry="${this.ry}" ${this.renderattr()}/>`)
    };
}

export class Square extends Rectangle {
    constructor({ x = 70, y = 20, width = 160, round = 3, stroke = "blue", fill = "transparent", stroke_width = 5 } = {}) {
        super({ x, y, width, width, round, round, stroke, fill, stroke_width });
        this.round = round;
        this.name = 'square';
    };
}

export class Ellipse extends Shape {
    constructor({ cx = 150, cy = 100, rx = 130, ry = 80, stroke = "orange", fill, stroke_width } = {}) {
        super({ stroke, fill, stroke_width });
        this.name = 'ellipse';
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
    };
    render() {
        //<ellipse cx="75" cy="75" rx="20" ry="5"/>
        return (`<ellipse cx="${this.cx}" cy="${this.cy}" rx="${this.rx}" ry="${this.ry}" ${this.renderattr()}/>`);
    };
}

export class Circle extends Shape {
    constructor({ cx = 150, cy = 100, radius = 80, stroke = "red", fill, stroke_width } = {}) {
        super({ stroke, fill, stroke_width });
        this.name = 'circle';
        this.cx = cx;
        this.cy = cy;
        this.radius = radius;
    };
    render() {
        //<circle cx="25" cy="75" r="20"/>
        return (`<circle cx="${this.cx}" cy="${this.cy}" r="${this.radius}" ${this.renderattr()}/>`);
    };
}

export class Triangle extends Circle {
    constructor({ cx = 150, cy = 100, radius = 85, stroke = "green", fill, stroke_width } = {}) {
        super({ cx, cy, radius, stroke, fill, stroke_width });
        this.name = 'triangle';
    };
    render() {
        // coordinates of equilateral triangle with cx,cy as center
        let x1 = this.cx;
        let y1 = Math.round(this.cy - this.radius);
        const right = this.radius * Math.sin((60 / 90) * Math.PI);
        let x2 = Math.round(this.cx + right);
        let y2 = Math.round(this.cy + this.radius * Math.cos((1 / 3) * Math.PI));
        let x3 = Math.round(this.cx - right);
        let y3 = y2;
        //<polygon points="50, 160 55, 180 70, 180"/>
        return (`<polygon points="${x1}, ${y1} ${x2}, ${y2} ${x3}, ${y3}" ${this.renderattr()}/>`);
    };
}

export class Polygon extends Circle {
    constructor({ cx = 150, cy = 100, radius = 85, sides = 5, stroke = "yellow", fill, stroke_width } = {}) {
        super({ cx, cy, radius, stroke, fill, stroke_width });
        this.names = [
            'null',
            'monogon',
            'digon',
            'triangle',
            'quadrilateral',
            'pentagon',
            'hexagon',
            'heptagon',
            'octagon',
            'nonagon',
            'decagon',
            'hendecagon',
            'dodecagon',
            'tridecagon',
            'tetradecagon',
            'pentadecagon',
            'hexadecagon',
            'heptadecagon',
            'octadecagon',
            'enneadecagon',
            'icosagon',
        ];
        if ((sides > 0) && (sides <= 20)) {
            this.name = this.names[sides];
        } else {
            this.name = 'polygon';
        };
        this.sides = sides;
    };
    render() {
        // coordinates of equilateral polygon with cx,cy as center
        //<polygon points="50, 160 55, 180 70, 180"/>
        let polystring = '<polygon points="';
        for (let i = 0; i < this.sides; i++) {
            // coordinates of each point in equilateral polygon
            let x = this.cx + Math.round(this.radius * Math.sin(i * 2 * Math.PI / this.sides));
            let y = this.cy - Math.round(this.radius * Math.cos(i * 2 * Math.PI / this.sides));
            polystring += `${x}, ${y} `;
        }
        polystring += `" ${this.renderattr()}/>`;
        return (polystring);
    };
};

export class Text extends Shape {
    constructor({ cx = 150, cy = 100, text = "svg",
        font_family = "sans-serif", font_weight = "bold", font_size = "80px",
        stroke, fill = "white", stroke_width = 2 } = {}) {
        super({ stroke, fill, stroke_width });
        this.name = 'text';
        this.cx = cx;
        this.cy = cy;
        this.text = text;
        this.font_size = font_size;
        this.font_family = font_family;
        this.font_weight = font_weight;
    };
    render() {
        return (`<text text-anchor="middle" dominant-baseline="middle" x="${this.cx}" y="${this.cy}" font-family="${this.font_family}" font-weight="${this.font_weight}" font-size="${this.font_size}" ${this.renderattr()}>${this.text}</text>`);
    };
};