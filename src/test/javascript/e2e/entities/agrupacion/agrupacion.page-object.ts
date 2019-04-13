import { element, by, ElementFinder } from 'protractor';

export class AgrupacionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-agrupacion div table .btn-danger'));
    title = element.all(by.css('jhi-agrupacion div h2#page-heading span')).first();

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

export class AgrupacionUpdatePage {
    pageTitle = element(by.id('jhi-agrupacion-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codigoInput = element(by.id('field_codigo'));
    nombreInput = element(by.id('field_nombre'));
    leyesSelect = element(by.id('field_leyes'));
    operacionesSelect = element(by.id('field_operaciones'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodigoInput(codigo) {
        await this.codigoInput.sendKeys(codigo);
    }

    async getCodigoInput() {
        return this.codigoInput.getAttribute('value');
    }

    async setNombreInput(nombre) {
        await this.nombreInput.sendKeys(nombre);
    }

    async getNombreInput() {
        return this.nombreInput.getAttribute('value');
    }

    async leyesSelectLastOption() {
        await this.leyesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async leyesSelectOption(option) {
        await this.leyesSelect.sendKeys(option);
    }

    getLeyesSelect(): ElementFinder {
        return this.leyesSelect;
    }

    async getLeyesSelectedOption() {
        return this.leyesSelect.element(by.css('option:checked')).getText();
    }

    async operacionesSelectLastOption() {
        await this.operacionesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async operacionesSelectOption(option) {
        await this.operacionesSelect.sendKeys(option);
    }

    getOperacionesSelect(): ElementFinder {
        return this.operacionesSelect;
    }

    async getOperacionesSelectedOption() {
        return this.operacionesSelect.element(by.css('option:checked')).getText();
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

export class AgrupacionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-agrupacion-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-agrupacion'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
