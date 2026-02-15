import { Given, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ApiClient } from '../api/clients/apiClient';
import { BooksApiPage } from '../api/pages/booksApi.page';
import { compareImages } from '../api/utils/imageUtils';
import { TEST_CONFIG } from '../api/utils/testConfig';
import Ajv from "ajv";
import addFormats from "ajv-formats";  // <-- new import
import { booksSchema } from "../api/utils/bookSchema";


let apiClient: ApiClient;
let booksApi: BooksApiPage;
let responseBody: any;

Given('I send a GET request to the OpenLibrary books API', async () => {
  apiClient = new ApiClient();
  await apiClient.init();

  booksApi = new BooksApiPage(apiClient);
  await booksApi.fetchBooks();

  responseBody = await booksApi.getResponseBody();
});

Then('the response status code should be {int}', (statusCode: number) => {
  expect(booksApi.getStatusCode()).to.equal(statusCode);
});

Then('the response time should be less than {int} ms', (maxTime: number) => {
  expect(booksApi.getResponseTime()).to.be.lessThan(maxTime);
});

Then('the number of returned books should be {int}', (count: number) => {
  expect(Object.keys(responseBody)).to.have.lengthOf(count);
});

Then('the book details should be correct', () => {
  const book1 = responseBody['ISBN:0201558025'];
  const book2 = responseBody['LCCN:93005405'];
  const book3 = responseBody['ISBN:1583762027'];

  // Common required fields
  [book1, book2, book3].forEach((book) => {
    expect(book.bib_key).to.exist;
    expect(book.info_url).to.include('openlibrary.org/books');
    expect(book.preview).to.be.oneOf(['noview', 'borrow']);
    expect(book.thumbnail_url).to.match(/covers\.openlibrary\.org/);
  });

  // Specific known values (safe checks)
  expect(book1.bib_key).to.equal('ISBN:0201558025');
  expect(book2.bib_key).to.equal('LCCN:93005405');
  expect(book3.bib_key).to.equal('ISBN:1583762027');
});


Then('the thumbnail images should match the expected images', async () => {
  for (const bookKey of Object.keys(TEST_CONFIG.imageMapping)) {
    const book = responseBody[bookKey];

    if (!book || !book.thumbnail_url) {
      throw new Error(`Thumbnail missing for ${bookKey}`);
    }

    const expectedImagePath =
      TEST_CONFIG.imageMapping[bookKey as keyof typeof TEST_CONFIG.imageMapping];

    const isSame = await compareImages(
      expectedImagePath,
      book.thumbnail_url
    );

    expect(
      isSame,
      `Thumbnail image mismatch for ${bookKey}`
    ).to.be.true;
  }
});

Then("the response should match the JSON schema", () => {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  const validate = ajv.compile(booksSchema);

  const valid = validate(responseBody);

  if (!valid) {
    console.error(validate.errors);
  }

  expect(valid, "Response does not match JSON schema").to.be.true;
});
