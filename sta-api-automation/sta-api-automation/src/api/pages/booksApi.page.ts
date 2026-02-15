import { ApiClient } from '../clients/apiClient';

export class BooksApiPage {
  private response: any;
  private responseTime!: number;

  private readonly endpoint =
    'https://openlibrary.org/api/books?bibkeys=ISBN:0201558025,LCCN:93005405,ISBN:1583762027&format=json';

  constructor(private apiClient: ApiClient) {}

  async fetchBooks(): Promise<void> {
    const start = Date.now();
    this.response = await this.apiClient.get(this.endpoint);
    this.responseTime = Date.now() - start;
  }

  getStatusCode(): number {
    return this.response.status();
  }

  getResponseTime(): number {
    return this.responseTime;
  }

  async getResponseBody(): Promise<any> {
    return this.response.json();
  }
}
