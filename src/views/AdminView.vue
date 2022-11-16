<template>
  <back-header :onClick="goToPage" :hasDelete="false" />
  <main>
    <h2>Admin</h2>
    <ul class="menuList">
      <li
        v-if="store.getters.me.role === 'Root'"
        @click="goToAdminPage('/admin/day-off')"
      >
        Day Off
      </li>
      <li @click="goToAdminPage('/admin/point')">ATNP Point</li>
      <li
        v-if="store.getters.me.role !== 'User'"
        @click="goToAdminPage('/admin/supply')"
      >
        Supply
      </li>
    </ul>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import BackHeader from '@/components/common/header/BackHeader.vue';
import { MENU_LIST } from '@/constants/index.js';
import router from '@/router';

export default {
  name: 'AdminView',
  components: { BackHeader },
  setup() {
    const store = useStore();
    const menuList = ref(MENU_LIST);

    const goToPage = () => {
      router.push('/menu');
    };

    const goToAdminPage = (url) => {
      router.push(url);
    };

    return { store, menuList, goToPage, goToAdminPage };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  @include stLayout;
  @include stPageTitle;
  margin-bottom: 30px;
}

.menuList {
  padding: 0 30px;

  li {
    margin: 28px 0;
    @include title800_20;
    cursor: pointer;
  }
}
</style>
