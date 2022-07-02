<template>
  <div class="textContainer">
    <strong class="label">{{ label }}</strong>
    <label @change="selectAll">
      <input type="checkbox" v-model="checkedAll" :value="checkedAll" />
      전체선택
    </label>
  </div>
  <input class="stInput" :placeholder="placeholder" @click="openList()" />
  <span>▼</span>
  <!-- <ul class="container" v-if="isOpenList">
    <li class="containerList">
      <label v-for="item in itemList" :key="item.id" @change="handleValue">
        <input type="checkbox" :value="item.text" v-model="checkedValue" />
        {{ item.text }}
      </label>
    </li>
  </ul> -->

  <Multiselect
    v-model="checkedValue"
    :options="itemList"
    :searchable="true"
    :createTag="true"
    placeholder="대상 인원을 선택하세요"
    mode="tags"
  />
</template>

<script>
import Multiselect from '@vueform/multiselect';

export default {
  name: 'MultiselectView',
  components: { Multiselect },
  props: {
    label: String,
    items: Object,
    placeholder: String,
  },
  data() {
    return {
      checkedValue: null,
      checkedAll: '',
      itemList: this.items,
      isOpenList: false,
    };
  },
  methods: {
    selectAll() {
      if (this.checkedAll) {
        this.checkedValue = this.itemList;
      } else {
        this.checkedValue = [];
      }
      console.log('====openList', this.checkedAll, this.checkedValue);
    },
    openList() {
      this.isOpenList = !this.isOpenList;
      console.log('====openList', this.isOpenList);
    },
    handleValue() {
      console.log(this.checkedValue);
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped lang="scss">
.textContainer {
  display: flex;
  justify-content: space-between;

  label {
    margin-right: 0;
  }
}

.label {
  font-size: 16px;
  font-weight: 600;
}

.stInput {
  width: 100%;
  height: 35px;
  padding: 10px 0 0;
  border-bottom: 1px solid var(--line);

  &:focus {
    border-bottom: 2px solid var(--primary);
  }

  &::placeholder {
    padding: 10px;
    color: var(--text-999);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.2px;
  }
}

.container {
  width: 100%;
  padding: 10px;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 1.95px 1.95px 2.6px rgb(0 0 0 / 15%);
  transition: all 0.1s ease-in-out;
}

.containerList {
  display: flex;
  flex-direction: column;
  margin: 5px;

  label {
    margin: 5px;
  }
}

span {
  position: relative;
  top: -25px;
  left: 95%;
  color: var(--primary);
  opacity: 0.4;
}
</style>
