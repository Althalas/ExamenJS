// Gestionnaire de formulaires et interactions UI
export class GestionnaireForm {
    constructor() {
        this.selectedBorne = null;
    }
//configurer les valeurs par défaut
    configureDefaultValues() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
        document.getElementById('date').min = today;
        document.getElementById('time').value = '12:00';
        document.getElementById('duration').value = '1';
    }
//récupérer les données du formulaire
    getFormData() {
        return {
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            duration: document.getElementById('duration').value
        };
    }
//mettre à jour la borne sélectionnée
    updateSelectedBorne(borne) {
        this.selectedBorne = borne;
        document.getElementById('selected-borne').textContent = borne ? `(id: ${borne.id})` : '';
    }
//récupérer la borne sélectionnée
    getSelectedBorne() {
        return this.selectedBorne;
    }
//effacer la borne sélectionnée
    clearSelectedBorne() {
        this.selectedBorne = null;
        this.updateSelectedBorne(null);
    }
} 