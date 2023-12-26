<template>
    <div class="w-full max-[1024px]:pt-[69px]">
        <div class="w-full h-[70px] bg-[#FAFAFA] flex items-center justify-center ">
            <div class="w-[1350px] text-[#565656] text-[30px] !font-light mulifont ml-8 max-[330px]:text-[22px]">
                TORTE
            </div>
        </div>
    </div>
    <div>
        <div class="w-full flex justify-center items-center py-[60px] ">
            <div class="flex justify-between w-[1300px] text-[#989898] mx-8 max-[520px]:flex-col max-[520px]:gap-[1em]">
            <div class="">
              <p class="mulifont uppercase tracking-[.1em]">Svih {{ store.products.length }} produkta</p>
            </div>
            <select
    id="sort"
    v-model="selectedSort"
    @change="sortProducts"
    class="border p-4"
  >
  <option value="default">Normalno</option>
    <option value="highest">Najveca cena</option>
    <option value="lowest">Najniža cena</option>
  </select>
        </div>
        </div>
    <div class="w-full flex justify-center items-center max-[890px]:pt-[2em]">
        <ul class="flex flex-wrap w-[1330px] items-center justify-center">
            <li v-for="product in store.products" :key="product.id" @click="goToProductPage(product.id)" class="mx-[15px] mb-[30px] max-[360px]:mx-2">
        <div class=" flex justify-start items-center flex-col w-[413px] h-[413px] max-[890px]:w-[200px] max-[460px]:w-[100%] max-[460px]:h-[350px]">
            <img :src="product.thumbnail" alt="" srcset="" class="w-[413px] max-h-[270px] object-cover max-[890px]:h-[200px]">
        <div class="my-[35px] text-center text-[#3d3d3d] ">
            <h2 class="text-[20px] mulifont font-semibold tracking-[.1em]">{{ product.name }}</h2>
            <p class="mt-[14px]">{{ product.price }} RS</p>
        </div>
    </div>
        
      </li>
    </ul>
      
</div>
  </div>
</template>

<script>
    import { defineComponent } from "vue"

    export default defineComponent({
        name:'torte'
    })
</script>
<script setup>

</script>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import { useProductsStore } from "../store/products_kolaci";
  import { useRouter } from "vue-router";

  const store = useProductsStore()
  const router = useRouter()

  const goToProductPage = (id) => {
    router.push({ name: 'ProductView', params: { id } })
  }

  onMounted(async () => {
    await store.fetchProducts('torte.json')
  })
  
const selectedSort = ref("default");

const sortProducts = () => {
  switch (selectedSort.value) {
    case "highest":
      store.products.sort((a, b) => b.price - a.price);
      break;
    case "lowest":
      store.products.sort((a, b) => a.price - b.price);
      break;
    default:
      // For "default", you can reload the original order
      // Assuming you have an originalProducts array in your store
      store.products = [...store.originalProducts];
      break;
  }
  
  // Force re-render
  $forceUpdate();
}
</script>