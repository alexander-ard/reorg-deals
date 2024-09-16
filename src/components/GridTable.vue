<template>
  <div class="grid__container">
    <table v-if="!loading" class="grid__table" @keydown="handleKeyDown">
      <thead class="grid__header">
        <tr>
          <th v-for="column in model" :key="column.key">
            <div class="grid__cell grid__cell--header">
              {{ column.label }}
              <div class="grid__buttons">
                <ButtonBox
                  :type="'text-only'"
                  :alt="'Sort in ascending order'"
                  :icon="AcsendentOrderIcon"
                  @click="onSortClick(column.key, 'asc')"
                />
                <ButtonBox
                  :type="'text-only'"
                  :alt="'Sort in descending order'"
                  :icon="DescendentOrderIcon"
                  @click="onSortClick(column.key, 'desc')"
                />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="!loading" class="grid__content">
        <tr
          @click="(evt) => onRowClick(evt, index)"
          @touchstart="startLongPress(index)"
          @touchend="cancelLongPress"
          @touchcancel="cancelLongPress"
          v-for="(row, index) in data"
          :key="row.id"
          class="grid__row"
          :class="{
            'grid__row--selected': selectedRows?.includes(index)
          }"
        >
          <td v-for="column in model" :key="column.key" class="grid__cell">
            {{ dataValueToString(row.data[column.key]) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="grid__spinner">
      <img :src="Spinner" />
    </div>
  </div>
</template>

<script setup>
import { dataValueToString } from '@/utils';
import ButtonBox from './ButtonBox.vue';
import AcsendentOrderIcon from '@/components/icons/up-chevron.svg';
import DescendentOrderIcon from '@/components/icons/down-chevron.svg';
import Spinner from '@/components/icons/loading-spinner.svg';
import { ref } from 'vue';

const { model, data } = defineProps({
  model: {
    type: Array,
    required: true
  },
  /*
    Data array as: [ { id: number, data: Object }]
    Id is used for selection and multi-selection purposes
  */
  data: {
    type: Array,
    required: true
  },
  selectedRows: {
    type: Array,
    required: false
  },
  loading: {
    type: Boolean,
    required: false
  }
});

const emit = defineEmits(['on-row-click', 'on-sort-click', 'on-row-touch-selected']);

let longPressTimeout;
const touchActive = ref(false);

const onRowClick = (event, rowIndex) => {
  if (touchActive.value) {
    event.preventDefault();
  }

  emit('on-row-click', rowIndex);
};

const startLongPress = (rowIndex) => {
  // Set touch flag to prevent click event
  touchActive.value = true;

  // emit selection event on long press
  longPressTimeout = setTimeout(() => {
    emit('on-row-touch-selected', rowIndex);
  }, 500);
};

const cancelLongPress = () => {
  touchActive.value = false;
  clearTimeout(longPressTimeout);
};

const onSortClick = (column, direction) => {
  emit('on-sort-click', { column, direction });
};
</script>

<style lang="scss" scoped>
.grid {
  &__container {
    overflow: auto;
  }

  &__table {
    background-color: var(--white);
    border-spacing: 0;
    overflow: auto;
    width: 100%;
  }

  &__content {
    margin-top: 50px;
    overflow: auto;
    width: auto;
  }

  &__header {
    background-color: var(--color-white);
    border-bottom: var(--border-secondary);
    font-weight: bold;
    height: 50px;
    width: 100%;

    th {
      background-color: var(--color-white);
      border-bottom: var(--border-primary);
      border-top: var(--border-primary);
      position: sticky;
      top: 0;
    }
  }

  &__row {
    &--selected,
    &:hover {
      background-color: var(--color-background);
    }
  }

  &__cell {
    border-bottom: var(--border-secondary);
    padding: var(--space-1-x);
    user-select: none;

    &--header {
      border-bottom: none;
      display: flex;
      display: -webkit-box;
    }
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    padding-left: var(--space-1-x);
  }

  &__spinner {
    display: flex;
    height: 100%;

    img {
      height: 60px;
      margin: auto;
    }
  }
}
</style>
