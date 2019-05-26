// Required for promises
import '@babel/polyfill';
import {
    initMap,
    updateOffers,
    showBasicFeatureInfo
} from './js/functions';
import './scss/main.scss';

var map = initMap();

// Add offer layer
updateOffers(map);

// Show basic offer information on hover
map.on('pointermove', showBasicFeatureInfo);