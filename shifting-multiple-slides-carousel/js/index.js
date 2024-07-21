

// Image URL to be added to each product
const frontImageUrl = "./assets/productFronImg.webp";
const backImageUrl = "./assets/productBackImg.webp";

// Generate the array with 1000 elements
const products = [];
for (let i = 0; i < 100; i++) {
  const product = {
    description: "Pañal Babysec Super Premium Talla XXG 38 un",
    price: 50.9,
    frontImageUrl,
    backImageUrl,
  };
  products.push(product);
}