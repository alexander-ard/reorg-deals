<template>
  <div
    class="details-pane"
    :class="{
      'details-pane--hidden': !dealDetails
    }"
  >
    <div class="details-pane__title">
      <h2>Deal Details</h2>
      <ButtonBox @click="closePane" :text="'X'" :type="'text-only'"></ButtonBox>
    </div>

    <div v-for="(value, key) in dealDetails" :key="key" class="details-pane__item">
      <label class="details-pane__label">{{ key }}:</label>
      <span class="details-pane__value">{{ dataValueToString(value) }}</span>
    </div>
  </div>
</template>

<script setup>
import { useDealsStore } from '@/stores/dealsStore';
import { dataValueToString } from '@/utils';
import { storeToRefs } from 'pinia';
import ButtonBox from './ButtonBox.vue';

const store = useDealsStore();
const { getSelectedDealDetails: dealDetails } = storeToRefs(store);

const closePane = () => {
  store.clearSelectedIndex();
};
</script>

<style lang="scss" scoped>
.details-pane {
  background-color: var(--color-background);
  border-left: var(--border-secondary);
  font-size: 1.25em;
  height: 100%;
  margin-top: var(--header-height);
  padding: 0 24px;
  position: absolute;
  right: 0;
  top: 0;
  transition: width 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 350px;

  &--hidden {
    box-sizing: border-box;
    margin: 0;
    overflow: hidden;
    padding: 0;
    width: 0;
  }

  &__title {
    align-items: center;
    border-bottom: var(--border-primary);
    display: flex;
    justify-content: space-between;
  }

  &__item {
    display: flex;
    gap: var(--space-1-x);
    padding: var(--space-1-x) 0;
  }

  &__label {
    font-weight: bold;
  }
}
</style>
