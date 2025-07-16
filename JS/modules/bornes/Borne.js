// classe abstraite
export class Borne {
    constructor(id, lat, lon) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
    }
//récupérer le type
    getType() {
    }
//récupérer la couleur de l'icône
    getIconColor() {
    }
//afficher la borne
    toHTML() {
    }
//récupérer le contenu de la popup
    getPopupContent() {
        return this.toHTML();
    }
//créer une borne
    static async creerBorne(id, lat, lon) {
        // Import dynamique pour éviter les références circulaires
        const { BornePublique } = await import('./BornePublique.js');
        const { BornePrivee } = await import('./BornePrivee.js');
        
        // Publique si id pair, privée si impair
        if (id % 2 === 0) {
            return BornePublique.creerBorne(id, lat, lon);
        } else {
            return BornePrivee.creerBorne(id, lat, lon);
        }
    }
}