const stringToColour = function (str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

const prepareLegendAndColors = function (data) {
    let colors = [];
    let legend = [];

    for (let idx = 0; idx < data.length; idx++) {
        let value = data[idx];
        let color = stringToColour(value.name);
        colors[idx] = color;
        legend[idx] = {
            title: value.name,
            color: color
        }
    }

    return {colors, legend};
}

export default prepareLegendAndColors;