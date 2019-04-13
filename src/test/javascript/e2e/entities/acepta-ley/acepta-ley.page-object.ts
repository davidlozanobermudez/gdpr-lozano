import { element, by, ElementFinder } from 'protractor';

export class AceptaLeyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-acepta-ley div table .btn-danger'));
    title = element.all(by.css('jhi-acepta-ley div h2#page-heading span')).first();

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

export class AceptaLeyUpdatePage {
    pageTitle = element(by.id('jhi-acepta-ley-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    enviadaInput = element(by.id('field_enviada'));
    fechaEnvioInput = element(by.id('field_fechaEnvio'));
    aceptadaInput = element(by.id('field_aceptada'));
    fechaAceptacionInput = element(by.id('field_fechaAceptacion'));
    contactoSelect = element(by.id('field_contacto'));
    versionLeySelect = element(by.id('field_versionLey'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    getEnviadaInput() {
        return this.enviadaInput;
    }
    async setFechaEnvioInput(fechaEnvio) {
        await this.fechaEnvioInput.sendKeys(fechaEnvio);
    }

    async getFechaEnvioInput() {
        return this.fechaEnvioInput.getAttribute('value');
    }

    getAceptadaInput() {
        return this.aceptadaInput;
    }
    async setFechaAceptacionInput(fechaAceptacion) {
        await this.fechaAceptacionInput.sendKeys(fechaAceptacion);
    }

    async getFechaAceptacionInput() {
        return this.fechaAceptacionInput.getAttribute('value');
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

    async versionLeySelectLastOption() {
        await this.versionLeySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async versionLeySelectOption(option) {
        await this.versionLeySelect.sendKeys(option);
    }

    getVersionLeySelect(): ElementFinder {
        return this.versionLeySelect;
    }

    async getVersionLeySelectedOption() {
        return this.versionLeySelect.element(by.css('option:checked')).getText();
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

export class AceptaLeyDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-aceptaLey-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-aceptaLey'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
