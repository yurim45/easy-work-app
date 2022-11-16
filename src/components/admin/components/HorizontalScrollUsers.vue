<template>
  <div class="fixtop">
    <back-header :onClick="goToPage" :hasBg="true" :hasDelete="false" />
  </div>
  <div class="fixuser">
    <horizontal-scroll>
      <ul class="users">
        <li
          v-for="user in users"
          :key="user?.id"
          @click="handleSelectUser(user)"
        >
          <profile-image
            :name="user.nickname"
            :url="user.url"
            :isActive="user.nickname === selectUser"
            :isFixTop="true"
          />
        </li>
      </ul>
    </horizontal-scroll>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import {
  BackHeader,
  ProfileImage,
  HorizontalScroll,
} from '@/components/common/index.js';

export default {
  name: 'HorizontalScrollUsers',
  components: {
    BackHeader,
    ProfileImage,
    HorizontalScroll,
  },
  props: {
    goToPage: Function,
    handleSelectUser: Function,
    users: Array,
    selectUser: String,
  },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped>
.fixtop {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.fixuser {
  position: fixed;
  top: 60px;
  width: 100%;
  max-width: 600px;
  z-index: 100;
}

ul {
  @include stLayout;
  @include flex(flex-start);
  padding-bottom: 25px;
  background: linear-gradient(180deg, #fbfbfb 0%, #f5f5f5 100%);
}

li {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}

.whiteimg {
  position: absolute;
  width: 40px;
  z-index: 100;
}
.profileimage {
  position: relative;
}

.users {
  padding-top: 15px;
}
</style>
