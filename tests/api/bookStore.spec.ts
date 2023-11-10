import { expect, test } from "../../fixtures/baseFixture";
import * as testData from "../../resources/testDataAPI";

const { validCredentials, addBooksData } = testData;

function generateUniqueUsername(userName: string): string {
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${userName}-${randomNum.toString().padStart(10, '0')}`;
}

// User Account API Tests
test.describe.parallel('Testing User Account API', () => {
    let userName: string;

    test.beforeEach(async () => {
        userName = generateUniqueUsername(validCredentials.userName);
    });

    // Happy flow
    test('Verify user account is created successfully', async ({ apiHelpers }) => {
        const response = await apiHelpers.createUser(userName, validCredentials.password);
        expect(response.status()).toEqual(201);
        const responseData = await response.json();
        expect(responseData.userID).not.toBeNull();
    });

    // Negative flow
    test('Verify error when creating user with existing username', async ({ apiHelpers }) => {
        // First, create a user with a unique username
        const userName = generateUniqueUsername(validCredentials.userName);
        await apiHelpers.createUser(userName, validCredentials.password);
    
        // Attempt to create another user with the same username
        const response = await apiHelpers.createUser(userName, validCredentials.password);
        expect(response.status()).toEqual(406);
    });

    test('Verify user cannot be created without password', async ({ apiHelpers }) => {
        const response = await apiHelpers.createUser(userName, '');
        expect(response.status()).toEqual(400);
    });

    test('Verify error in creating user with invalid password', async ({ apiHelpers }) => {
        const response = await apiHelpers.createUser(userName, 'abc');
        expect(response.status()).toEqual(400);
    });
});

// BookStores API Tests
test.describe.serial('Testing Book Store API', () => {
    let userID: string;
    let token: string;

    test.beforeAll(async ({ apiHelpers }) => {
        const userName = generateUniqueUsername(validCredentials.userName);
        const responseUserAccount = await apiHelpers.createUser(userName, validCredentials.password);
        userID = (await responseUserAccount.json()).userID;

        const responseToken = await apiHelpers.generateToken(userName, validCredentials.password);
        token = (await responseToken.json()).token;
    });

    // Happy flow
    test('Verify book is added successfully', async ({ apiHelpers }) => {
        const booksDataWithUserID = { ...addBooksData, userId: userID };
        const response = await apiHelpers.addBooks(booksDataWithUserID, token);
        expect(response.status()).toEqual(201);
        const responseData = await response.json();
        const requestBooks = booksDataWithUserID.collectionOfIsbns.map(book => book.isbn);
        const responseBooks = responseData.books.map(book => book.isbn);
        expect(responseBooks.sort()).toEqual(requestBooks.sort());
    });


    // Negative flow
    test('Verify error when adding a book with invalid ISBN', async ({ apiHelpers }) => {
        // Create data for adding a book with an invalid ISBN
        const invalidBookData = { ...addBooksData, userId: userID, collectionOfIsbns: [{ isbn: "invalid-isbn" }] };
        const response = await apiHelpers.addBooks(invalidBookData, token);
        expect(response.status()).toEqual(400); // Assuming 400 is the status code for bad request
    });

    test('Verify error when invalid user id is provided', async ({ apiHelpers }) => {
        const booksDataWithInvalidUserID = { ...addBooksData, userId: '123' };
        const response = await apiHelpers.addBooks(booksDataWithInvalidUserID, token);
        expect(response.status()).toEqual(401);
    });

    test('Verify error when trying to add book without authorization', async ({ apiHelpers }) => {
        const booksDataWithUserID = { ...addBooksData, userId: userID };
        const response = await apiHelpers.addBooks(booksDataWithUserID, '');
        expect(response.status()).toEqual(401);
    });

    test('Verify book is removed successfully', async ({ apiHelpers }) => {
        const bookDataWithUserID = { isbn: addBooksData.collectionOfIsbns[0].isbn, userId: userID };
        const response = await apiHelpers.removeBook(bookDataWithUserID, token);
        expect(response.status()).toEqual(204);
    });    
});
