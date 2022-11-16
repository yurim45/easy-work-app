<template>
  <ul>
    <li
      v-for="(dayoff, i) in dayoffData"
      :key="dayoff.id"
      class="list"
      @click="goToPage(dayoff)"
    >
      <div>
        <div v-if="!isDateView(dayoff, i)" class="date" />
        <div class="date" v-if="isDateView(dayoff, i)">
          {{ getDateFormat(dayoff.startDate) }}
        </div>
      </div>
      <div :class="{ listline: i < dayoffData?.length - 1 }">
        <div class="info">
          <strong>{{ getFormat(dayoff.category) }}</strong>
          <icon-approved
            v-if="dayoff.status === 'Approved' && dayoff.category !== 'System'"
          />
          <icon-hold v-if="dayoff.status === 'Pending'" />
          <icon-rejected v-if="dayoff.status === 'Rejected'" />
        </div>
        <div class="content">
          <div v-if="dayoff.startDate">
            {{ getDateFormatYear(dayoff.startDate) }}~{{
              getDateFormatYear(dayoff.endDate)
            }}
          </div>
          <div v-if="!dayoff.startDate">
            {{ dayoff.reason }}
          </div>
          <icon-separator />
          <span
            :class="{
              red: dayoff.category !== 'System',
              blue: dayoff.category === 'System',
            }"
          >
            {{ getCnt(dayoff) }}</span
          >
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import {
  IconSeparator,
  IconApproved,
  IconRejected,
  IconHold,
} from '@/components/common/icons/index.js';
import { dateFormat, dateFormatYear } from '@/util';
import { _DAYOFF_CODE } from '@/constants';

export default {
  name: 'DayOffHistoryList',
  components: {
    IconSeparator,
    IconApproved,
    IconRejected,
    IconHold,
  },
  props: {
    data: Array,
    goToPage: Function,
  },
  setup(props) {
    const dayoffData = ref([]);

    onMounted(() => {
      dayoffData.value = props.data;
    });

    watch(props, () => {
      dayoffData.value = props.data;
    });

    const getDateFormat = (date) => {
      if (!date) return;
      return dateFormat(date);
    };

    const isDateView = (data, i) => {
      if (i === 0) {
        return true;
      } else {
        return data.startDate?.substr(0, 10) ===
          dayoffData.value[i - 1].startDate?.substr(0, 10)
          ? false
          : true;
      }
    };

    const getCnt = (data) => {
      if (data.category === 'HalfOffAM' || data.category === 'HalfOffPM') {
        return 0.5;
      } else {
        return data.deductedDayoffCnt;
      }
    };

    const getFormat = (data) => {
      return _DAYOFF_CODE[data];
    };

    const getDateFormatYear = (date) => {
      if (!date) return;
      return dateFormatYear(date);
    };

    return {
      dayoffData,
      getDateFormat,
      isDateView,
      getFormat,
      getCnt,
      getDateFormatYear,
    };
  },
};
</script>

<style lang="scss" scoped>
.list {
  @include flex(flex-start, flex-start);
  width: 100%;
  margin-bottom: 12px;
  cursor: pointer;
}

.date {
  width: 30px;
  margin-right: 25px;
  @include body400_14;
  color: var(--gray555);
  text-align: left;
}

.listline {
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
}

.info {
  margin-bottom: 3px;
  @include flex(flex-start);

  strong {
    @include body600_15;
  }

  svg {
    margin: 0 6px;
  }
}

.content {
  @include flex(flex-start);
  color: var(--gray999);
  @include body400_13;

  svg {
    margin: 0 8px;
  }
}

.red {
  @include body500_13;
  color: var(--red-txt);
}

.blue {
  @include body500_13;
  color: var(--blue-txt);
}
</style>
