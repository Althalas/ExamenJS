// Service API
export class Api {
  //rechercher une adresse avec Nominatim API
  static async searchAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURI(
      address
    )}&limit=1`;
    //rechercher une adresse
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //vérifier si la réponse est ok
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    //récupérer les données
    const data = await response.json();
    //vérifier si aucune adresse n'a été trouvée
    if (data.length === 0) {
      throw new Error("Aucune adresse trouvée");
    }
    //récupérer les coordonnées
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };
  }

  //Overpass API
  //récupérer les bornes
  static async getChargingBornes(lat, lon, radius = 5000) {
    const query = `
            [out:json][timeout:25];
            (
                node["amenity"="charging_station"](around:${radius},${lat},${lon});
            );
            out body;
        `;
    //récupérer les bornes
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURI(query)}`,
    });
    //vérifier si la réponse est ok
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    //récupérer les données
    const data = await response.json();
    //récupérer les bornes
    const bornes = [];

    if (data.elements) {
      data.elements.forEach((element) => {
        if (element.type === "node" && element.lat && element.lon) {
          bornes.push({
            id: element.id,
            lat: element.lat,
            lon: element.lon,
            tags: element.tags || {},
          });
        }
      });
    }
    //récupérer les bornes
    return bornes;
  }
}
