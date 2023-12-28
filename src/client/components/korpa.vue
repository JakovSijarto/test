<template>
    <div class="w-full">
        <div class="w-full h-[70px] bg-[#FAFAFA] flex items-center justify-center">
            <div class="w-[1350px] text-[#565656] text-[30px] !font-light mulifont ml-4">
                KORPA
            </div>
            
        </div>
    </div>
    <div v-if="!store.cart.length" class="w-full flex justify-center items-center flex-col">
        <p class="py-[20px] py-[30px] leading-[51px] border border-[#e1e1e1] w-[1350px] text-center text-[#3d3d3d] text-[25px] my-[44px] max-[1380px]:w-[97%]">Prazna korpa...</p>
        <button @click="router.push({ name:'kolacinakomad' })" class="border mulifont leading-[21px] tracking-[.1em] uppercase py-[13px] px-[47px] bg-[#c4b4a7] text-[white] text-[12px] font-semibold mb-[120px]">Natrag na početnu</button>
    </div>
    <div v-else>
      <div class="w-full flex justify-center items-center mt-[40px]">
      <div class="flex w-[1350px] justify-between items-center py-[10px] border-b text-[#3d3d3d] font-semibold mx-4">
        <p class="w-[25%] max-[550px]:w-[100%]">Produkt</p>
        <p class="w-[25%] pl-8 max-[550px]:pl-0"></p>
        <p class="w-[25%] max-[550px]:w-[100%]">Količina</p>
        <p class="w-[25%] max-[550px]:w-[100%]">Ukupno</p>
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
  <div class="text-[#3D3D3D] font-bold uppercase">Sveukupno: {{ formatCurrency(calculateTotalAmount(), 'RSD') }}</div>
  <button @click="checkout_form" class="border mulifont leading-[21px] tracking-[.1em] uppercase py-[13px] px-[47px] bg-[#c4b4a7] text-[white] text-[12px] font-semibold ">Nastavi</button> 
    </div>
  </div>
  <div class="flex w-full" v-if="isActive"
  >
    <form ref="form" @submit.prevent="sendEmail" class="flex w-full flex-col justify-center items-center">
      <div class="flex w-[1350px] justify-between py-4 max-[1380px]:w-full px-2 max-[480px]:flex-col max-[480px]:gap-[1em]">
        <div class="w-[1350px] flex flex-col max-[1380px]:w-full ">
          <Label class="pb-2 mulifont text-[19px]">Ime:</Label>
          <input type="text" class="border w-[90%] h-[50px] pl-2 max-[480px]:w-full" required name="ime" v-model="ime">
        </div>
        <div class="w-[1350px] flex flex-col max-[1380px]:w-full">
          <Label class="pb-2 mulifont text-[19px]">Prezime:</Label>
          <input type="text" class="border w-[90%] h-[50px] pl-2 max-[480px]:w-full" required name="prezime" v-model="prezime">
        </div>
      </div>
      <div class="flex w-[1350px] justify-between max-[1380px]:w-full px-2 max-[480px]:gap-[1em] max-[480px]:flex-col ">
        <div class="w-[1350px] flex flex-col max-[1380px]:w-full">
          <Label class="pb-2 mulifont text-[19px]">Telefon:</Label>
          <input type="text" class="border w-[90%] h-[50px] pl-2 max-[480px]:w-full" required name="telefon" v-model="telefon">
        </div>
        <div class="w-[1350px] flex flex-col pb-4 max-[1380px]:w-full">
          <Label class="pb-2 mulifont text-[19px]">Mail:</Label>
          <input type="text" class="border w-[90%] h-[50px] pl-2 max-[480px]:w-full" required name="mail" v-model="mail">
        </div>
      </div>
      <div class="w-[1350px] max-[1380px]:w-full px-2">
        <div class="pb-2 mulifont text-[19px] pt-4" >*Za tortu (ako imate)</div>
      <div class="flex justify-between max-[770px]:gap-[1em] max-[480px]:flex-col max-[480px]:gap-[1em]">
        <select class="mb-[18px] max-[480px]:mb-[5px] h-[46px] bg-[#c4b4a7] border border-[white] py-[6px] px-[22px] text-[15px] w-[50%] text-white rounded-[5px] max-[480px]:w-full" placeholder="" name="velicina_torte" v-model="velicina_torte">
                <option disabled selected class="pb-2 mulifont text-[19px]">Veličina torte*</option>
                <option class="pb-2 mulifont text-[19px]">1 kg</option>
                <option class="pb-2 mulifont text-[19px]">1.5 kg</option>
                <option class="pb-2 mulifont text-[19px]">2 kg</option>
                <option class="pb-2 mulifont text-[19px]">2.5 kg</option>
                <option class="pb-2 mulifont text-[19px]">3 kg</option>
        </select>
              <div class="flex items-center justify-center gap-[0.5em] max-[480px]:justify-start max-[480px]:mb-[2em] ">
                <input type="checkbox" v-model="agreeTerms" @click="handleCheckboxClick" class="bg-[#c4b4a7] h-[20px] w-[20px] rounded-[5px]">
                <span class="mulifont text-[19px] max-[710px]:text-[14px]">Dodatna Dekoracija za tortu (+300rsd)</span>
              </div>
      </div>
      <div class="" v-if="agreeTerms">
        <span class="">Opis za dodatnu dekoraciju:</span> 
        <textarea id="" cols="30" rows="10" class="border w-full max-h-[100px] min-h-[150px] p-2" required name="opis_dekoracije" v-model="opis_dekoracije"></textarea>
      </div>
      <div class="flex items-center justify-center gap-[1em] py-8 max-[480px]:pt-4">
                <input type="checkbox" v-model="agreeTerms2" @click="handleCheckboxClick2" class="bg-[#c4b4a7] h-[20px] w-[20px] rounded-[5px]">
                <span class="mulifont text-[19px]">Želim preuzeti u prodavnici</span>
        </div>
      <div class="flex justify-between w-full max-[480px]:flex-col max-[480px]:gap-[1em]" v-if="!agreeTerms2">
        <div class="w-[50%] max-[480px]:w-full max-[480px]:text-center">
          <label for="birthday" class="pb-2 mulifont text-[19px]">Za kada želite naručiti:</label>
          <input type="date" class="border p-2 ml-4" required name="za_kada" v-model="za_kada">
      </div>
      <select class="mb-[18px] h-[46px] bg-[#c4b4a7] border w-[50%] border-[white] py-[6px] px-[22px] text-[15px] text-white rounded-[5px] max-[480px]:w-full" placeholder="" required name="zona_dostave" v-model="zona_dostave">
                <option disabled selected class="pb-2 mulifont text-[19px]" >Izaberite zonu dostave*</option>
                <option class="pb-2 mulifont text-[19px]">1. zona (5km) + 500rsd</option>
                <option class="pb-2 mulifont text-[19px]">2. zona (10km) + 1000rsd</option>
                <option class="pb-2 mulifont text-[19px]">3. zona (15km) + 1500rsd</option>
            </select>
      </div>
      <div class="flex justify-between py-8 gap-[1em] max-[480px]:flex-col max-[480px]:gap-[1em]">
        <div class="flex flex-col w-[100%]" v-if="!agreeTerms2">
          <Label class="mulifont text-[19px]">Adresa:</Label>
          <input type="text" class="border h-[30px] pl-2" required name="adresa" v-model="adresa">
        </div>
        <button @click="checkout" class="border mulifont tracking-[.1em] uppercase py-[13px] px-[47px] bg-[#c4b4a7] text-[white] text-[12px] font-semibold w-full">Plati Sada</button>
      </div>
      </div>
    </form>
  </div>
