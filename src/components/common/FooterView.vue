<template>
  <footer class="footer">
    <div class="companyInfo">
      <span>(주)에이티앤피파트너즈</span>
      <div>서울특별시 중구 중림동 중림로 31</div>
      <span>02-704-9718</span>
    </div>
    <p>Copyright ⓒ 2022. ATNP All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterView',
};
</script>

<style scoped lang="scss">
.footer {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 30px 20px;
  background: var(--black);
  color: var(--grey);
  font-size: 12px;
  text-align: center;
  line-height: 2;
}

p {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 0.5px solid var(--grey);
}
</style>
