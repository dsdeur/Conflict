export function getRandomReds(length) {
    return _.range(length).map(i => {
        let gb = Math.floor(Math.random() * 50) + 20;
        let red = Math.floor(Math.random() * 120) + 100;
        let blue = gb + Math.floor(Math.random() * 10);

        return rgbToHex(red, gb, blue);
    });
}

function numberToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? 0 + hex : hex;
}

function rgbToHex(r,g,b) {
    return '#' + numberToHex(r) + numberToHex(g) + numberToHex(b);
}
