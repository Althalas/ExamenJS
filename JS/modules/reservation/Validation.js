// Interface pour les validations
export class ValidationRule {
    validate(date, time, duration) {
        throw new Error('validate() must be implemented');
    }
}

// Règles de validation pour la date et l'heure
export class FutureDateRule extends ValidationRule {
    validate(date, time, duration) {
        const reservationDate = new Date(`${date}T${time}`);
        const now = new Date();
        
        if (reservationDate <= now) {
            return { isValid: false, error: 'La réservation doit être dans le futur' };
        }
        return { isValid: true };
    }
}
//vérifier si l'heure est entre 6h et 22h
export class OpeningHoursRule extends ValidationRule {
    validate(date, time, duration) {
        const hourInt = parseInt(time.split(':')[0]);
        if (hourInt < 6 || hourInt >= 22) {
            return { isValid: false, error: 'L\'heure doit être entre 6h et 22h' };
        }
        return { isValid: true };
    }
} 