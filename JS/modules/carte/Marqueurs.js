// Gestionnaire de marqueurs
export class Marqueurs {
    constructor(map) {
        this.map = map;
        this.borneMarkers = [];
        this.currentBornes = [];
    }
//afficher les bornes
    displayBornes(bornes) {
        this.currentBornes = bornes;
        this.clearBorneMarkers();
        this.addBorneMarkers(bornes);
    }
//effacer les bornes
    clearBorneMarkers() {
        this.borneMarkers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.borneMarkers = [];
    }
//ajouter les bornes
    addBorneMarkers(bornes) {
        bornes.forEach(borne => {
            const marker = this.createBorneMarker(borne.lat, borne.lon, borne);
            marker.addTo(this.map);
            this.borneMarkers.push(marker);
        });
    }
//créer un marqueur pour une borne
    createBorneMarker(lat, lon, borne) {
        return L.marker([lat, lon], {
            icon: L.divIcon({
                className: 'borne-marker',
                html: `<div style="background-color: ${borne.getIconColor()}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
                iconSize: [16, 16]
            })
        }).bindPopup(borne.getPopupContent());
    }
//créer un marqueur pour une adresse
    createAddressMarker(lat, lon, addressName) {
        return L.marker([lat, lon], {
            icon: L.divIcon({
                className: 'address-marker',
                html: '<div style="background-color: #ffc107; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                iconSize: [18, 18]
            })
        }).bindPopup(addressName);
    }
//récupérer les bornes
    getCurrentBornes() {
        return this.currentBornes;
    }
} 