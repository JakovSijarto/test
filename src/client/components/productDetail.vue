<template>
    <div class="w-full max-[1024px]:pt-[69px]">
        <div class="w-full h-[70px] bg-[#FAFAFA] flex items-center justify-center ">
            <div class="w-[1350px] text-[#565656] text-[30px] !font-light mulifont ml-8 max-[390px]:text-[22px]">
                DETALJI PROIZVODA
            </div>
        </div>
    </div>

    <div class="w-full flex justify-center items-center pt-[40px] px-2">
        <div class="flex justify-between items-start w-[1350px] max-[920px]:flex-col">
            <div class="w-[50%] px-8 max-[1100px]:w-full">
                <img :src="selectedProduct.thumbnail" alt="" class="max-[920px]:w-[100%]">
                <div class="flex w-[500px] justify-between flex-wrap max-[920px]:w-[100%]">
                    <img :src="selectedProduct.images[0]" alt="" class="w-[150px] h-[100px] my-[20px] max-[920px]:w-[30%] max-[420px]:h-[50px] object-cover">
                    <img :src="selectedProduct.images[1]" alt="" class="w-[150px] h-[100px] my-[20px] max-[920px]:w-[30%] max-[420px]:h-[50px] object-cover">
                    <img :src="selectedProduct.images[2]" alt="" class="w-[150px] h-[100px] my-[20px] max-[920px]:w-[30%] max-[420px]:h-[50px] object-cover">
                </div>
            </div>
            <div class="w-[50%] max-[1100px]:w-full max-[920px]:px-8 max-[420px]:p-0 ">
                <h1 class="mulifont uppercase text-[#3d3d3d] text-[30px] tracking-[.05em] font-bold max-[390px]:text-[22px]">{{ selectedProduct.name }}</h1>
                <p class="mulifont text-[#3d3d3d] mulifont text-[27px] font-normal max-[390px]:text-[18px]">{{ selectedProduct.price }} RS <span class="text-[15px] text-[#989898]">{{ selectedProduct.cenaTorte }}</span></p>
                <p class="description py-[27px]">{{ selectedProduct.description }}</p>
                <p class="description font-bold pb-[27px]">{{ selectedProduct.podebljano }}</p>
                <p class="description">SASTAV: {{ selectedProduct.sastav }}</p>
                <p class="description py-[27px]">ALERGENI: {{ selectedProduct.Alergeni }}</p>
                <p class="description">{{ selectedProduct.kadapravimo }}</p>
                <p class="description pb-[27px]">Torte ukrašavamo kao na fotografijama, za dodatno ukrašavanje molimo da nas kontaktirate.</p>
                <p class="description pb-[27px]">Dostavu radimo preko kurirske službe, cena dostave zavisi od lokacije.</p>
                <li class="list-none flex items-center mb-8 items-center" v-if="clicked > 0">
                        <p class="w-[50px] border text-center h-[51px] flex justify-center items-center">{{ getQuantityInCart(selectedProduct) }}</p>
                    <div class="flex flex-col border">
                        <button @click="incrementQuantity(selectedProduct.id)" class="w-[40px] border-b">+</button>
                        <button @click="decrementQuantity(selectedProduct.id)">-</button>
                    </div>
                    <button @click="removeFromCart(selectedProduct.id)"  class=" border mulifont leading-[21px] tracking-[.1em] uppercase py-[13px] px-[47px] bg-[#c4b4a7] text-[white] text-[12px] font-semibold max-[420px]:mt-[10px] ml-8">Makni iz korpe</button>
                </li>
                <button @click="addToCart()" class=" border mulifont leading-[21px] tracking-[.1em] uppercase py-[13px] px-[47px] bg-[#c4b4a7] text-[white] text-[12px] font-semibold max-[420px]:mt-[10px] mr-4">Add To Cart</button>
                <button @click="router.push({ name: 'korpa' })" class=" border mulifont leading-[21px] tracking-[.1em] uppercase py-[13px] px-[47px] bg-[#c4b4a7] text-[white] text-[12px] font-semibold  max-[420px]:mt-[10px] ">KORPA</button>
            </div>
        </div>
    </div>
    <div class="w-full flex justify-center items-center">
    <div class="flex w-[1350px]">
      <p class="uppercase my-[20px] pl-8 text-[#3d3d3d] mulifont tracking-[.1em] max-[460px]:mt-16 max-[460px]:text-[20px]">related products</p>
    </div>
  </div>

  <!-- Display shuffled related products -->
  <div class="w-full flex justify-center items-center">
    <div class="flex w-[1300px] justify-between items-start flex-wrap max-[1315px]:w-[90%] max-[460px]:flex-col">
    <div v-for="relatedProduct in shuffledRelatedProducts.slice(0, 3)" :key="relatedProduct.id" class="flex flex-wrap w-[33%] max-[460px]:w-full justify-center" @click="goToRelatedProductDetails(relatedProduct.id)">
      <img :src="relatedProduct.thumbnail" alt="" class="w-full h-[300px] object-cover">
      <div class="text-center my-8">
        <h2 class="mulifont text-[20px] tracking-[.1em] text-[#3d3d3d] max-[620px]:text-[15px]">{{ relatedProduct.name }}</h2>
        <p class="mulifont text-[#3d3d3d] font-bold">{{ relatedProduct.price }} RS</p>
      </div>
    </div>
  </div>
  </div>
  

</template>

<script>
    import { defineComponent } from "vue"

    export default defineComponent({
        name:'ProductDetails'
    })
</script>

<script setup>
  import { computed,ref,onMounted,watchEffect  } from "vue";
  import { useProductsStore } from "../store/products_kolaci";
  import { useRoute, useRouter } from "vue-router";

  const store = useProductsStore()
  const router = useRouter()
  const route = useRoute()

  let clicked = ref(0)
  const shuffledRelatedProducts = ref([]);
  const refreshRelatedProducts = ref(false);

  watchEffect(() => {
    // Shuffle the array and set the refresh flag to true
    store.relatedProducts = shuffleArray([...store.relatedProducts]);
    refreshRelatedProducts.value = true;
  });

  const selectedProduct = computed(() => {
    return store.products.find((item) => item.id === Number(route.params.id))
  })

  const addToCart = () => {
    store.addToCart(selectedProduct.value);
    clicked.value += 1;
  }

  const removeFromCart = (id) => {
  store.removeFromCart(id);
  clicked.value = 0
};

const incrementQuantity = (id) => {
  store.incrementQuantity(id);
};

const decrementQuantity = (id) => {
  store.decrementQuantity(id);
};

const getQuantityInCart = (product) => {
  const cartProduct = store.cart.find((item) => item.id === product.id);
  return cartProduct ? cartProduct.quantity : 0;
};
onMounted(async () => {
  // Fetch related products
  await store.fetchRelatedProducts();
  // Shuffle the related products array
  shuffledRelatedProducts.value = shuffleArray(store.relatedProducts);
});

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }


const goToRelatedProductDetails = (productId) => {
    router.push({ name: 'ProductView', params: { id: productId } });
    // Optionally set the refresh flag to true when a related product is clicked
    refreshRelatedProducts.value = true;
  };
</script>

<style scoped>

.description{
    color:#989898;
    font-size: 14px;
}
@media only screen and (max-width: 390px) {
    .description{
    font-size: 12px;
}
}

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