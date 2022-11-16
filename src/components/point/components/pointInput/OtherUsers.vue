<template>
  <div class="title">
    <div class="label">
      <label> 외부대상자 : </label>
      <span class="userNum">{{ otherUser.length }}</span>
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
  <section>
    <div class="row">
      <div v-for="user in otherUserInfo" :key="user.id" class="otheruser">
        <user-profile
          :handelSelect="handelSelect"
          :user="user"
          :targets="otherUser"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import IconCheckBlue from '@/components/common/icons/IconCheckBlue.vue';
import UserProfile from '@/components/admin/components/UserProfile.vue';

export default {
  components: { IconCheckBlue, UserProfile },
  name: 'OtherUsers',
  props: {
    handleValue: Function,
    userList: {
      type: Array,
    },
    value: Array,
  },
  setup(props) {
    const store = useStore();
    const isAllUser = ref(false);
    const otherUserInfo = ref([]);
    const otherUser = ref([]);

    onMounted(() => {
      otherUserInfo.value = store.getters.otherUsers;
    });

    watch(props, () => {
      if (props.value) {
        otherUser.value = props.value;
      }

      if (props.otherUser?.length === 2) {
        isAllUser.value = true;
      }
    });

    const selectAllUser = (event) => {
      if (event.target.checked) {
        otherUser.value = otherUserInfo.value;
      } else {
        otherUser.value = [];
      }
      isAllUser.value = event.target.checked;
      props.handleValue('otherTargets', otherUser.value);
    };

    const handelSelect = (event) => {
      if (event.target.checked) {
        otherUser.value = [
          ...otherUser.value,
          otherUserInfo.value?.find(
            (user) => user?.nickname === event.target.value
          ),
        ];
      } else {
        otherUser.value = [...otherUser.value].filter(
          (user) => user?.nickname !== event.target.value
        );
      }

      if (otherUser.value.length === 2) {
        isAllUser.value = true;
      } else {
        isAllUser.value = false;
      }

      props.handleValue('otherTargets', otherUser.value);
    };

    return {
      otherUserInfo,
      otherUser,
      isAllUser,
      handelSelect,
      selectAllUser,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  @include flex(space-between);
}

.label {
  @include stLabel;
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

section {
  margin: 20px 0;
  width: 34%;
}

.row {
  @include flex(space-between);
}

.otheruser {
  width: 20%;
}
</style>
