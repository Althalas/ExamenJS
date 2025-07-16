# Electricity Business - Module de recherche et réservation de bornes de recharge

## Description

Electricity Business est une application web permettant aux utilisateurs de rechercher, visualiser et réserver des bornes de recharge pour véhicules électriques. L'application fonctionne entièrement côté client avec une architecture modulaire en JavaScript natif.

## Fonctionnalités

### Recherche de bornes
- Recherche par adresse avec géocodage automatique
- Récupération des bornes dans un rayon de 5km
- Affichage sur carte interactive (Leaflet) et en liste
- Basculement entre vue carte et vue liste

### Visualisation
- Carte interactive avec marqueurs colorés selon le type de borne
- Distinction entre bornes publiques (bleues) et privées (grises)
- Informations détaillées dans les popups
- Liste des bornes avec boutons de réservation

### Réservation
- Sélection d'une borne depuis la carte ou la liste
- Formulaire de réservation avec validation
- Règles métier : date future, heures d'ouverture (6h-22h)
- Sauvegarde locale des réservations

### Gestion des réservations
- Historique complet des réservations
- Suppression de réservations
- Compte à rebours en temps réel vers la prochaine réservation
- Persistance des données en localStorage

### Mode dégradé
- Fonctionnement hors ligne avec gestion d'erreurs
- Messages d'erreur informatifs en cas d'indisponibilité des APIs
- Interface utilisable même sans connexion internet

## Architecture technique

### Structure des modules

```
JS/modules/
├── bornes/                    # Modèles de données des bornes
│   ├── Borne.js              # Classe abstraite avec factory method
│   ├── BornePublique.js      # Bornes publiques (ID pair)
│   └── BornePrivee.js        # Bornes privées (ID impair)
├── carte/                     # Gestion de la carte Leaflet
│   ├── Carte.js              # Orchestrateur principal
│   ├── Marqueurs.js          # Gestion des marqueurs
│   ├── Vue.js                # Basculement carte/liste
│   └── Geolocalisation.js    # Géolocalisation utilisateur
├── reservation/               # Gestion des réservations
│   ├── Reservation.js        # Modèle de réservation
│   ├── GestionnaireReservation.js # Gestionnaire principal
│   ├── Validation.js         # Règles de validation
│   └── indexReservation.js   # Exports centralisés
├── services/                  # Services métier
│   ├── Api.js                # Appels API externes
│   ├── SearchService.js      # Service de recherche
│   ├── ReservationService.js # Service de réservation
│   └── indexServices.js      # Exports centralisés
├── UI/                       # Interface utilisateur
│   ├── GestionnaireForm.js   # Gestion des formulaires
│   ├── GestionnaireEvent.js  # Gestion des événements
│   └── indexUI.js            # Exports centralisés
└── main.js                   # Point d'entrée de l'application
```

### Technologies utilisées

- **JavaScript ES6+** : Modules, classes, async/await
- **Leaflet.js** : Carte interactive
- **Nominatim API** : Géocodage d'adresses
- **Overpass API** : Récupération des bornes de recharge
- **localStorage** : Persistance des données
- **HTML5/CSS3** : Interface utilisateur responsive

## Installation et utilisation

### Prérequis
- Navigateur web moderne supportant ES6 modules
- Connexion internet pour les APIs (optionnel en mode dégradé)

### Installation
1. Cloner le repository
2. Ouvrir `index.html` dans un navigateur web ou avec live server
3. L'application se charge automatiquement

### Utilisation
1. **Recherche** : Saisir une adresse et cliquer sur "Rechercher"
2. **Visualisation** : Les bornes s'affichent sur la carte et en liste
3. **Réservation** : Cliquer sur "Réserver" d'une borne, remplir le formulaire
4. **Gestion** : Consulter et supprimer les réservations dans "Mes réservations"

## APIs utilisées

### Nominatim (Géocodage)
- **URL** : `https://nominatim.openstreetmap.org/search`
- **Fonction** : Conversion adresse → coordonnées GPS
- **Format** : JSON

### Overpass (Bornes de recharge)
- **URL** : `https://overpass-api.de/api/interpreter`
- **Fonction** : Récupération des bornes dans un rayon donné
- **Format** : JSON avec requête Overpass QL

## Validation et règles métier

### Règles de réservation
- **Date** : Doit être dans le futur
- **Heure** : Entre 6h00 et 22h00
- **Durée** : Entre 1 et 6 heures
- **Borne** : Doit être sélectionnée

### Types de bornes
- **Borne Publique** : ID pair, icône bleue, accès libre
- **Borne Privée** : ID impair, icône grise, propriétaire assigné

## Gestion d'erreurs

### Mode dégradé
- Gestion des erreurs de connexion API
- Messages d'erreur informatifs pour l'utilisateur
- Interface fonctionnelle même sans APIs
- Persistance des données locales

### Validation des données
- Vérification des entrées utilisateur
- Messages d'erreur contextuels
- Prévention des données invalides

## Extensibilité

### Ajout de nouvelles règles de validation
```javascript
export class NouvelleRegle extends ValidationRule {
    validate(date, time, duration) {
        // Logique de validation
        return { isValid: true/false, error: 'message' };
    }
}
```

### Ajout de nouveaux types de bornes
```javascript
export class NouvelleBorne extends Borne {
    getType() { return 'Nouveau Type'; }
    getIconColor() { return '#couleur'; }
    toHTML() { return 'HTML personnalisé'; }
}
```

## Performance

### Optimisations
- Imports dynamiques pour éviter les références circulaires
- Mise à jour optimisée du compte à rebours

### Limitations
- Dépendance aux APIs externes
- Stockage local limité par le navigateur

## Licence

Ce projet est développé dans le cadre d'un examen de module JavaScript pour le titre de Concepteur Développeur d'Applications.