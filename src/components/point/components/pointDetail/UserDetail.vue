<template>
  <line-view />
  <div class="user">
    <section>
      <h3>{{ getSubtitle(pointData) }}</h3>
      <div class="row">
        <div v-for="user in pointData.targets" :key="user.id">
          <user-profile :user="user" />
        </div>
      </div>
    </section>
    <section v-if="pointData.nonTargets?.length > 0">
      <h3>제외 인원</h3>
      <div class="row">
        <div v-for="user in pointData.nonTargets" :key="user.id">
          <user-profile :user="user" />
        </div>
      </div>
    </section>
    <section v-if="pointData.guests?.length > 0">
      <h3>제외 인원</h3>
      <ul>
        <li v-for="(user, i) in pointData.guests" :key="i">
          <tag-user-name :user="user.nickname" :isView="false" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { TagUserName, LineView } from '@/components/common/index.js';
import UserProfile from '@/components/admin/components/UserProfile.vue';

export default {
  name: 'UserDetail',
  components: {
    TagUserName,
    LineView,
    UserProfile,
  },
  props: {
    pointData: Object,
  },
  setup() {
    onMounted(() => {});

    const getSubtitle = (data) => {
      switch (data?.useItem) {
        case 'Send':
          return '받는 사람';
        case 'Receive':
          return '받는 사람';
        case 'Publish':
          return '발급 대상';
        default:
          return '차감 대상';
      }
    };

    return { getSubtitle };
  },
};
</script>

<style lang="scss" scoped>
.user {
  margin: 24px 0 40px;
  @include stLayout;

  h3 {
    @include title800_20;
    margin-top: 30px;
  }
}

.row {
  @include flex(flex-start);
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

ul {
  @include flex(flex-start);
}

li {
  margin-top: 18px;
}
</style>
