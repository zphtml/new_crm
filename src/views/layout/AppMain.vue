<template>
    <section class="app-main" style="min-height: 100%;padding:20px 30px;">
        <transition name="fade" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </section>
</template>

<script>
    export default {
      name: 'AppMain',
      computed: {
        key() {
          return this.$route.name !== undefined
                        ? this.$route.name + +new Date()
                        : this.$route + +new Date()
        }
      }
    }
</script>
