import { element, by, ElementFinder } from 'protractor';

export class TrazaPeticionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-traza-peticion div table .btn-danger'));
    title = element.all(by.css('jhi-traza-peticion div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TrazaPeticionUpdatePage {
    pageTitle = element(by.id('jhi-traza-peticion-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    tipoNotificacionSelect = element(by.id('field_tipoNotificacion'));
    nombreOperacionSelect = element(by.id('field_nombreOperacion'));
    fechaInput = element(by.id('field_fecha'));
    observacionesInput = element(by.id('field_observaciones'));
    contactoSelect = element(by.id('field_contacto'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTipoNotificacionSelect(tipoNotificacion) {
        await this.tipoNotificacionSelect.sendKeys(tipoNotificacion);
    }

    async getTipoNotificacionSelect() {
        return this.tipoNotificacionSelect.element(by.css('option:checked')).getText();
    }

    async tipoNotificacionSelectLastOption() {
        await this.tipoNotificacionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setNombreOperacionSelect(nombreOperacion) {
        await this.nombreOperacionSelect.sendKeys(nombreOperacion);
    }

    async getNombreOperacionSelect() {
        return this.nombreOperacionSelect.element(by.css('option:checked')).getText();
    }

    async nombreOperacionSelectLastOption() {
        await this.nombreOperacionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setFechaInput(fecha) {
        await this.fechaInput.sendKeys(fecha);
    }

    async getFechaInput() {
        return this.fechaInput.getAttribute('value');
    }

    async setObservacionesInput(observaciones) {
        await this.observacionesInput.sendKeys(observaciones);
    }

    async getObservacionesInput() {
        return this.observacionesInput.getAttribute('value');
    }

    async contactoSelectLastOption() {
        await this.contactoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async contactoSelectOption(option) {
        await this.contactoSelect.sendKeys(option);
    }

    getContactoSelect(): ElementFinder {
        return this.contactoSelect;
    }

    async getContactoSelectedOption() {
        return this.contactoSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class TrazaPeticionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-trazaPeticion-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-trazaPeticion'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
