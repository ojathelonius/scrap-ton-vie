// Required for promises
import '@babel/polyfill';
import {
    initMap,
    updateOffers
} from './functions';

var map = initMap();

updateOffers(map);