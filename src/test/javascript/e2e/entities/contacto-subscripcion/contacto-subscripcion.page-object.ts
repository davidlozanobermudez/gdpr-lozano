import { element, by, ElementFinder } from 'protractor';

export class ContactoSubscripcionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-contacto-subscripcion div table .btn-danger'));
    title = element.all(by.css('jhi-contacto-subscripcion div h2#page-heading span')).first();

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

export class ContactoSubscripcionUpdatePage {
    pageTitle = element(by.id('jhi-contacto-subscripcion-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    fechaInput = element(by.id('field_fecha'));
    contactoSelect = element(by.id('field_contacto'));
    subscripcionSelect = element(by.id('field_subscripcion'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFechaInput(fecha) {
        await this.fechaInput.sendKeys(fecha);
    }

    async getFechaInput() {
        return this.fechaInput.getAttribute('value');
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

    async subscripcionSelectLastOption() {
        await this.subscripcionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async subscripcionSelectOption(option) {
        await this.subscripcionSelect.sendKeys(option);
    }

    getSubscripcionSelect(): ElementFinder {
        return this.subscripcionSelect;
    }

    async getSubscripcionSelectedOption() {
        return this.subscripcionSelect.element(by.css('option:checked')).getText();
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

export class ContactoSubscripcionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-contactoSubscripcion-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-contactoSubscripcion'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
