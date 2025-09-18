export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      url: "/pdfs/sample.pdf", // assumes you put the file in "public/pdfs/"
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}
