import { Borne } from './Borne.js';

// Sous-classe pour les bornes publiques
export class BornePublique extends Borne {
    constructor(id, lat, lon) {
        super(id, lat, lon);
    }
//récupérer le type
    getType() {
        return 'Publique';
    }
//récupérer la couleur de l'icône
    getIconColor() {
        return '#007bff'; // Bleu pour les bornes publiques
    }
//afficher la borne
    toHTML() {
        return `
            <h4>Borne Publique</h4>
            <p>id: ${this.id}</p>
            <p>lat: ${this.lat}</p>
            <p>lon: ${this.lon}</p>
            <button onclick="selectBorne(${this.id})">Réserver</button>
        `;
    }
//créer une borne
    static creerBorne(id, lat, lon) {
        return new BornePublique(id, lat, lon);
    }
}