<div v-else class="flex justify-center mx-4">
  <button @click="router.push({ name:'home' })" class="border mulifont leading-[21px] tracking-[.1em] uppercase py-[13px] px-[47px] bg-[#c4b4a7] text-[white] text-[12px] font-semibold mb-[120px] w-[1350px]">Natrag na početnu</button>
</div>

  </div>
</template>
<script setup>
import { useProductsStore } from "../store/products_kolaci";
import { useRouter } from "vue-router";
import { ref, onMounted } from 'vue';
import { loadStripe as stripeLoader } from '@stripe/stripe-js/pure';

const store = useProductsStore()
const cart = ref(store.cart);
const router = useRouter();

  const removeFromCart = (id) => {
    store.removeFromCart(id);

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
  try {
    stripe = await stripeLoader(import.meta.env.VITE_APP_STRIPE_KEY_PUBLISHABLE);
  } catch (error) {
    console.error('Error loading Stripe:', error);
  }
};

const checkout = async () => {
  try {
    if (!stripe) {
      await loadStripe();
    }

    // Calculate total amount dynamically
    customPrice = calculateTotalAmount();

    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: customPrice,
        productName,
      }),
    } );

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
<script>
import emailjs from 'emailjs-com';
import swal from 'sweetalert';

export default {
  data() {
    return {
      isActive: false,
      agreeTerms: false,
      agreeTerms2: false,
      ime:"",
      prezime:"",
      telefon:"",
      mail:"",
      velicina_torte:"",
      opis_dekoracije:"",
      za_kada:"",
      zona_dostave:"",
      adresa:""
    };
  },
  methods: {
    checkout_form() {
      this.isActive = !this.isActive;
    },
    handleCheckboxClick() {
      // Do something when the checkbox is clicked
      console.log('Checkbox clicked. Is checked:', this.agreeTerms);
    },
    handleCheckboxClick2() {
      // Do something when the checkbox is clicked
      console.log('Checkbox clicked. Is checked:', this.agreeTerms2);
    },
    sendEmail() {
      emailjs.sendForm('service_26j234o', 'template_yqv85dc', this.$refs.form, 'tGrrFjuKCc7u6wh3f')
        .then((result) => {
             console.log('SUCCESS!', result.text);
            swal({title: "Uspješno!", text: "Hvala Na poruci", type: 
"success"}).then(function(){ 
   }
);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
        
    },
  },
};
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
