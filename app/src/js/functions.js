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
    BasicOverlay
} from './styles';


// Only look for contentContainer in DOM once
const popupContainer = document.querySelector('#popup');
const contentContainer = document.querySelector('#popup .content-container');
const popupCloser = document.querySelector('#popup-closer');

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
            style: offerStyle,
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

/**
 * Initialize and return a new Map object, with a shared pop-up overlay object
 */
export function initMap() {
    let map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM()
            })
        ],
        view: new View({
            projection: 'EPSG:3857',
            center: [782715.169640, 6203017.719399],
            zoom: 4
        }),
        overlays: [BasicOverlay()]
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
            this.getOverlayById('basic-overlay').setPosition(undefined);
        }
    }
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
        <div>Salary: ${properties.salary}€</div>
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