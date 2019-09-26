import {
    Fill,
    Stroke,
    Style,
    Circle,
    Text
} from 'ol/style.js';

export default class IndustryStyle extends Style {

    constructor(unicodeStr) {
        super();
        this.setText(new Text({
            text: unicodeStr,
            font: '900 16px "Font Awesome 5 Free"',
            textBaseline: 'bottom',
            fill: new Fill({
                color: 'rgba(64, 64, 64, 0.9)',
            }),
            stroke: new Stroke({color: '#BA996F', width: 2})
        }))
    }
}