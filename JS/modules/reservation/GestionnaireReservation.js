import { Reservation } from './Reservation.js';
import { FutureDateRule, OpeningHoursRule } from './Validation.js';

// Gestionnaire de réservation
export class GestionnaireReservation {
    constructor() {
        this.reservations = [];
        this.countdownInterval = null;
        this.validationRules = [
            new FutureDateRule(),
            new OpeningHoursRule()
        ];
        this.loadReservations();
        this.startCountdown();
    }
//sauvegarder les réservations
    saveReservations() {
        localStorage.setItem('electricity_reservations', JSON.stringify(this.reservations));
    }
//charger les réservations
    loadReservations() {
        const data = localStorage.getItem('electricity_reservations');
        if (data) {
            try {
                const savedReservations = JSON.parse(data);
                this.reservations = savedReservations.map(r => new Reservation(
                    r.borneId, r.borneType, r.date, r.startTime, r.duration
                ));
            } catch (error) {
                this.reservations = [];
            }
        }
    }
//ajouter une réservation
    addReservation(reservation) {
        this.reservations.push(reservation);
        this.saveReservations();
        this.displayReservations();
    }
//supprimer une réservation
    deleteReservation(reservationId) {
        this.reservations = this.reservations.filter(r => r.id !== reservationId);
        this.saveReservations();
        this.displayReservations();
    }
//récupérer toutes les réservations
    getAllReservations() {
        return this.reservations;
    }
//récupérer la prochaine réservation
    getNextReservation() {
        const futureReservations = this.reservations.filter(r => r.isFuture());
        if (futureReservations.length === 0) return null;
        
        return futureReservations.sort((a, b) => 
            a.getStartDateTime() - b.getStartDateTime()
        )[0];
    }
//valider une réservation
    validateReservation(date, time, duration) {
        const errors = [];
        
        for (const rule of this.validationRules) {
            const result = rule.validate(date, time, duration);
            if (!result.isValid) {
                errors.push(result.error);
            }
        }
        
        return { isValid: errors.length === 0, errors };
    }
//afficher les réservations
    displayReservations() {
        const tableBody = document.getElementById('reservations-body');
        
        if (this.reservations.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Aucune réservation</td></tr>';
            return;
        }

        const rows = this.reservations.map(reservation => reservation.toTableRow()).join('');
        tableBody.innerHTML = rows;
    }
//démarrer le compte à rebours
    startCountdown() {
        this.updateCountdown();
        this.countdownInterval = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }
//mettre à jour le compte à rebours
    updateCountdown() {
        const countdownTimer = document.getElementById('countdown-timer');
        const nextReservation = this.getNextReservation();
        
        if (!nextReservation) {
            countdownTimer.textContent = 'Aucune réservation prévue';
            return;
        }

        const timeRemaining = nextReservation.getTimeRemaining();
        if (!timeRemaining) {
            countdownTimer.textContent = 'Aucune réservation prévue';
            return;
        }

        countdownTimer.textContent = timeRemaining;
    }
//détruire le compte à rebours
    destroy() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    }
} 