<template>
  <div class="card">
    <img
      v-if="!isActive && isFixTop"
      src="@/assets/images/white.png"
      class="whiteimg"
    />
    <img
      v-if="url"
      alt="profile"
      src=""
      class="profileimage"
      :class="{ isActive: isActive }"
    />
  </div>
  <div v-if="!url" class="profileimage" :class="{ isActive: isActive }">
    {{ nickname }}
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ProfileImage',
  props: {
    url: {
      type: [String, null],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isFixTop: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const nickname = computed(() => props.name?.charAt(0).toUpperCase());

    return { nickname };
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
}

.profileimage {
  @include stProfile;
}

.whiteimg {
  position: absolute;
  width: 40px;
  z-index: 100;
}

.isActive {
  border: 2px solid var(--white);
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2));
}
</style>
