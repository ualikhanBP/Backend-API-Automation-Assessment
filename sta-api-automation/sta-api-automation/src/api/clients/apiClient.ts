import { APIRequestContext, request } from '@playwright/test';

export class ApiClient {
  private context!: APIRequestContext;

  async init(): Promise<void> {
    this.context = await request.newContext();
  }

  async get(url: string) {
    return this.context.get(url);
  }
}
