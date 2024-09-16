import { mount } from '@vue/test-utils';
import GridTable from '../GridTable.vue';
import { describe, test, expect } from 'vitest';

describe('GridTable.vue', () => {
  const model = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' }
  ];
  const data = [
    { id: 1, data: { name: 'John', age: 30 } },
    { id: 2, data: { name: 'Jane', age: 25 } }
  ];

  const wrapper = mount(GridTable, {
    props: { model, data, loading: false }
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findAll('.grid__cell--header').length).toBe(model.length);
    expect(wrapper.findAll('.grid__cell:not(.grid__cell--header)').length).toBe(
      data.length * model.length
    );
  });

  test('emits on-row-click when a row is clicked', async () => {
    await wrapper.find('.grid__row').trigger('click');
    expect(wrapper.emitted('on-row-click')).toBeTruthy();
    expect(wrapper.emitted('on-row-click')[0]).toEqual([0]);
  });

  test('emits on-sort-click when sort buttons are clicked', async () => {
    await wrapper.findAll('.grid__buttons button')[0].trigger('click'); // Ascending sort
    expect(wrapper.emitted('on-sort-click')).toBeTruthy();
    expect(wrapper.emitted('on-sort-click')[0]).toEqual([{ column: 'name', direction: 'asc' }]);

    await wrapper.findAll('.grid__buttons button')[1].trigger('click'); // Descending sort
    expect(wrapper.emitted('on-sort-click')[1]).toEqual([{ column: 'name', direction: 'desc' }]);
  });

  test('shows spinner when loading is true', async () => {
    await wrapper.setProps({ loading: true });
    expect(wrapper.find('.grid__spinner').exists()).toBe(true);
  });
});
