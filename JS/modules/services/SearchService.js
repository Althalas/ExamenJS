import { Api } from './Api.js';
import { Borne } from '../bornes/Borne.js';

// Service de recherche
export class SearchService {
    constructor(mapManager) {
        this.mapManager = mapManager;
    }
//rechercher une adresse
    async performSearch(address) {
        try {
            console.log('Recherche en cours pour:', address);
            
            const coordinates = await Api.searchAddress(address);
            console.log('Coordonnées trouvées:', coordinates);
            
            this.mapManager.centerOnCoordinates(coordinates.lat, coordinates.lon, coordinates.displayName);
            
            const bornes = await Api.getChargingBornes(coordinates.lat, coordinates.lon);
            console.log('Bornes trouvées:', bornes.length);
            
            const bornesObjects = await Promise.all(bornes.map(borne => Borne.creerBorne(borne.id, borne.lat, borne.lon)));
            console.log('Bornes créées:', bornesObjects.length);
            
            this.mapManager.displayBornes(bornesObjects);
            
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            alert('Erreur lors de la recherche: ' + error.message);
        }
    }
} 