<template>
    <div style="padding-top: 50px;">
        <transition name="fade" mode="in-out">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

  export default {
    name: 'headerLayout',
    data() {
      return {

      }
    }
  }
</script>