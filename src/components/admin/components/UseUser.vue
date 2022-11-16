<template>
  <section>
    <div class="title">
      <div class="label">
        <label> 대상자 : </label>
        <span class="userNum">{{ state?.targets?.length }}</span>
        <span>명</span>
      </div>
      <label class="icon">
        <input
          type="checkbox"
          name="checkAll"
          :checked="isAllUser"
          @click="selectAllUser"
        />
        <icon-check-blue :isDisabled="isAllUser" />
        <span>모두선택</span>
      </label>
    </div>
    <div>
      <div class="users">
        <div v-for="user in userInfo" :key="user.id" class="user">
          <user-profile
            :handelSelect="handelSelect"
            :user="user"
            :targets="state.targets"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import router from '@/router';
import IconCheckBlue from '@/components/common/icons/IconCheckBlue.vue';
import { DAYOFF_LIST } from '@/constants';
import UserProfile from './UserProfile.vue';

export default {
  name: 'UseUser',
  components: {
    IconCheckBlue,
    UserProfile,
  },
  props: {
    handleValue: Function,
    name: String,
    value: Array,
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const isAllUser = ref(false);
    const dayOffList = ref(DAYOFF_LIST);
    const userInfo = ref([]);

    const state = ref({
      dayoff: null,
      days: null,
      content: null,
      targets: [],
    });

    onMounted(() => {
      userInfo.value = store.getters.allusers;

      if (route.query.user) {
        state.value.targets = userInfo.value?.filter(
          (user) => user.nickname === route.query.user
        );
      } else {
        state.value.targets = store.getters.allusers;
        isAllUser.value = true;
      }
    });

    watch(props, () => {
      if (props.value) {
        state.value.targets = props.value;
      }
    });

    const selectAllUser = (event) => {
      if (event.target.checked) {
        state.value.targets = userInfo.value;
      } else {
        state.value.targets = [];
      }
      isAllUser.value = event.target.checked;
      props.handleValue(props.name, state.value.targets);
    };

    const handelSelect = (event) => {
      if (event.target.checked) {
        state.value.targets = [
          ...state.value.targets,
          userInfo.value.find((user) => user.nickname === event.target.value),
        ];
      } else {
        state.value.targets = [...state.value.targets].filter(
          (user) => user.nickname !== event.target.value
        );
      }

      if (state.value.targets?.length === 12) {
        isAllUser.value = true;
      } else {
        isAllUser.value = false;
      }

      props.handleValue(props.name, state.value.targets);
    };

    const goToPage = () => {
      router.go(-1);
    };

    return {
      state,
      dayOffList,
      goToPage,
      selectAllUser,
      isAllUser,
      handelSelect,
      userInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  @include stPageTitle;
}

.title {
  @include flex(space-between);
}

.userNum {
  color: var(--blue500);
}

.icon {
  @include flex;
  @include body400_14;

  svg {
    margin-right: 7px;
  }
}

.label {
  @include stLabel;
}

.users {
  @include flex(space-between);
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0 30px;
}

.user {
  /* @include flex; */
  width: 20%;
}
</style>
