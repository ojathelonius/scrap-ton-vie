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
        <h3>${properties.position}</h3>
        <div>${properties.salary}</div>
    `;
}