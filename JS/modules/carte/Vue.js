// Gestionnaire de vue
export class Vue {
    constructor(mapManager) {
        this.mapManager = mapManager;
    }
//basculer la vue
    toggleView() {
        const mapDiv = document.getElementById('map');
        const listDiv = document.getElementById('list');
        const toggleButton = document.getElementById('toggle');

        if (mapDiv.classList.contains('hidden')) {
            this.showMapView(mapDiv, listDiv, toggleButton);
        } else {
            this.showListView(mapDiv, listDiv, toggleButton);
        }
    }
//afficher la carte
    showMapView(mapDiv, listDiv, toggleButton) {
        mapDiv.classList.remove('hidden');
        listDiv.classList.add('hidden');
        toggleButton.textContent = 'Basculer vue';
        this.mapManager.invalidateSize();
    }
//afficher la liste
    showListView(mapDiv, listDiv, toggleButton) {
        mapDiv.classList.add('hidden');
        listDiv.classList.remove('hidden');
        toggleButton.textContent = 'Voir carte';
        this.displayBorneList();
    }
//afficher la liste des bornes
    displayBorneList() {
        const listDiv = document.getElementById('list');
        const currentBornes = this.mapManager.getCurrentBornes();
        
        if (currentBornes.length === 0) {
            listDiv.innerHTML = '<p>Aucune borne trouvée.</p>';
            return;
        }

        const bornesHTML = currentBornes.map(borne => 
            `<div class="borne-item">${borne.toHTML()}</div>`
        ).join('');

        listDiv.innerHTML = bornesHTML;
    }
} 