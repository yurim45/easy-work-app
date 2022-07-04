<template>
  <basic-header title="관리자 페이지" />
  <main>
    <h1>Hello!</h1>
    <h2>메뉴</h2>
    <ul class="menu">
      <li>
        포인트 관리
        <ul class="subMenu">
          <li>포인트 현황</li>
          <li><router-link to="/admin/issuance">포인트 발급</router-link></li>
          <li><router-link to="/point/record">사용내역 기록</router-link></li>
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
