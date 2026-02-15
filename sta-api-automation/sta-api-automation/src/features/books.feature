Feature: OpenLibrary Books API

  Scenario: Validate books API response
    Given I send a GET request to the OpenLibrary books API
    Then the response status code should be 200
    And the response time should be less than 2000 ms
    And the number of returned books should be 3
    And the book details should be correct
    And the thumbnail images should match the expected images
    And the response should match the JSON schema
