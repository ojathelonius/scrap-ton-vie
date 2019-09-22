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
            font: 'normal 16px FontAwesome',
            textBaseline: 'bottom',
            fill: new Fill({
                color: 'rgba(64, 64, 64, 0.9)',
            }),
            stroke: new Stroke({color: '#BA996F', width: 2})
        }))

    }
}