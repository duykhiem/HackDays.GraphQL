import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

export function getProducts() {
  const query = `{
      products {
        id,
        name,
        code,
        imageUrl,
        price
      }
    }`;

  return fetch(`${baseUrl}/graphql`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ query: query })
    })
    .then(handleResponse)
    .catch(handleError);
}

export function saveProduct(product) {
  return fetch(baseUrl + (product.id || ""), {
    method: product.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProduct(productId) {
    const query = `mutation {
        status: deleteProduct(id: ${productId})
    }`;
    
    return fetch(`${baseUrl}/graphql`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ query: query })
    })
    .then(handleResponse)
    .catch(handleError);
}