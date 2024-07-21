// Image URL to be added to each product
const imageUrl_1 = "./assets/shoes-img-1.webp";
const imageUrl_2 = "./assets/shoes-img-2.webp";

// Generate the array with 1000 elements
const products = [];
for (let i = 0; i < 100; i++) {
  const product = {
    description: "Tenis Classics | Club C Revenge Vintage | Mujer",
    price: 599.9,
    imageUrl_1,
    imageUrl_2,
    category: "Classics",
    condtion:"NUEVO"
  };
  products.push(product);
}
