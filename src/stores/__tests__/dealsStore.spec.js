import { describe, test, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useDealsStore } from '../dealsStore';
import { fetchFromAPI } from '@/utils';
import { exportAsCSV } from '@/utils';

vi.mock('@/utils', () => ({
  fetchFromAPI: vi.fn(),
  exportAsCSV: vi.fn()
}));

describe('useDealsStore', () => {
  beforeEach(async () => {
    setActivePinia(setActivePinia(createPinia()));

    vi.clearAllMocks();

    const mockData = [
      { id: 0, data: JSON.stringify({ id: 10, name: 'Deal 1' }) },
      { id: 1, data: JSON.stringify({ id: 22, name: 'Deal 2' }) }
    ];

    const mockModel = [
      {
        key: 'id',
        type: 'int',
        label: 'ID'
      },
      {
        key: 'name',
        type: 'string',
        label: 'Name'
      }
    ];

    fetchFromAPI.mockImplementation((url) => (url.includes('/data') ? mockData : mockModel));
  });

  test('should initialize with default exported values', () => {
    const store = useDealsStore();

    expect(store.isLoading).toBe(false);
    expect(store.model).toEqual([]);
  });

  test('should set selected deal index', () => {
    const store = useDealsStore();
    store.setSelectedDealIndex({ isMulti: false, index: 1 });

    expect(store.getSelectedIndex).toEqual([1]);
  });

  test('should export selected rows as CSV', async () => {
    const store = useDealsStore();

    await store.fetchData();
    await store.fetchModel();

    store.setSelectedDealIndex({ isMulti: false, index: 0 });
    await store.exportSelectedAsCSV();

    expect(exportAsCSV).toHaveBeenCalledWith([
      ['ID', 'Name'],
      [0, '{"id":10,"name":"Deal 1"}']
    ]);
  });

  test('should export ALL rows as CSV', async () => {
    const store = useDealsStore();

    await store.fetchData();
    await store.fetchModel();
    await store.exportAllAsCSV();

    expect(exportAsCSV).toHaveBeenCalledWith([
      ['ID', 'Name'],
      [0, '{"id":10,"name":"Deal 1"}'],
      [1, '{"id":22,"name":"Deal 2"}']
    ]);
  });

  test('should compute filtered and sorted page data', async () => {
    const store = useDealsStore();

    await store.fetchData();
    await store.fetchModel();

    store.setSortData({ column: 'name', direction: 'asc' });

    const pageData = store.getPageData;

    store.setSearchQuery('Deal 1');

    expect(pageData).toEqual([
      { id: 0, data: { id: 0, data: '{"id":10,"name":"Deal 1"}' } },
      { id: 1, data: { id: 1, data: '{"id":22,"name":"Deal 2"}' } }
    ]);
  });
});
