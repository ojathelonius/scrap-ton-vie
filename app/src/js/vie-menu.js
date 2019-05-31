import Control from 'ol/control/control';
import '../scss/vie-menu.scss';

export default class VieMenu extends Control {
    constructor(opts) {

        var options = opts || {};

        var element = document.createElement('div');
        element.className = 'ol-unselectable ol-control ol-vie-menu';

        super({
            element: element,
            target: options.target
        });

        var menuContainer = document.createElement('div');
        menuContainer.className = 'menu-container';
        element.appendChild(menuContainer);
        this.menuContainer = menuContainer;

        let button = document.createElement('i');
        button.className = 'toggle-menu';
        button.onclick = () => this.toggleMenu();
        element.appendChild(button);

        this.toggleMenu();
    }

    toggleMenu() {
        this.element.classList.toggle('active');
    }
}