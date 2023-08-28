import { html, css, LitElement } from 'lit';

export class LitDemoComponent extends LitElement {
    static styles = css`
        :host {
            display: block;
            background-color: var(--bg-color, white);
            color: var(--text-color, black);
            transition: background-color 0.3s ease, color 0.3s ease;
            padding: 20px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
        }

        h1 {
            margin: 0;
        }

        label {
            display: block;
            margin-top: 10px;
        }

        input[type='checkbox'] {
            margin-right: 5px;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            margin-bottom: 10px;
            border: 1px solid #ccc;
            padding: 10px;
        }
    `;

    static properties = {
        name: { type: String },
        darkMode: { type: Boolean },
        apiData: { type: Array },
    };

    constructor() {
        super();
        this.name = 'Somebody';
        this.darkMode = false;
        this.apiData = [];
    }

    firstUpdated() {
        this.updateTheme();
        this.fetchAPI();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    updateName(event) {
        this.name = event.target.value;
    }

    toggleDarkMode(event) {
        this.darkMode = event.target.checked;
        this.updateTheme();
    }

    updateTheme() {
        if (this.darkMode) {
            this.style.setProperty('--bg-color', 'black');
            this.style.setProperty('--text-color', 'white');
        } else {
            this.style.setProperty('--bg-color', 'white');
            this.style.setProperty('--text-color', 'black');
        }
    }

    async fetchAPI() {
        try {
            const response = await fetch('https://api.publicapis.org/entries');
            const data = await response.json();
            this.apiData = data?.entries?.slice(0, 5);
        } catch (error) {
            console.error('Error fetching API:', error);
        }
    }

    render() {
        return html`
            <h1>Hello, ${this.name}!</h1>
            <label>
                <input type="checkbox" @change="${this.toggleDarkMode}" ?checked="${this.darkMode}" />
                Dark Mode
            </label>
            <input type="text" .value="${this.name}" @input="${this.updateName}" />
            <h2>API List:</h2>
            <ul>
                ${this.apiData.map(item => html` <li><strong>${item.API}</strong>: ${item.Description}</li> `)}
            </ul>
        `;
    }
}

customElements.define('lit-component', LitDemoComponent);
