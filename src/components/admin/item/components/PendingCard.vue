<template>
  <div class="card" @click="goToItemDetail(data)">
    <div class="profile">
      <profile-image :name="data?.writer.nickname" :url="data?.writer.url" />
    </div>
    <div class="right">
      <div class="title">
        <strong>{{ data?.title }}</strong>
        <icon-hold v-if="data.purchaseStatus === 'Pending'" />
        <icon-approved v-if="data.purchaseStatus === 'Approved'" />
      </div>
      <div>
        <span class="nick">{{ data?.writer.nickname }}</span>
        <icon-separator />
        <span>{{ getFormat(data?.category) }}</span>
        <icon-separator />
        <span>{{ getNum(data) }}개</span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import router from '@/router';
import ProfileImage from '@/components/common/ProfileImage.vue';
import IconSeparator from '@/components/common/icons/IconSeparator.vue';
import { SUPPLY_CODE } from '@/constants';
import { getNumFormat } from '@/util';
import IconHold from '@/components/common/icons/IconHold.vue';
import IconApproved from '@/components/common/icons/IconApproved.vue';

export default {
  components: { IconSeparator, ProfileImage, IconHold, IconApproved },
  name: 'PendingCard',
  props: {
    data: Object,
  },
  setup() {
    onMounted(() => {});

    const goToItemDetail = (data) => {
      router.push({
        name: 'supplyDetail',
        query: { id: data.id, isAdmin: true },
      });
    };

    const getFormat = (data) => {
      return SUPPLY_CODE[data];
    };

    const getNum = (data) => {
      return getNumFormat(
        data.items
          ?.map((v) => v.quantity)
          .reduce((prev, curr) => prev + curr, 0)
      );
    };

    return { getFormat, getNum, goToItemDetail };
  },
};
</script>

<style lang="scss" scoped>
.card {
  @include flex(flex-start);
  margin-bottom: 12px;
  padding: 19px 20px;
  background: var(--white);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  cursor: pointer;

  svg {
    margin: 0 8px;
  }
}

.profile {
  margin-right: 12px;
  width: 50px;
  height: 50px;
}

.right {
  width: calc(100% - 60px);
}

strong {
  margin: 0;
  @include body600_15;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}

span {
  color: var(--gray999);
  @include body400_13;
}

.title {
  @include flex(flex-start);
  margin-bottom: 4px;
}

.nick {
  color: var(--black);
  @include body500_13;
}
</style>
