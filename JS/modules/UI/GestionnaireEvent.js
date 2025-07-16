// Gestionnaire d'événements
export class GestionnaireEvent {
    constructor(formManager, searchHandler, toggleHandler, reservationHandler) {
        this.formManager = formManager;
        this.searchHandler = searchHandler;
        this.toggleHandler = toggleHandler;
        this.reservationHandler = reservationHandler;
    }
//configurer les événements
    configureEventListeners() {
        this.configureSearchEvent();
        this.configureToggleEvent();
        this.configureReservationEvent();
        this.configureEnterKeyEvent();
    }
//rechercher une adresse
    configureSearchEvent() {
        document.getElementById('search').addEventListener('click', () => {
            const address = document.getElementById('address').value;
            if (address.trim()) {
                this.searchHandler(address);
            }
        });
    }
//basculer la vue
    configureToggleEvent() {
        document.getElementById('toggle').addEventListener('click', () => {
            this.toggleHandler();
        });
    }
//créer une réservation
    configureReservationEvent() {
        document.getElementById('reservation-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = this.formManager.getFormData();
            this.reservationHandler(formData.date, formData.time, formData.duration);
        });
    }
//rechercher une adresse
    configureEnterKeyEvent() {
        document.getElementById('address').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('search').click();
            }
        });
    }
} 