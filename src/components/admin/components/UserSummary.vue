<template>
  <section class="card">
    <div class="profile">
      <div class="profileimg">
        <profile-image :name="user.nickname" :url="user.url" />
      </div>
      <basic-button
        v-if="type !== 'item'"
        @onClick="goToPage(user.nickname)"
        :label="label"
      />
    </div>
    <div class="info">
      <strong>
        {{ `${userName}(${user.name})` }}
      </strong>
      <p>{{ joinDay }} 입사</p>
    </div>
    <div class="point" v-if="type === 'point'">
      <strong>{{ point }} </strong><span> ATP</span>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import { useRoute } from 'vue-router';
import { ProfileImage, BasicButton } from '@/components/common/index.js';
import { dateFormatYear, getNumFormat, handleNametoUpperCase } from '@/util';

export default {
  components: { ProfileImage, BasicButton },
  name: 'UserSummary',
  props: {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();

    const user = ref({});
    const allusers = ref([]);
    const isActive = ref(true);

    onMounted(() => {
      allusers.value = store.getters.allusers;
      if (route.query.name) {
        user.value = allusers.value?.filter(
          (user) => user.nickname === route.query.name
        )[0];
      }
    });

    watch(route, () => {
      user.value = allusers.value?.filter(
        (user) => user.nickname === route.query.name
      )[0];
    });

    watch(props, () => {
      user.value = allusers.value?.filter(
        (user) => user.nickname === props.name
      )[0];
    });

    const userName = computed(() => handleNametoUpperCase(user.value.nickname));
    const label = computed(() =>
      props.type === 'dayoff'
        ? '휴가발급'
        : props.type === 'point'
        ? '포인트발급'
        : null
    );
    const point = computed(() => getNumFormat(user.value.point));
    const joinDay = computed(() => dateFormatYear(user.value.joinDay));

    const goToPage = (user) => {
      if (store.getters.me.role === 'Root') {
        switch (props.type) {
          case 'dayoff':
            router.push({ path: '/admin/day-off/create', query: { user } });
            return;
          case 'point':
            router.push({ path: '/admin/point/create', query: { user } });
            return;
        }
      } else {
        alert('Root 관리자만 이용할 수 있습니다');
      }
    };

    return { goToPage, user, label, isActive, userName, point, joinDay };
  },
};
</script>

<style lang="scss" scoped>
.card {
  @include stLayout;
}

.profile {
  @include flex(space-between);
  margin: 34px 0 16px;

  button {
    width: 90px;
  }
}

.profileimg {
  width: 60px;
  height: 60px;
}

.info {
  strong {
    @include title700_17;
  }

  p {
    margin: 3px 0 30px;
    color: var(--gray999);
    @include body400_14;
  }
}

.point {
  margin-top: -13px;

  strong {
    @include 특수800_34;
  }

  span {
    @include title700_15;
  }
}
</style>
