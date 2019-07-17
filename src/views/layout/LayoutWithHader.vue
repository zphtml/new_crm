<template>
    <div>
        <HeaderNav ></HeaderNav>
        <transition name="fade" mode="in-out">
            <router-view ></router-view>
        </transition>
    </div>
</template>

<script>
  import { HeaderNav } from '@/views/layout';
  export default {
    name: 'headerLayout',
    components: {
      HeaderNav
    },
    data() {
      return {

      }
    },

  }
</script>
