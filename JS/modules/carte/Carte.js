import { Vue } from './Vue.js';
import { Geolocalisation } from './Geolocalisation.js';
import { Marqueurs } from './Marqueurs.js';

// Gestionnaire de carte
export class Carte {
    constructor(containerId) {
        this.containerId = containerId;
        this.map = null;
        this.marqueurAdresse = null;
        
        // Gestionnaires de géolocalisation, de marqueurs et de vue (basculer la vue)
        this.geolocalisation = null;
        this.marqueurs = null;
        this.vue = null;
    }
//initialiser la carte
    initialize() {
        this.map = L.map(this.containerId).setView([45.75806298279684, 3.1270760116784317], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Initialisation des gestionnaires de géolocalisation, de marqueurs et de vue
        this.geolocalisation = new Geolocalisation(this.map);
        this.marqueurs = new Marqueurs(this.map);
        this.vue = new Vue(this.marqueurs);
//configurer la géolocalisation
        this.geolocalisation.configureGeolocation();
    }
//centrer la carte sur les coordonnées
    centerOnCoordinates(lat, lon, addressName = 'Adresse recherchée') {
        this.map.setView([lat, lon], 15);
        
        if (this.marqueurAdresse) {
            this.map.removeLayer(this.marqueurAdresse);
        }
        
        this.marqueurAdresse = this.marqueurs.createAddressMarker(lat, lon, addressName);
        this.marqueurAdresse.addTo(this.map);
    }
//afficher les bornes
    displayBornes(bornes) {
        this.marqueurs.displayBornes(bornes);
    }
//fermer la popup
    closePopup() {
        this.map.closePopup();
    }
//invalider la taille de la carte
    invalidateSize() {
        this.map.invalidateSize();
    }
//récupérer les bornes
    getCurrentBornes() {
        return this.marqueurs.getCurrentBornes();
    }
//basculer la vue
    toggleView() {
        this.vue.toggleView();
    }
} 