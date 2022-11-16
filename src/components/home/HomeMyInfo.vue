<template>
  <section @click="goToMypage">
    <div class="profile">
      <profile-image :name="store.getters.me.nickname" url="" />
    </div>
    <h2>안녕하세요 {{ store.getters.me.nickname }}!</h2>
    <p>{{ store.getters.me.team }}팀 {{ store.getters.me.jobName }}</p>
  </section>
</template>
<script>
import { useStore } from 'vuex';
import router from '@/router';
import ProfileImage from '../common/ProfileImage.vue';

export default {
  name: 'HomeMyInfo',
  components: { ProfileImage },
  setup() {
    const store = useStore();

    const goToMypage = () => {
      router.push('/');
    };

    return { store, goToMypage };
  },
};
</script>
<style lang="scss" scoped>
section {
  @include stLayout;

  h2 {
    margin: 14px 0 5px;
    @include title800_26;
  }

  p {
    @include body400_15;
    color: var(--gray999);
  }
}

.profile {
  margin-top: 30px;
  width: 50px;
  height: 50px;
}
</style>
