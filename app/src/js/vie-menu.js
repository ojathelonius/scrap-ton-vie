import Control from 'ol/control/control';
import '../scss/vie-menu.scss';

export default class VieMenu extends Control {
    constructor(opts) {

        let options = opts || {};

        let element = document.createElement('div');
        element.className = 'ol-unselectable ol-control ol-vie-menu';

        super({
            element: element,
            target: options.target
        });

        // Inside container
        let menuContainer = document.createElement('div');
        menuContainer.className = 'menu-container';
        element.appendChild(menuContainer);
        this.menuContainer = menuContainer;

        // Toggle button
        let button = document.createElement('i');
        button.className = 'toggle-menu';
        button.onclick = () => this.toggleMenu();
        element.appendChild(button);

        // Menu title
        let menuTitle = document.createElement('h5');
        menuTitle.className = 'title is-5';
        menuTitle.innerHTML = 'Filters';
        menuContainer.appendChild(menuTitle);

        // Search input
        this.searchInput = document.createElement('input');
        this.searchInput.type = 'text';
        this.searchInput.placeholder = 'Search for any terms...';
        this.searchInput.className = 'input';
        menuContainer.appendChild(this.createField(this.searchInput, 'Term search', 'Search for any terms, separated by spaces.'));

        let buttonContainer = document.createElement('div');
        buttonContainer.className = 'controls-container';
        menuContainer.appendChild(buttonContainer);

        let clearButton = this.createButton('Clear', options.onClear);
        buttonContainer.appendChild(clearButton);

        let searchButton = this.createButton('Search', options.onSearch);
        buttonContainer.appendChild(searchButton);

        // Show menu by default
        this.toggleMenu();
    }

    toggleMenu() {
        this.element.classList.toggle('active');
    }

    createField(input, labelContent, helpContent) {

        let field = document.createElement('div');
        field.className = 'field';

        let label = document.createElement('label');
        label.className = 'label';
        label.innerHTML = labelContent;
        field.appendChild(label);

        let control = document.createElement('div');
        control.className = 'control';
        field.appendChild(control);

        control.appendChild(input);

        if (helpContent) {
            let help = document.createElement('p');
            help.className = 'help';
            help.innerHTML = helpContent;
            control.appendChild(help);
        }

        return field;
    }

    createButton(buttonContent, handler) {
        let control = document.createElement('div');
        control.className = 'control';

        // Using <a> instead of <button> due to default OL button styling
        let button = document.createElement('a');
        button.className = 'button';
        button.innerHTML = buttonContent;
        control.appendChild(button);

        if (handler) {
            button.onclick = () => handler(this.searchInput.value);
        }

        return control;
    }
}