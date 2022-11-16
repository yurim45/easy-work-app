<template>
  <section class="section">
    <h3>직원별 포인트 현황</h3>
    <ul>
      <li
        v-for="(user, i) in userList"
        :key="user.id"
        class="user"
        :class="{ listline: i < userList.length - 1 }"
        @click="goToPage(user.nickname)"
      >
        <div class="img">
          <profile-image :url="user.url" :name="user.nickname" />
        </div>
        <div class="progress">
          <div class="info">
            <span>{{ user.nickname }}</span>
            <span :class="{ red: user.point < 0 }"
              >{{ convertPoint(user.point) }} ATP</span
            >
          </div>
          <progress :max="maxPoint" :value="user.point" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_ALL_USERS } from '@/graphql/index.js';
import router from '@/router';
import ProfileImage from '@/components/common/ProfileImage.vue';
import { getNumFormat } from '@/util';

export default {
  name: 'StatusUserPoint',
  components: { ProfileImage },
  props: {
    type: {
      type: String,
      default: 'atp',
    },
  },
  setup(props) {
    const store = useStore();

    const userList = ref([]);
    const maxPoint = ref(null);

    const { result, refetch } = useQuery(QUERY_ALL_USERS);

    onMounted(() => {
      refetch();

      if (result.value) {
        handleAllUsers();
      }
    });

    watch(result, () => {
      if (result.value) {
        handleAllUsers();
        store.dispatch('getAllusers', {
          allusers: result.value.allUsers.users,
        });
      }
    });

    const handleAllUsers = () => {
      if (props.type === 'atp') {
        userList.value = result.value.allUsers.users
          .filter(
            (user) => user.nickname !== 'Howl' && user.nickname !== 'Simpson'
          )
          .sort((a, b) => b.point - a.point);
        maxPoint.value = Math.max(...userList.value.map((v) => v.point));
      }
      if (props.type === 'sp') {
        userList.value = result.value.allUsers.users
          .filter(
            (user) => user.nickname !== 'Howl' && user.nickname !== 'Simpson'
          )
          .map((v) => {
            return {
              ...v,
              point: 0,
            };
          });
        // .sort((a, b) => b.spPoint - a.spPoint);
        maxPoint.value = 0;
        // maxPoint.value = Math.max(...userList.value.map((v) => v.spPoint));
      }
    };

    const convertPoint = (point) => {
      return getNumFormat(point);
    };

    const goToPage = (user) => {
      if (props.type === 'sp') {
        alert('준비중입니다!😃');
      } else {
        router.push({
          path: '/admin/point/user-detail',
          query: { name: user },
        });
      }
    };

    return { userList, goToPage, convertPoint, maxPoint };
  },
};
</script>

<style lang="scss" scoped>
.section {
  @include stLayout;
}

h3 {
  margin-bottom: 6px;
  @include title800_20;
}

ul {
  margin-bottom: 60px;
}

li {
  cursor: pointer;
}

.user {
  @include flex(space-between);
  padding: 17px 0 15px;
}

.listline {
  border-bottom: 1px solid var(--line);
}

.img {
  width: 37.3px;
  height: 32px;
}

.progress {
  width: 100%;
  height: 36px;
  margin-left: 12px;
}

.info {
  @include flex(space-between);
  @include body600_14;
}

.red {
  color: var(--red-txt);
}

progress {
  margin-top: 6px;
  width: 100%;
  height: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
}

progress::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 2px;
}
progress::-webkit-progress-value {
  background-color: var(--blue500);
  border-radius: 2px;
}
progress::-moz-progress-bar {
  background-color: #eee;
  border-radius: 2px;
}
</style>
