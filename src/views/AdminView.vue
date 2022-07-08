<template>
  <basic-header title="관리자 페이지" />
  <main>
    <div class="menu">
      <div class="subMenuTitle">포인트 관리</div>
      <ul class="subMenu">
        <li @click.stop="goToStatus">포인트 현황</li>
        <li @click.stop="goToIssuance">포인트 발급</li>
        <li @click.stop="goToRecord">사용내역 기록</li>
      </ul>

      <div class="subMenuTitle">(예정)휴가 관리</div>
    </div>
  </main>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';

export default {
  components: { BasicHeader },
  name: 'AdminView',
  methods: {
    goToStatus() {
      this.$router.push('/admin/status');
    },
    goToIssuance() {
      this.$router.push('/admin/issuance');
    },
    goToRecord() {
      this.$router.push('/point/record');
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  background: var(--lightGrey);
}

.subMenuTitle {
  padding: 20px 30px;
  background: var(--primary);
  color: var(--white);
}

.subMenu {
  li {
    padding: 20px 50px;
    background: var(--lightGrey);
    border-bottom: 0.5px solid var(--line);
    cursor: pointer;
  }
}
</style>
