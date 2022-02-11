// Constants.js
const prod = { url: "https://code-warehouse.herokuapp.com" };

const dev = { url: "http://localhost:8000" };

export const config = process.env.NODE_ENV === "development" ? dev : prod;
