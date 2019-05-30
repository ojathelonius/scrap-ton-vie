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


// Only look for overlayContainer in DOM once
const overlayContainer = document.querySelector('#popup');

/**
 * Update offers
 * @param {ol/Map} map 
 */
export async function updateOffers(map) {
    const response = await get('/offers');
    var vectorSource = new VectorSource({
        features: (new GeoJSON()).readFeatures(response.data)
    });
    var vectorLayer = new VectorLayer({
        source: vectorSource,
        style: offerStyle
    });
    map.addLayer(vectorLayer);
}

/**
 * Quantile thresholds are calculated from the database, see README.MD
 * @param {ol/Feature} feature 
 */
function offerStyle(feature) {
    let properties = feature.getProperties();
    if (properties.salary < 2049) {
        return FeatureStyles.LowSalaryStyle;
    } else if (properties.salary > 2468) {
        return FeatureStyles.HighSalaryStyle;
    } else {
        return FeatureStyles.MediumSalaryStyle;
    }
}

/**
 * Initialize and return a new Map object, with a shared pop-up overlay object
 */
export function initMap() {
    return new Map({
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
        overlayContainer.innerHTML = buildHtmlFromFeature(feature.getProperties());
        overlayContainer.onclick = () => onOverlayClick(feature.getProperties().civiweb_id);
        this.getOverlayById('basicOverlay').setPosition(feature.getGeometry().getCoordinates());
        this.getTargetElement().style.cursor = 'pointer';
    } else if (this.getTargetElement().style.cursor == 'pointer') {
        // Only change back cursor if it is a pointer
        this.getTargetElement().style.cursor = '';
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

function onOverlayClick(civiwebId) {
    window.open(`https://www.civiweb.com/FR/offre/${civiwebId}.aspx`, '_blank');
}