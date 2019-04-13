import { element, by, ElementFinder } from 'protractor';

export class ContactoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-contacto div table .btn-danger'));
    title = element.all(by.css('jhi-contacto div h2#page-heading span')).first();

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

export class ContactoUpdatePage {
    pageTitle = element(by.id('jhi-contacto-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    idCuentaInput = element(by.id('field_idCuenta'));
    statusSelect = element(by.id('field_status'));
    emailInput = element(by.id('field_email'));
    telefonoInput = element(by.id('field_telefono'));
    codPaisInput = element(by.id('field_codPais'));
    codIdomaInput = element(by.id('field_codIdoma'));
    agrupacionesSelect = element(by.id('field_agrupaciones'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setIdCuentaInput(idCuenta) {
        await this.idCuentaInput.sendKeys(idCuenta);
    }

    async getIdCuentaInput() {
        return this.idCuentaInput.getAttribute('value');
    }

    async setStatusSelect(status) {
        await this.statusSelect.sendKeys(status);
    }

    async getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    async statusSelectLastOption() {
        await this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setTelefonoInput(telefono) {
        await this.telefonoInput.sendKeys(telefono);
    }

    async getTelefonoInput() {
        return this.telefonoInput.getAttribute('value');
    }

    async setCodPaisInput(codPais) {
        await this.codPaisInput.sendKeys(codPais);
    }

    async getCodPaisInput() {
        return this.codPaisInput.getAttribute('value');
    }

    async setCodIdomaInput(codIdoma) {
        await this.codIdomaInput.sendKeys(codIdoma);
    }

    async getCodIdomaInput() {
        return this.codIdomaInput.getAttribute('value');
    }

    async agrupacionesSelectLastOption() {
        await this.agrupacionesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async agrupacionesSelectOption(option) {
        await this.agrupacionesSelect.sendKeys(option);
    }

    getAgrupacionesSelect(): ElementFinder {
        return this.agrupacionesSelect;
    }

    async getAgrupacionesSelectedOption() {
        return this.agrupacionesSelect.element(by.css('option:checked')).getText();
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

export class ContactoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-contacto-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-contacto'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
