export function formatNumber(number) {
    number = number + '';
    let x = number.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

export function abbr(text, length) {
    text = text.replace(new RegExp('Government', 'g'), 'Gov.');

    if(text.length > length) {
        text = text.substr(0, length) + '...';
    }

    return text;
}
