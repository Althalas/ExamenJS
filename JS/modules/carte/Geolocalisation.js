// Gestionnaire de géolocalisation
export class Geolocalisation {
    constructor(map) {
        this.map = map;
    }
//configurer la géolocalisation
    configureGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                this.map.setView([lat, lon], 15);
            });
        }
    }
}