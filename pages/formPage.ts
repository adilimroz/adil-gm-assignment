import { Locator, Page } from "@playwright/test";

export interface FormData {
    firstName: string;
    lastName: string;
    userEmail: string;
    gender: string;
    phoneNumber: string;
    dateOfBirth: string;
    subjects: string;
    hobbies: string;
    imagePath: string;
    currentAddress: string;
    stateAndCity: string;
}

export class FormPage {
    private firstName: Locator;
    private lastName: Locator;
    private email: Locator;
    private genderMale: Locator;
    private genderFemale: Locator;
    private genderOther: Locator;
    private mobile: Locator;
    private dob: Locator;
    private subjects: Locator;
    private sportsHobby: Locator;
    private readingHobby: Locator;
    private musicHobby: Locator;
    private uploadPicture: Locator;
    private currentAddress: Locator;
    private state: Locator;
    private city: Locator;
    private successMsg: Locator;

    constructor(public page: Page) {
        this.firstName = this.page.locator('#firstName');
        this.lastName = this.page.locator('#lastName');
        this.email = this.page.locator('#userEmail');
        this.genderMale = this.page.locator('//input[@value="Male"]//following-sibling::label');
        this.genderFemale = this.page.locator('//input[@value="Female"]//following-sibling::label');
        this.genderOther = this.page.locator('//input[@value="Other"]//following-sibling::label');
        this.mobile = this.page.locator('#userNumber');
        this.dob = this.page.locator('#dateOfBirthInput');
        this.subjects = this.page.locator('#subjectsInput');
        this.sportsHobby = this.page.locator('//label[text()="Sports"]')
        this.readingHobby = this.page.locator('//label[text()="Reading"]')
        this.musicHobby = this.page.locator('//label[text()="Music"]')
        this.uploadPicture = this.page.getByText('Select picture')
        this.currentAddress = this.page.locator('#currentAddress');
        this.state = this.page.locator('//div[text()="Select State"]//parent::div//input');
        this.city = this.page.locator('//div[text()="Select City"]//parent::div//input');
        this.successMsg = this.page.locator('#example-modal-sizes-title-lg');
    }

    async fillForm(formData: FormData) {
        await this.firstName.fill(formData.firstName);
        await this.lastName.fill(formData.lastName);
        await this.email.fill(formData.userEmail);

        switch (formData.gender) {
            case 'Male':
                await this.genderMale.click();
                break;
            case 'Female':
                await this.genderFemale.click();
                break;
            case 'Other':
                await this.genderOther.click();
                break;
        }

        await this.mobile.fill(formData.phoneNumber);
        await this.dob.fill(formData.dateOfBirth);
        await this.page.keyboard.press('Enter');
        await this.subjects.fill(formData.subjects);

        if (formData.hobbies.includes('Sports'))
            await this.sportsHobby.click();
        if (formData.hobbies.includes('Reading'))
            await this.readingHobby.click();
        if (formData.hobbies.includes('Music'))
            await this.musicHobby.click();

        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.uploadPicture.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(formData.imagePath);

        await this.currentAddress.fill(formData.currentAddress);

        const [state, city] = formData.stateAndCity.split(',').map(s => s.trim());
        await this.state.fill(state);
        await this.page.keyboard.press('Enter');
        await this.city.fill(city);
        await this.page.keyboard.press('Enter');

        await this.page.keyboard.press('Enter');
    }

    getSuccessMsg() {
        return this.successMsg;
    }
}
