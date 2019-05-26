import {
    Fill,
    Stroke,
    Style,
    Circle
} from 'ol/style.js';

// Setting constant styles so we don't have to compute a new style everytime
const SalaryStyle = (color) => new Style({
    image: new Circle({
        radius: 5,
        fill: new Fill({
            color: color
        }),
        stroke: new Stroke({
            color: 'black',
            width: 1
        })
    })
});

const FeatureStyles = {
    'LowSalaryStyle': SalaryStyle('#ffe000'),
    'MediumSalaryStyle': SalaryStyle('#ea8d00'),
    'HighSalaryStyle': SalaryStyle('#ea3600')
};


export {
    FeatureStyles
};