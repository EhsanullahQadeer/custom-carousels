// Possible categories and brands
const categories = [
  "Electronics",
  "Clothing",
  "Home Appliances",
  "Books",
  "Sports",
  "Toys",
  "Beauty",
  "Automotive",
  "Food",
  "Health",
];
const brands = [
  "BrandA",
  "BrandB",
  "BrandC",
  "BrandD",
  "BrandE",
  "BrandF",
  "BrandG",
  "BrandH",
  "BrandI",
  "BrandJ",
];

// Image URL to be added to each product
const imageUrl = `https://hiraoka.com.pe/media/catalog/product/9/7/97948-01.jpg?quality=80&bg-color=
      255,255,255&fit=bounds&height=300&width=240&canvas=240:300`;

// Function to get a random element from an array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// Function to generate a random price between min (inclusive) and max (inclusive)
function getRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate the array with 1000 elements
const products = [];
for (let i = 0; i < 10; i++) {
  const price=getRandomPrice(1, 20000);
  const product = {
    id: i + 1,
    name: `Product ${i + 1}`,
    category: getRandomElement(categories),
    brand: getRandomElement(brands),
    image: imageUrl,
    price,
    onlinePrice:price * 0.9 
  };
  products.push(product);
}

// Function to get unique categories and brands
function getUniqueCategoriesAndBrands(products) {
  const uniqueCategories = new Set();
  const uniqueBrands = new Set();
  for (const product of products) {
    uniqueCategories.add(product.category);
    uniqueBrands.add(product.brand);
  }
  return {
    categories: Array.from(uniqueCategories),
    brands: Array.from(uniqueBrands),
  };
}
// Function to format price into currency-like format
function formatPrice(price) {
  // Convert price to fixed 2 decimal places
  const formattedPrice = price.toFixed(2);

  // Add comma as thousand separator
  const parts = formattedPrice.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `S/ ${parts.join(".")}`;
}

const itemsPerPage = 20;
let currentPage = 1;
// Initial display of products
filteredProducts = products;

const priceRanges = [
  { min: 0, max: 1000 },
  { min: 1000, max: 1500 },
  { min: 1500, max: 1800 },
  { min: 1800, max: 2000 },
  { min: 2000, max: 3000 },
  { min: 3000, max: 3500 },
  { min: 3500, max: 5000 },
  { min: 5000, max: 10000 },
  { min: 10000, max: 20000 },
];
