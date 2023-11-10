import { Locator, Page } from "@playwright/test";

export enum ElementName {
    WebTables = "Web Tables",
    // We can add more enum entries as needed
}

export class ElementsPage {
    private readonly page: Page;
    private elements: { [key in ElementName]?: Locator };

    constructor(page: Page) {
        this.page = page;
        this.elements = {};
        this.initializeLocators();
    }

    private initializeLocators(): void {
        this.elements[ElementName.WebTables] = this.page.getByText('Web Tables');
        // We can initialize more locators here
    }

    /**
     * Navigates to a specified section on the Elements page.
     * @param elementName The name of the section to navigate to.
     */
    async navigateToSection(elementName: ElementName): Promise<void> {
        const element = this.elements[elementName];
        if (!element) {
            throw new Error(`Element with name '${elementName}' not found on Elements page.`);
        }
        await element.click();
    }
}

