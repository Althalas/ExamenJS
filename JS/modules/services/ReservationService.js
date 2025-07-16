import { Reservation } from '../reservation/indexReservation.js';

// Service de réservation
export class ReservationService {
    constructor(reservationManager, formManager) {
        this.reservationManager = reservationManager;
        this.formManager = formManager;
    }
//créer une réservation
    createReservation(date, time, duration) {
        try {
            const selectedBorne = this.formManager.getSelectedBorne();
            
            if (!selectedBorne) {
                console.error('Veuillez sélectionner une borne');
                alert('Veuillez sélectionner une borne');
                return;
            }

            const validation = this.reservationManager.validateReservation(date, time, duration);
            if (!validation.isValid) {
                console.error('Erreurs de validation:', validation.errors.join(', '));
                alert('Erreurs de validation: ' + validation.errors.join(', '));
                return;
            }

            const reservation = new Reservation(selectedBorne.id, selectedBorne.getType(), date, time, duration);
            this.reservationManager.addReservation(reservation);
            
            this.formManager.clearSelectedBorne();
            
            console.log('Réservation créée avec succès');
            
        } catch (error) {
            console.error('Erreur lors de la création de réservation:', error);
            alert('Erreur lors de la création de réservation: ' + error.message);
        }
    }
} 