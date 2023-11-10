import { Locator, Page } from "@playwright/test";

export class DroppablePage {
    private readonly page: Page;
    private draggableElement: Locator;
    private droppableElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.initializeLocators();
    }

    private initializeLocators(): void {
        this.draggableElement = this.page.locator('#draggable');
        this.droppableElement = this.page.locator('#simpleDropContainer > #droppable');
    }

    /**
     * Performs a drag-and-drop action from the draggable element to the droppable element.
     */
    async dragElementToDroppable(): Promise<void> {
        await this.draggableElement.dragTo(this.droppableElement);
    }

    /**
     * Retrieves the inner text of the droppable element.
     * @returns The inner text of the droppable element.
     */
    async getDroppableElementText(): Promise<string> {
        return await this.droppableElement.innerText();
    }
}

