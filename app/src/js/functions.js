import {
    Map,
    View
} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import {
    Vector as VectorSource
} from 'ol/source';
import {
    Vector as VectorLayer
} from 'ol/layer';
import {
    get
} from './api';
import {
    FeatureStyles,
    IndustryStyles,
    BasicOverlay
} from './styles';
import Industries from './Industries';

import IndustryStyle from './IndustryStyle';


// Only look for contentContainer in DOM once
const popupContainer = document.querySelector('#popup');
const contentContainer = document.querySelector('#popup .content-container');
const popupCloser = document.querySelector('#popup-closer');
let styleCache = [];

/**
 * Update offers
 * @param {ol/Map} map 
 * @param {Array} params
 */
export async function updateOffers(map, params) {
    const response = await get('/offers', params);
    let vectorSource = new VectorSource({
        features: (new GeoJSON()).readFeatures(response.data)
    });
    let offerLayer = map.getLayerByName('offer-layer');
    if (offerLayer) {
        offerLayer.setSource(vectorSource)
    } else {
        map.addLayer(new VectorLayer({
            source: vectorSource,
            style: industryStyle,
            name: 'offer-layer'
        }));
    }
    // Close popup since it might not be relevant anymore
    map.getOverlayById('basic-overlay').setPosition(undefined);
}

/**
 * Quantile thresholds are calculated from the database, see README.MD
 * @param {ol/Feature} feature 
 */
function offerStyle(feature) {
    let salary = feature.getProperties().salary;
    if (salary < 1695) {
        return FeatureStyles.SalaryStyle1;
    } else if (salary < 1970) {
        return FeatureStyles.SalaryStyle2;
    } else if (salary < 2133) {
        return FeatureStyles.SalaryStyle3;
    } else if (salary < 2290) {
        return FeatureStyles.SalaryStyle4;
    } else if (salary < 2462) {
        return FeatureStyles.SalaryStyle5;
    } else if (salary < 2723) {
        return FeatureStyles.SalaryStyle6;
    } else if (salary < 3185) {
        return FeatureStyles.SalaryStyle7;
    } else {
        return FeatureStyles.SalaryStyle8;
    }
}

function industryStyle(feature) {
    let industry = feature.getProperties().industry;

    if (styleCache[industry]) {
        return styleCache[industry];
    } else {
        switch (industry) {
            case Industries.ADVERTISING:
                styleCache[industry] = new IndustryStyle('\uf641');
                break;

            case Industries.ARTS:
                styleCache[industry] = new IndustryStyle('\uf1fc');
                break;

            case Industries.BEAUTY:
                styleCache[industry] = new IndustryStyle('\uf587');
                break;

            case Industries.BIOLOGY:
                styleCache[industry] = new IndustryStyle('\uf0c3');
                break;

            case Industries.BUSINESS:
                styleCache[industry] = new IndustryStyle('\uf0b1');
                break;

            case Industries.CONSTRUCTION:
                styleCache[industry] = new IndustryStyle('\uf807');
                break;

            case Industries.COMPUTER_SCIENCE:
                styleCache[industry] = new IndustryStyle('\uf5fc');
                break;

            case Industries.ELECTRONICS:
                styleCache[industry] = new IndustryStyle('\uf2db');
                break;

            case Industries.FINANCE:
                styleCache[industry] = new IndustryStyle('\uf155');
                break;

            case Industries.HEALTH:
                styleCache[industry] = new IndustryStyle('\uf21e');
                break;

            case Industries.HOUSING:
                styleCache[industry] = new IndustryStyle('\uf015');
                break;

            case Industries.HUMAN_RESOURCES:
                styleCache[industry] = new IndustryStyle('\uf0c0');
                break;

            case Industries.HUMANITARIAN:
                styleCache[industry] = new IndustryStyle('\uf4c4');
                break;

            case Industries.JOURNALISM:
                styleCache[industry] = new IndustryStyle('\uf1ea');
                break;

            case Industries.LAW:
                styleCache[industry] = new IndustryStyle('\uf0e3');
                break;

            case Industries.LITERATURE:
                styleCache[industry] = new IndustryStyle('\uf02d');
                break;

            case Industries.LOGISTICS:
                styleCache[industry] = new IndustryStyle('\uf494');
                break;

            case Industries.MATHEMATICS:
                styleCache[industry] = new IndustryStyle('\uf698');
                break;

            case Industries.MECHANICS:
                styleCache[industry] = new IndustryStyle('\uf085');
                break;

            case Industries.MEDIA:
                styleCache[industry] = new IndustryStyle('\uf292');
                break;

            case Industries.POLITICS:
                styleCache[industry] = new IndustryStyle('\uf66f');
                break;

            case Industries.SPORTS:
                styleCache[industry] = new IndustryStyle('\uf1e3');
                break;

            case Industries.TEACHING:
                styleCache[industry] = new IndustryStyle('\uf19d');
                break;

            case Industries.TOURISM:
                styleCache[industry] = new IndustryStyle('\uf7a2');
                break;
            default:
                styleCache[industry] = new IndustryStyle('\uf128');
                break;
        }
        return styleCache[industry];
    }

}

