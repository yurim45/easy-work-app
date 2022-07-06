<template>
  <basic-header title="관리자 페이지" />
  <main>
    <h1>Hello!</h1>
    <h2>메뉴</h2>
    <ul class="menu">
      <li @click.prevent.self>
        포인트 관리
        <ul @click.prevent.self class="subMenu">
          <li @click.stop="goToStatus">포인트 현황</li>
          <li @click.stop="goToIssuance">포인트 발급</li>
          <li @click.stop="goToRecord">사용내역 기록</li>
        </ul>
      </li>
      <li>(예정)휴가 관리</li>
    </ul>
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
  @include stLayout;
}

.menu {
  li {
    margin: 20px;
    cursor: pointer;
  }
}

.subMenu {
  margin-bottom: 40px;
}
</style>
