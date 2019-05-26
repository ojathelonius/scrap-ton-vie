// Required for promises
import '@babel/polyfill';
import {
    initMap,
    updateOffers
} from './js/functions';
import './scss/main.scss';

var map = initMap();

updateOffers(map);