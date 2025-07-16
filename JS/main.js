// Import des modules
import { Borne } from './modules/bornes/Borne.js';
import { Reservation, GestionnaireReservation } from './modules/reservation/indexReservation.js';
import { Carte } from './modules/carte/Carte.js';
import { GestionnaireForm, GestionnaireEvent } from './modules/UI/indexUI.js';
import { SearchService, ReservationService, Api } from './modules/services/indexServices.js';

// Variables globales
let mapManager, reservationManager, formManager, eventManager, searchService, reservationService;

//initialisation
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApplication();
        console.log('Application initialisée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
});
//initialisation de l'application
function initializeApplication() {
    mapManager = new Carte('map');
    reservationManager = new GestionnaireReservation();
    formManager = new GestionnaireForm();
    //initialisation des services
    searchService = new SearchService(mapManager);
    reservationService = new ReservationService(reservationManager, formManager);
    eventManager = new GestionnaireEvent(formManager, searchService.performSearch.bind(searchService), 
                                  mapManager.toggleView.bind(mapManager), 
                                  reservationService.createReservation.bind(reservationService));
    //déclaration des fonctions globales après initialisation
    window.selectBorne = function(borneId) {
        try {
            const bornes = mapManager.getCurrentBornes();
            const selectedBorne = bornes.find(borne => borne.id === parseInt(borneId));
            if (selectedBorne) {
                formManager.updateSelectedBorne(selectedBorne);
                mapManager.closePopup();
                document.querySelector('.new-reservation').scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Erreur lors de la sélection de borne:', error);
        }
    };
//supprimer une réservation
    window.deleteReservation = function(reservationId) {
        try {
            reservationManager.deleteReservation(reservationId);
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
        }
    };
//initialiser la carte
    mapManager.initialize();
    eventManager.configureEventListeners();
    formManager.configureDefaultValues();
    reservationManager.displayReservations();
}