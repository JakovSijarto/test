<template>
    <div class="w-full">
        <div class="w-full h-[70px] bg-[#FAFAFA] flex items-center justify-center">
            <div class="w-[1350px] text-[#565656] text-[30px] !font-light mulifont ml-4">
                KORPA
            </div>
            
        </div>
    </div>
    <div v-if="!store.cart.length" class="w-full flex justify-center items-center flex-col">
        <p class="py-[20px] py-[30px] leading-[51px] border border-[#e1e1e1] w-[1350px] text-center text-[#3d3d3d] text-[25px] my-[44px] max-[1380px]:w-[97%]">Empty Cart...</p>
        <button @click="router.push({ name:'kolacinakomad' })" class="border mulifont leading-[21px] tracking-[.1em] uppercase py-[13px] px-[47px] bg-[#c4b4a7] text-[white] text-[12px] font-semibold mb-[120px]">Back To Catalog</button>
    </div>
    <div v-else>
      <div class="w-full flex justify-center items-center mt-[40px]">
      <div class="flex w-[1350px] justify-between items-center py-[10px] border-b text-[#3d3d3d] font-semibold mx-4">
        <p class="w-[25%] max-[550px]:w-[100%]">Product</p>
        <p class="w-[25%] pl-8 max-[550px]:pl-0"></p>
        <p class="w-[25%] max-[550px]:w-[100%]">Quantity</p>
        <p class="w-[25%] max-[550px]:w-[100%]">Subtotal</p>
      </div>
    </div>
    
    <div 
    v-for="item in store.cart"
    :key="item.id"
    >
    <div class="w-full flex justify-center items-center">
      <div class="flex w-[1350px] justify-between items-center py-[25px] border-b text-[#3d3d3d] mx-4">
        <img :src="item.thumbnail" alt="" class="w-[25%] h-[150px] object-cover max-[550px]:hidden">
        <p class="w-[25%] pl-8 max-[500px]:pl-0 max-[360px]:text-[11px]">{{ item.name }}</p>
        <p class="w-[25%] pl-2 flex h-[50px]">
        <input class="border p-2 w-[60px] text-center max-[360px]:w-[30px]" type="number" placeholder="0" v-model="item.quantity" @input="updateQuantity(item)" :max="20" :disabled="item.quantity === 20">
        <div class="flex flex-col justify-center border w-[30px] ">
          <button @click="incrementQuantity(item.id)" :disabled="item.quantity === 20" class="">+</button>
          <hr>
          <button @click="decrementQuantity(item.id)" :disabled="item.quantity === 1" class="">-</button>
        </div>
      </p>
        <p class="w-[25%]">{{ formatCurrency(item.price * item.quantity, 'RSD') }}</p>
        <button @click="removeFromCart(item.id)">&#10006;</button>
      </div>
    </div>
  </div>
  <div class="flex justify-center items-center w-full">
    <div class="flex w-[1350px] justify-between items-center py-[35px] mx-4">
  <div class="text-[#3D3D3D] font-bold uppercase">total: {{ formatCurrency(calculateTotalAmount(), 'RSD') }}</div>
  <button @click="checkout" class="border mulifont leading-[21px] tracking-[.1em] uppercase py-[13px] px-[47px] bg-[#c4b4a7] text-[white] text-[12px] font-semibold ">Pay Now</button>
    </div>
  </div>
<div class="flex justify-center mx-4">
  <button @click="router.push({ name:'home' })" class="border mulifont leading-[21px] tracking-[.1em] uppercase py-[13px] px-[47px] bg-[#c4b4a7] text-[white] text-[12px] font-semibold mb-[120px] w-[1350px]">Back To Home</button>
</div>
  </div>
  <div>
    
  </div>
</template>
<script setup>
import { useProductsStore } from "../store/products_kolaci";
import { useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const store = useProductsStore()
const cart = ref(store.cart);
const router = useRouter();

  const removeFromCart = (id) => {
    store.removeFromCart(id)
  }

  const incrementQuantity = (id) => {
  const product = cart.value.find((item) => item.id === id);

  if (product && getQuantity(product) < 20) {
    store.incrementQuantity(id);
  }
};

const decrementQuantity = (id) => {
  store.decrementQuantity(id);
};

const updateQuantity = (product) => {
  // Update the quantity directly in the cart
  const existingProduct = cart.value.find((item) => item.id === product.id);
  if (existingProduct) {
    // Ensure the quantity is within the range [0, 20]
    existingProduct.quantity = Math.min(Math.max(parseInt(product.quantity, 10) || 1, 1), 20);
  }
};

const getQuantity = (product) => {
  return product ? product.quantity : 0;
};

onMounted(() => {
  cart.value = store.cart;
});

const calculateTotalAmount = () => {
  return cart.value.reduce((total, item) => total + item.price * item.quantity, 0);
};

const formatCurrency = (amount, currencyCode) => {
  return new Intl.NumberFormat('sr-RS', { style: 'currency', currency: currencyCode }).format(amount);
};

const productName = 'Produkti';
let stripe = null;
let customPrice = 0; // Initialize customPrice

const loadStripe = async () => {
  const { loadStripe } = await import('@stripe/stripe-js');
  stripe = await loadStripe("pk_test_51MFvJjGp8AV7HwpgrgahJzd6q0NbRKEsZomUODXOM8kbdgNTaubWhDUXqaCGEw6eFROfmOE97YXg6PW6Prnkb56G00ZsBI6ahj");
  console.log('Stripe API key:', stripe);
};

const checkout = async () => {
  try {
    if (!stripe) {
      await loadStripe();
    }

    // Calculate total amount dynamically
    customPrice = calculateTotalAmount();

    const response = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: customPrice,
        productName,
      }),
    });

    const session = await response.json();

    // Use stripe object to call redirectToCheckout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

onMounted(() => {
  // Load Stripe when the component is created
  loadStripe();
});
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
