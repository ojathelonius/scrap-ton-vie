import {
    Fill,
    Stroke,
    Style,
    Circle
} from 'ol/style.js';
import Overlay from 'ol/Overlay.js';

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

// 
/**
 * Calculate color scale for each salary
 * Disabled for performance reasons (recalculates color for each salary, could be fixed by caching results)
 * @param {Number} salary 
 */
function calculateSalaryStyle(salary) {
    let percentage = (salary - minSalary) / maxSalary;
    let hue = (percentage * (0 - 60)) + 60;
    return SalaryStyle(`hsl(${hue}, 100%, 50%)`);
}

/**
 * Basic overlay shown on hover
 * @param {ol/Feature} feature 
 */
const BasicOverlay = (feature) => new Overlay({
    id: 'basicOverlay',
    element: document.querySelector('#popup'),
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

export {
    FeatureStyles,
    BasicOverlay
};