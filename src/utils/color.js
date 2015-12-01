export function getRandomReds(length) {
    return _.range(length).map(i => {
        let red = Math.floor(Math.random() * 150) + 50;
        let green = Math.floor(Math.random() * 50) + 0;
        let blue = Math.floor(Math.random() * 30) + 0;
        return rgbToHex(red, 0, blue);
    });
}

function numberToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? 0 + hex : hex;
}

function rgbToHex(r,g,b) {
    return '#' + numberToHex(r) + numberToHex(g) + numberToHex(b);
}
