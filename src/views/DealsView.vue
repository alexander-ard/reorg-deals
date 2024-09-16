<template>
  <main class="deals-view">
    <div class="deals-view__utils">
      <div class="deals-view__btns">
        <ButtonBox
          :type="'primary'"
          :icon="DownloadIcon"
          :text="'Export selected as CSV'"
          @click="dealsStore.exportSelectedAsCSV"
        ></ButtonBox>
        <ButtonBox
          :type="'primary'"
          :icon="DownloadIcon"
          :text="'Export all as CSV'"
          @click="dealsStore.exportAllAsCSV"
        ></ButtonBox>
      </div>

      <p class="deals-view__info">
        Select multiple rows by holding the Shift key
        <img :src="ShiftKeyImg" alt="Shift key icon" />
      </p>

      <p class="deals-view__info--mobile">Select multiple rows by long pressing on a row</p>

      <SearchBox @search="onSearchInput"></SearchBox>
    </div>

    <GridTable
      v-if="data && model"
      :model="model"
      :data="data"
      :selected-rows="selectedRows"
      :loading="isLoading"
      @on-row-click="setSelectedRowIndex"
      @on-sort-click="dealsStore.setSortData"
      @on-row-touch-selected="setSelectedRowIndexByTouch"
    ></GridTable>

    <DetailsPane></DetailsPane>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, onUnmounted } from 'vue';
import GridTable from '@/components/GridTable.vue';
import { useDealsStore } from '@/stores/dealsStore';
import SearchBox from '@/components/SearchBox.vue';
import DetailsPane from '@/components/DetailsPane.vue';
import ButtonBox from '@/components/ButtonBox.vue';
import DownloadIcon from '@/components/icons/download.svg';
import ShiftKeyImg from '@/components/icons/shift-key.png';

const dealsStore = useDealsStore();
const {
  model,
  getPageData: data,
  getSelectedIndex: selectedRows,
  isLoading
} = storeToRefs(dealsStore);
const isShiftPressed = ref(false);

const handleKeyDown = (event) => {
  if (event.key === 'Shift') {
    isShiftPressed.value = true;
  }
};

const handleKeyUp = (event) => {
  if (event.key === 'Shift') {
    isShiftPressed.value = false;
  }
};

const setSelectedRowIndexByTouch = (rowIdx) => {
  dealsStore.setSelectedDealIndex({ isMulti: true, index: rowIdx });
};

const setSelectedRowIndex = (rowIdx) => {
  dealsStore.setSelectedDealIndex({ isMulti: isShiftPressed.value, index: rowIdx });
};

const onSearchInput = (searchQuery) => {
  dealsStore.setSearchQuery(searchQuery);
};

onMounted(async () => {
  await dealsStore.fetchModel();
  await dealsStore.fetchData();

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);
});
</script>

<style lang="scss" scoped>
.deals-view {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-weight: normal;
  height: calc(100vh - var(--header-height));
  margin: 0 auto;
  max-width: 1280px;
  padding: 1rem;

  &__utils {
    display: flex;
    justify-content: space-between;

    @media screen and (width <= 768px) {
      flex-direction: column;
    }
  }

  &__info {
    display: flex;
    gap: 10px;
    margin: 0;
    place-items: center;
    user-select: none;

    img {
      height: var(--space-4-x);
    }

    @media screen and (width <= 768px) {
      display: none;
    }

    &--mobile {
      display: none;

      @media screen and (width <= 768px) {
        display: block;
      }
    }
  }

  &__btns {
    display: flex;

    @media screen and (width <= 425px) {
      flex-direction: column;
    }
  }
}
</style>