/**
 * Initialize and return a new Map object, with a shared pop-up overlay object
 */
export function initMap() {
    let map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new XYZ({
                    url: 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2phdGhlbG9uaXVzIiwiYSI6ImNpbzV0bXVmNDAwNHV2eWtwa2ZycnhrMXIifQ.6YqVmLEfFdRV4k9a_KY5gg'
                })
            })
        ],
        view: new View({
            projection: 'EPSG:3857',
            center: [782715.169640, 6203017.719399],
            zoom: 4
        }),
        overlays: [BasicOverlay()],
        controls: []
    });

    // Register custom functions

    map.removeLayerByName = removeLayerByName;
    map.getLayerByName = getLayerByName;
    return map;
}

/**
 * Show feature informations in an overlay
 */
export function showBasicFeatureInfo(event) {
    let feature = this.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
        if (feature) {
            return feature;
        }
    });
    if (feature) {
        contentContainer.innerHTML = buildHtmlFromFeature(feature.getProperties());
        popupCloser.onclick = (evt) => {
            // evt.stopPropagation() should work here
            this.getOverlayById('basic-overlay').setPosition(undefined);
        }
        popupContainer.onclick = (evt) => onOverlayClick(evt, feature.getProperties().civiweb_id);
        this.getOverlayById('basic-overlay').setPosition(feature.getGeometry().getCoordinates());
        this.getTargetElement().style.cursor = 'pointer';

        // saving pixel locally
        this.pixels = event.pixel;

    } else if (this.getTargetElement().style.cursor == 'pointer') {
        // Only change back cursor if it is a pointer
        this.getTargetElement().style.cursor = '';
    } else if (this.pixels && !this.isHoveringOverlay) {
        if (calculateDistance(this.pixels, event.pixel) > 100) {
            // this.getOverlayById('basic-overlay').setPosition(undefined);
        }
    }
}

export function animateHud(event) {
    let offsetX = (event.clientX - screen.width / 2) / 200;
    let offsetY = (event.clientY - screen.height / 2) / 200;
    let boxes = document.getElementsByClassName('box');
    for (let box of boxes) {
        // Can't retrieve originalRotation due to getComputedStyle returning a matrix instead of readable transform properties
        let originalRotation = '';
        if (box.classList.contains('title-box')) {
            originalRotation = 'rotate(3deg)';
        } else if (box.classList.contains('github-box')) {
            originalRotation = 'rotate(-3deg)';
        }

        box.style.transform = `translate(${offsetX}px, ${offsetY}px) ${originalRotation}`;
    }

    // map.getView().setCenter([map.getView().getCenter()[0] - offsetX*2000, map.getView().getCenter()[1] + offsetY*2000]);
}

/**
 * Build feature HTML information from its properties
 * @param {Object} properties 
 */
function buildHtmlFromFeature(properties) {
    return `
        <h5 class="title is-5">${properties.position}</h5>
        <h6 class="subtitle is-6">${properties.company}</h6>
        <div>Location: ${properties.city}, ${properties.country}</div>
        <div >Salary: ${properties.salary}€</div>
    `;
}

/**
 * Opens the offer in a new tab on click
 * @param {Event} event
 * @param {String} civiwebId 
 */
function onOverlayClick(event, civiwebId) {
    // This should not be necessary if using stopPropagation() on the closer event, but it does not seem to work ¯\_(ツ)_/¯
    if (event.target != popupCloser) {
        window.open(`https://www.civiweb.com/FR/offre/${civiwebId}.aspx`, '_blank');
    }

}

/**
 * Retrieve a layer by its given name
 * @param {String} name 
 */
function getLayerByName(name) {
    return this.getLayers().getArray().find(layer => layer.getProperties().name === name);
}

/**
 * Remove a layer by its name
 * @param {String} name 
 */
function removeLayerByName(name) {
    this.removeLayer(this.getLayerByName(name));
}

/**
 * Calculate distance between [a1,a2] and [b1,b2]
 * @param {Array} pixelsA 
 * @param {Array} pixelsB 
 */
function calculateDistance(pixelsA, pixelsB) {
    return Math.abs(pixelsB[1] - pixelsA[1]) + Math.abs(pixelsB[0] - pixelsA[0]);
}