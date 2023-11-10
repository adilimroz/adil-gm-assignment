import { APIRequestContext, APIResponse } from "@playwright/test";

export class APIHelpers {
    constructor(private request: APIRequestContext, private baseURL: string) {}

    private async makeRequest(method: 'post' | 'delete', endpoint: string, data: any, token?: string): Promise<APIResponse> {
        try {
            const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
            return await this.request[method](`${this.baseURL}${endpoint}`, { data, headers });
        } catch (error) {
            console.error(`Error in ${method.toUpperCase()} request to ${endpoint}:`, error);
            throw error;
        }
    }

    async createUser(userName: string, password: string): Promise<APIResponse> {
        return this.makeRequest('post', '/Account/v1/User', { userName, password });
    }

    async generateToken(userName: string, password: string): Promise<APIResponse> {
        return this.makeRequest('post', '/Account/v1/GenerateToken', { userName, password });
    }

    async addBooks(booksData: any, token: string): Promise<APIResponse> {
        return this.makeRequest('post', '/BookStore/v1/Books', booksData, token);
    }

    async removeBook(bookData: any, token: string): Promise<APIResponse> {
        return this.makeRequest('delete', '/Bookstore/v1/Book', bookData, token);
    }
}
