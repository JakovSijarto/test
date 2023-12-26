<template>
    <div>
        <div class="flex jusitfy-center items-center flex-col max-[1024px]:hidden">
            <img src="../../assets/logo.png" alt="" class="pt-[39px] w-[300px]">
        <ul class="flex flex-row gap-[54px] text-[#333] items-center h-[90px] tracking-[.065em] text-[16px]">
            <li class="cursor-pointer"><router-link to="/">O ŠUMI</router-link></li>
            <li class="cursor-pointer"><router-link to="/torte">TORTE</router-link></li>
            <li class="cursor-pointer"><router-link to="/kolacinakomad">KOLAČI NA KOMAD</router-link></li>
            <li class="cursor-pointer"><router-link to="/poklonkutije">ŠUMA POKLON KUTIJE</router-link></li>
            <li class="cursor-pointer"><router-link to="/kontakt">KONTAKT</router-link></li>
            <li class="flex items-center gap-[0.5em] cursor-pointer"><span><img src="../../assets/cart-navbar.svg" alt="" class="w-[20px] h-[20px] object-cover"></span><router-link to="/korpa" class="flex gap-[5px]">KORPA <div v-if="store.cart.length > 0" class="text-[13px] relative bottom-[10px] rounded-[50%] p-1 text-[white] bg-[red]">{{ store.cart.length }}</div> </router-link></li>
          </ul>
        </div>
       <div class="fixed w-full bg-white h-[69px] flex items-center min-[1025px]:hidden">
        <div class="hamb_menu z-[999] ml-8">
            <input id="checkbox" type="checkbox" @click="showMobile()">
            <label class="toggle" for="checkbox" >
            <div id="bar1" class="bars"></div>
            <div id="bar2" class="bars"></div>
            <div id="bar3" class="bars"></div>
        </label>
        </div>
        <div class="hamb_menu pl-8 absolute left-[-30rem] top-[16em] h-[600px] transform -translate-x-1/2 -translate-y-1/2 bg-white w-[250px] z-[998]  flex justify-end pb-[8em] items-start gap-[2em] flex-col uppercase text-[#444] text-[14px]" :class="{ active: isActive }" style="transition: all 0.4s ease-in-out;">
            <div class=""><router-link to="/">O ŠUMI</router-link></div>
            <div class=""><router-link to="/torte">TORTE</router-link></div>
            <div class=""><router-link to="/kolacinakomad">KOLAČI NA KOMAD</router-link></div>
            <div class=""><router-link to="/poklonkutije">ŠUMA POKLON KUTIJE</router-link></div>
            <div class=""><router-link to="/kontakt">KONTAKT</router-link></div>
            <div class="flex gap-[1em]"><span><img src="../../assets/cart-navbar.svg" alt="" class="w-[20px] h-[20px] object-cover"></span><router-link to="/korpa" class="flex gap-[5px]">KORPA <div v-if="store.cart.length > 0" class="text-[13px] relative bottom-[10px] rounded-[50%] p-1 text-[white] bg-[red] px-[7px]">{{ store.cart.length }}</div></router-link></div>
        </div>
        <div class="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]">
        <img src="../../assets/logo.png" alt="" class="h-[25px] ">
        </div>
       </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router"
import { useProductsStore } from "../../store/products_kolaci";

const router = useRouter()
const store = useProductsStore()
</script>
<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    showMobile() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
.active{
  left:7.5rem;
  transition: all 0.4s ease-in-out;
}

    .hover_effect:hover{
        color:black;
    }
    #checkbox {
  display: none;
}

.toggle {
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;
  transition-duration: .5s;
}

.bars {
  width: 20px;
  height: 4px;
  background-color: black;
  border-radius: 4px;
}

#bar2 {
  transition-duration: .8s;
}

#bar1 {
  width: 20%;
}

#bar2 {
  width: 35%;
}

#checkbox:checked + .toggle .bars {
  position: absolute;
  transition-duration: .5s;
}

#checkbox:checked + .toggle #bar2 {
  transform: scaleX(0);
  transition-duration: .1s;
}

#checkbox:checked + .toggle #bar1 {
  width: 100%;
  transform: rotate(45deg);
  transition-duration: .5s;
}

#checkbox:checked + .toggle #bar3 {
  width: 100%;
  transform: rotate(-45deg);
  transition-duration: .5s;
}

#checkbox:checked + .toggle {
  transition-duration: .5s;
  transform: rotate(180deg);
}
</style>