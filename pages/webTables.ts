import { Locator, Page } from "@playwright/test";

export class WebTables {
    private addBtn: Locator;
    private firstName: Locator;
    private lastName: Locator;
    private userEmail: Locator;
    private age: Locator;
    private salary: Locator;
    private department: Locator;
    private submit: Locator;
    private deleteBtn: Locator;
    private rows: Locator;

    constructor(public page: Page) {
        this.initializeLocators();
    }

    private initializeLocators() {
        this.addBtn = this.page.locator('#addNewRecordButton');
        this.firstName = this.page.locator('#firstName');
        this.lastName = this.page.locator('#lastName');
        this.userEmail = this.page.locator('#userEmail');
        this.age = this.page.locator('#age');
        this.salary = this.page.locator('#salary');
        this.department = this.page.locator('#department');
        this.submit = this.page.locator('#submit');
        this.deleteBtn = this.page.locator('[title="Delete"]');
        this.rows = this.page.locator('.rt-tr-group');
    }

    async addRow(firstName: string, lastName: string, userEmail: string, age: string, salary: string, department: string): Promise<void> {
        await this.addBtn.click();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.userEmail.fill(userEmail);
        await this.age.fill(age);
        await this.salary.fill(salary);
        await this.department.fill(department);
        await this.submit.click();
    }

    async getTotalNumOfRows(): Promise<number> {
        return await this.deleteBtn.count();
    }

    async getRowNumByName(firstName: string): Promise<number> {
        const totalRows = await this.getTotalNumOfRows();
        for (let i = 1; i <= totalRows; i++) {
            let name = await this.rows.nth(i - 1).locator('.rt-td').first().innerText();
            if (name === firstName) {
                return i;
            }
        }
        return -1;
    }

    async editRow(rowNum: number, firstName?: string, lastName?: string, userEmail?: string, age?: string, salary?: string, department?: string): Promise<void> {
        await this.page.locator(`#edit-record-${rowNum}`).click();
        if (firstName) await this.firstName.fill(firstName);
        if (lastName) await this.lastName.fill(lastName);
        if (userEmail) await this.userEmail.fill(userEmail);
        if (age) await this.age.fill(age);
        if (salary) await this.salary.fill(salary);
        if (department) await this.department.fill(department);
        await this.submit.click();
    }

    async getFieldValue(rowNum: number, field: string): Promise<string> {
        const cell = this.rows.nth(rowNum - 1).locator('.rt-td').nth(this.getFieldIndex(field));
        return cell.innerText();
    }

    private getFieldIndex(field: string): number {
        switch (field.toLowerCase()) {
            case 'first name': return 0;
            case 'last name': return 1;
            case 'email': return 2;
            case 'age': return 3;
            case 'salary': return 4;
            case 'department': return 5;
            default: return -1;
        }
    }
}
