import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    relatedProducts: [],
    cart: []
  }),

  actions: {
    async fetchProducts(jsonFile) {
      try {
        const response = await fetch(`/${jsonFile}`);
        const data = await response.json();
        this.products = data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchRelatedProducts() {
      const response = await fetch('/related-products.json');
      const data = await response.json();
      this.relatedProducts = data.relatedProducts;
    },


    addToCart(product) {
      // Check if the product is already in the cart
      const existingProduct = this.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // If it is, increment the quantity
        existingProduct.quantity += 1;
      } else {
        // If not, add it to the cart with quantity 1
        this.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart(id) {
      // Remove the product from the cart
      this.cart = this.cart.filter((item) => item.id !== id);
    },

    incrementQuantity(id) {
      // Find the product in the cart
      const product = this.cart.find((item) => item.id === id);

      if (product && product.quantity < 20) {
        // Increment the quantity
        product.quantity += 1;
      }else{
        console.log("mjau");
      }
    },

    decrementQuantity(id) {
      // Find the product in the cart
      const product = this.cart.find((item) => item.id === id);

      if (product && product.quantity > 1) {
        // Decrement the quantity, but not below 1
        product.quantity -= 1;
      }
    }
    
  },
});