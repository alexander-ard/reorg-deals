import { describe, test, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import DetailsPane from '../DetailsPane.vue';
import { useDealsStore } from '@/stores/dealsStore';

vi.mock('@/utils', () => ({
  dataValueToString: vi.fn((value) => value.toString())
}));

describe('DetailsPane', async () => {
  let wrapper;
  wrapper = shallowMount(DetailsPane, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    }
  });

  const store = useDealsStore();

  store.getSelectedDealDetails = {
    id: '0',
    name: 'Test Deal'
  };

  await wrapper.vm.$nextTick();

  test('renders correctly when deal details are present', async () => {
    expect(wrapper.find('.details-pane').exists()).toBe(true);
    expect(wrapper.find('.details-pane--hidden').exists()).toBe(false);
    expect(wrapper.find('h2').text()).toBe('Deal Details');
  });

  test('renders deal details correctly', async () => {
    const items = wrapper.findAll('.details-pane__item');

    expect(items).toHaveLength(2);
    expect(items[0].find('.details-pane__label').text()).toBe('id:');
    expect(items[0].find('.details-pane__value').text()).toBe('0');
    expect(items[1].find('.details-pane__label').text()).toBe('name:');
    expect(items[1].find('.details-pane__value').text()).toBe('Test Deal');
  });

  test('hides the pane when no deal details are present', async () => {
    store.getSelectedDealDetails = false;

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.details-pane--hidden').exists()).toBe(true);
  });
});
