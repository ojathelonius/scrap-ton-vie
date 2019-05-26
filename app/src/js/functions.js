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
        source: vectorSource
    });
    map.addLayer(vectorLayer);
}

/**
 * Initialize and return a new Map object
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
            center: [0, 0],
            zoom: 2
        })
    });
}