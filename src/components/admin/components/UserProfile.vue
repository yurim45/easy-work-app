<template>
  <div class="item">
    <label>
      <input
        type="checkbox"
        name="user"
        :value="user.nickname"
        :checked="isSelect"
        @click="handelSelect"
      />
      <div class="checked" v-if="isSelect">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.6" cx="30" cy="30" r="30" fill="black" />
          <path
            d="M21 30L27 36L39 24"
            stroke="white"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="profile">
        <div class="img">
          <profile-image :name="user.nickname" :url="user.url" />
        </div>
        <div class="name">{{ user.nickname }}</div>
      </div>
    </label>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { ProfileImage } from '@/components/common/index.js';

export default {
  name: 'UserProfile',
  components: {
    ProfileImage,
  },
  props: {
    handelSelect: Function,
    user: {
      type: Object,
    },
    targets: Array,
  },
  setup(props) {
    const isSelect = ref(null);

    onMounted(() => {
      if (props.targets?.length > 0) {
        isSelect.value = !!props.targets?.find(
          (user) => user.nickname === props.user.nickname
        );
      }
    });

    watch(props, () => {
      isSelect.value = !!props.targets?.find(
        (user) => user.nickname === props.user.nickname
      );
    });

    return { isSelect };
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 60px;
}

.title {
  @include flex(space-between);
}

.userNum {
  color: var(--blue500);
}

.label {
  @include stLabel;
}

input {
  display: none;
}

.icon {
  @include flex;
  @include body400_14;

  svg {
    margin-right: 7px;
  }
}

.profile {
  text-align: center;
  @include body500_13;
}

.img {
  width: 60px;
  height: 60px;
}

.name {
  margin-top: 7px;
}

.checked {
  position: absolute;
}
</style>
