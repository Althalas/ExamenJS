import { Borne } from './Borne.js';

// Sous-classe pour les bornes privées
export class BornePrivee extends Borne {
    constructor(id, lat, lon) {
        super(id, lat, lon);
        this.proprietaire = this.genererProprietaire();
    }
//récupérer le type
    getType() {
        return 'Privée';
    }
//récupérer la couleur de l'icône
    getIconColor() {
        return '#6c757d'; // Gris pour les bornes privées
    }
//afficher la borne
    toHTML() {
        return `
            <h4>Borne Privée</h4>
            <p>id: ${this.id}</p>
            <p>lat: ${this.lat}</p>
            <p>lon: ${this.lon}</p>
            <p>propriétaire: ${this.proprietaire}</p>
            <button onclick="selectBorne(${this.id})">Réserver</button>
        `;
    }
//générer un propriétaire
    genererProprietaire() {
        const proprietaires = ['Bernard', 'Marie', 'Pierre', 'Sophie', 'Jean', 'Claire'];
        return proprietaires[Math.floor(Math.random() * proprietaires.length)];
    }
//créer une borne
    static creerBorne(id, lat, lon) {
        return new BornePrivee(id, lat, lon);
    }
} 