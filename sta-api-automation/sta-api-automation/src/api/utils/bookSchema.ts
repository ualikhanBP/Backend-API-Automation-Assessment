export const booksSchema = {
  type: "object",
  patternProperties: {
    "^ISBN:|LCCN:": {
      type: "object",
      properties: {
        bib_key: { type: "string" },
        info_url: { type: "string", format: "uri" },
        preview: { type: "string", enum: ["noview", "borrow"] },
        preview_url: { type: "string", format: "uri" },
        thumbnail_url: { type: "string", format: "uri" }
      },
      required: ["bib_key", "info_url", "preview", "preview_url", "thumbnail_url"],
      additionalProperties: true
    }
  },
  additionalProperties: false
};
