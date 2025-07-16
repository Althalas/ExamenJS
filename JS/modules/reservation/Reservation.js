// Compteur pour les IDs uniques
let reservationCounter = 0;
// Classe de réservation
export class Reservation {
    constructor(borneId, borneType, date, startTime, duration) {
        this.id = `res_${++reservationCounter}`;
        this.borneId = borneId;
        this.borneType = borneType;
        this.date = date;
        this.startTime = startTime;
        this.duration = parseInt(duration);
    }
//récupérer la date et l'heure de début
    getStartDateTime() {
        return new Date(`${this.date}T${this.startTime}`);
    }
//vérifier si la réservation est dans le futur
    isFuture() {
        return this.getStartDateTime() > new Date();
    }
//récupérer le temps restant
    getTimeRemaining() {
        const now = new Date();
        const start = this.getStartDateTime();
        const difference = start - now;
        
        if (difference <= 0) return null;
        
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
//afficher la réservation
    toTableRow() {
        return `
            <tr>
                <td>${this.borneId}</td>
                <td>${this.borneType}</td>
                <td>${this.date}</td>
                <td>${this.startTime}</td>
                <td>${this.duration}h</td>
                <td><button class="delete-btn" onclick="deleteReservation('${this.id}')">Supprimer</button></td>
            </tr>
        `;
    }
} 