<template>
  <div class="w-full flex justify-center flex-col items-center">
    <div class="w-[1350px] h-[720px] max-[1400px]:w-full">
      <img src="../assets/home/herophoto.jpg" alt="" class="w-full h-full pt-8 object-cover max-[1024px]:pt-0">
    </div>
    <div class="flex w-[1350px] flex-col items-center pt-[100px] pb-[45px] max-[1400px]:w-full">
      <p class="text-[#3d3d3d] uppercase leading-[1.3em] tracking-[0.1em] text-[28px] !font-normal text-center pb-4 mx-4">dobrodošli u šumu</p>
      <p class="italic text-[#444] text-[17px] tracking-[.05em] pb-[73px] text-center mx-4">gde pravimo kolače inspirisane prirodom</p>
      <div class="text-center flex w-[1350px] justify-between max-[1400px]:w-full px-4 max-[790px]:flex-col">
        <div>
          <router-link to="/torte">
            <img src="../assets/home/home-torte.jpg" alt="" class="w-[350px] h-[350px] max-[1080px]:w-[250px] max-[1080px]:h-[250px] object-cover max-[790px]:w-full max-[790px]:h-[350px]">
            <p class="mt-[10px] text-[#989898] font-bold max-[790px]:my-[2em] max-[790px]:mb-[4em]">TORTE</p>
          </router-link>
        </div>
        <div>
          <router-link to="/poklonkutije">
          <img src="../assets/home/home-poklon-kutije.jpg" alt="" class="w-[350px] h-[350px] max-[1080px]:w-[250px] max-[1080px]:h-[250px]  object-cover max-[790px]:w-full max-[790px]:h-[350px]">
          <p class="mt-[10px] text-[#989898] font-bold max-[790px]:my-[2em] max-[790px]:mb-[4em]">POKLON KUTIJE</p>
        </router-link>
        </div>
        <div>
          <router-link to="/kolacinakomad">
          <img src="../assets/home/home-kolaci.jpg" alt="" class="w-[350px] h-[350px] max-[1080px]:w-[250px] max-[1080px]:h-[250px]  object-cover max-[790px]:w-full max-[790px]:h-[350px]">
          <p class="mt-[10px] text-[#989898] font-bold max-[790px]:my-[2em] max-[790px]:mb-[4em]">KOLAČI</p> 
        </router-link>
        </div>
      </div>
    </div>
    <div class="w-[1350px] flex items-center gap-[3em] mb-[3em]  max-[1400px]:w-full px-4 max-[930px]:flex-col">
      <img src="../assets/home/home-first-photo.jpg" alt="" class="h-[350px] max-[930px]:w-full max-[930px]:h-[250px] object-cover">
      <p class="font-light text-[15px] leading-[27px] text-[#989898]">Torte i poslastice u Šumi su zdrave i hranljive kao obrok, a ukusne kao domaći kolači. Potrudili smo se da spojimo najbolje od oba sveta – da kolači budu kremasti, krckavi, sočni, da se tope, ali od sastojaka koji u sebi sadrže proteine, nezasićene masne kiseline, vlakna, vitamine i minerale. To postižemo tako što biramo čiste sastojke, osnovne sirovine koje bismo pojeli i u izvornom obliku – pogledajte sastojke naših kolača i videćete orašaste plodove, sveže voće i povrće, integralna brašna, začine i lekovito bilje. <br> <br> Pravimo putere od badema, lešnika i pistaća koje mešamo u kore i filove, pravimo domaći marcipan sa brašnom od koštica šljive, kao i vege mleka od kokosa, suncokreta, lešnika, badema koja koristimo u tortama, sladoledima i toplim napicima. Većina sastojaka u Šumi je stigla pravo ubrana sa drveta, polja ili livade. Torte ukrašavamo cvetovima kamilice i hibiskusa, lomljenim bademima i lešnicima, listovima sušene nane i žalfije. Trudimo se da svojim izgledom budu isto što su po sastavu i što bliže prirodi.</p>
    </div>
    <div class="w-[1350px] flex items-center gap-[3em] mb-[3em]  max-[1400px]:w-full px-4 max-[930px]:flex-col">
      <img src="../assets/home/home-second-photo.jpg" alt="" class="h-[350px] min-[930px]:hidden max-[930px]:w-full max-[930px]:h-[250px] object-cover">   
      <p class="font-light text-[15px] leading-[27px] text-[#989898]">Naše kolače možete poručiti na adresu ili ih probati kod nas u radnji, u Siminoj 22a, ispod Doma Vojske, kod Skadarske. Tu je naše skrovište u kom se možete i vi ušuškati ispod drveta limuna, uz prijatnu muziku i kafu.<br> <br>  Kafu nabavljamo od zanatske pržionice Zrno, posuđe od lokalne zanatske radionice porcelana Boya Porcelain, sokove od socijalnog preduzeća Dobra bašta koje se bavi ekonomskim osnaživanjem žena na selu – biramo saradnike koji vode računa o kvalitetu svojih proizvoda i dobrobiti ljudi za koje proizvode.</p>
      <img src="../assets/home/home-second-photo.jpg" alt="" class="h-[350px] max-[930px]:hidden">      
    </div>
    <div class="w-[1350px] flex items-center gap-[3em] mb-[3em]  max-[1400px]:w-full px-4 max-[930px]:flex-col">
      <img src="../assets/home/hero-third-photo.jpg" alt="" class="h-[350px] max-[930px]:w-full max-[930px]:h-[250px] object-cover">
      <p class="font-light text-[15px] leading-[27px] text-[#989898]">Jedini sastojak koji stiže pripremljen u Šumu je čokolada. Njoj ne možemo da odolimo, ali je zato nabavljamo od jednog od najboljih proizvođača čokolade na svetu, belgijske firme Callebaut. Koristimo čokoladu bez šećera, zaslađenu šećernim alkoholima, mlečnu, belu i tamnu, koju mešamo sa voćem, lekovitim biljem i orašastim plodovima. Izbegavamo beli, rafinisani šećer i umesto njega koristimo voće, ječmeni slad, kokosov šećer ili čokoladu koja je zaslađena šećernim alkoholima.<br> <br>  Ove namirnice imaju niži glikemijski indeks od šećera i svakako veću hranljivost. Šuma ne prati nijednu poslastičarsku školu, već sami smišljamo svoje recepte. Biramo sastojke čijom kombinacijom se smanjuje glikemijski indeks, povećava udeo vlakana, dodaju hranljive masnoće i vitamini svežeg voća i povrća. Kada kombinujemo ukuse, inspiraciju tražimo u prirodi, koju zajedno dobro poznajemo.</p>
    </div>
    <hr class="w-[1350px] mb-[40px] h-[2px] bg-[#ebebeb] max-[1400px]:w-full">
    <div>
    <!-- Fullscreen Gallery -->
    <div v-if="fullscreenImage" class="fullscreen-gallery">
      <button @click="navigateFullscreen(-1)" class="nav-button left-button">Previous</button>
      <img :src="`/home_carousel/${fullscreenImage}`" alt="">
      <button @click="navigateFullscreen(1)" class="nav-button right-button">Next</button>
      <button @click="closeFullscreen" class="close-button">Close</button>
    </div>

    <!-- Original Gallery -->
    <div>
      <swiper
        @swiperSlideChange="onSlideChange"
        class="w-full flex justify-center items-center my-4"
      >
      <div class="flex flex-wrap justify-center gap-[1em]">

      
        <swiper-slide v-for="(image, index) in images" :key="index" @click="openFullscreen(index)" class="flex justify-center">
            <img :src="`/home_carousel/${image}`" alt="" loading="lazy" class="w-[400px] h-[400px] object-cover max-[430px]:w-[90%]">
        </swiper-slide>
      </div>
      </swiper>
    </div>
  </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const images = [
      "img_car1.jpg",
      "img_car2.jpg",
      "img_car3.jpg",
      "img_car4.jpg",
      "img_car5.jpg",
      "img_car6.jpg",
      "img_car7.jpg",
      "img_car8.jpg",
      "img_car9.jpg",
      "img_car10.jpg",
      "img_car11.jpg",
      "img_car12.jpg",
      "img_car13.jpg",
      "img_car14.jpg",
      "img_car15.jpg",
      "img_car16.jpg",
      "img_car17.jpg",
      "img_car18.jpg",
      "img_car19.jpg",
      "img_car20.jpg",
      "img_car21.jpg"
    ];
    const fullscreenImage = ref(null);
    const fullscreenIndex = ref(0);

    const onSlideChange = (swiper) => {
      fullscreenIndex.value = swiper.activeIndex;
};

const openFullscreen = (index) => {
  fullscreenIndex.value = index;
  fullscreenImage.value = images[index];
};

const closeFullscreen = () => {
  fullscreenImage.value = null;
};
const navigateFullscreen = (direction) => {
      const newIndex = (fullscreenIndex.value + direction + images.length) % images.length;
      fullscreenIndex.value = newIndex;
      fullscreenImage.value = images[newIndex];
    };

return { fullscreenImage, images, onSlideChange, openFullscreen, closeFullscreen, navigateFullscreen };
  },
};
</script>


<style scoped>

.fullscreen-gallery {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-gallery img {
  max-width: 100%;
  max-height: 100%;
}

.fullscreen-gallery .nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  color: #000;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.fullscreen-gallery .left-button {
  left: 10px;
}

.fullscreen-gallery .right-button {
  right: 10px;
}

.fullscreen-gallery .close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  cursor: pointer;
}



</style>