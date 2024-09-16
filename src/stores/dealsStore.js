import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { fetchFromAPI, exportAsCSV } from '@/utils';

export const useDealsStore = defineStore('deals', () => {
  const isLoading = ref(false);
  const model = ref([]);
  const rows = ref([]);
  const searchQuery = ref('');
  const selectedDealIndex = ref([]);
  const sortColumn = ref('');
  const sortDirection = ref('asc');
  const isMultiSelection = ref(false);

  const clearSelectedIndex = () => {
    selectedDealIndex.value = [];
  };

  const exportAllAsCSV = () => {
    //Export all rows as CSV

    const CSVString = [
      model.value.map((x) => x.label),
      ...rows.value.map((x) => JSON.parse(x.data)).map((x) => Object.values(x))
    ];

    return exportAsCSV(CSVString);
  };

  const exportSelectedAsCSV = () => {
    // Export only selected rows as CSV

    const selectedRows = rows.value.filter((x) => selectedDealIndex.value.includes(x.id));

    const CSVString = [
      model.value.map((x) => x.label),
      ...selectedRows.map((x) => JSON.parse(x.data)).map((x) => Object.values(x))
    ];

    return exportAsCSV(CSVString);
  };

  const fetchData = async () => {
    // Fetches rows and assigns items an internal ID to be used for selection purposes.
    // Map as JSON to simplify search functionality.

    isLoading.value = true;
    const rawData = await fetchFromAPI('./data');
    isLoading.value = false;

    rows.value = rawData?.map((item, idx) => ({ id: idx, data: JSON.stringify(item) }));
  };

  const fetchModel = async () => {
    isLoading.value = true;
    model.value = await fetchFromAPI('/model');
    isLoading.value = false;
  };

  const getPageData = computed(() => {
    // Filter and sort rows based on search query and sorting preferences

    const filteredRows = (rows.value || [])
      .filter((x) => x.data.toLowerCase().includes(searchQuery.value.toLowerCase()))
      .map((x) => ({ id: x.id, data: JSON.parse(x.data) }));

    if (sortColumn.value) {
      filteredRows.sort((a, b) => {
        const aValue = a.data[sortColumn.value];
        const bValue = b.data[sortColumn.value];

        if (!isNaN(aValue) && !isNaN(bValue)) {
          // Handle comparison of numeric values
          return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
          const aString = String(aValue).toLowerCase();
          const bString = String(bValue).toLowerCase();
          return sortDirection.value === 'asc'
            ? aString.localeCompare(bString)
            : bString.localeCompare(aString);
        }
      });
    }

    return filteredRows;
  });

  const getSelectedDealDetails = computed(() => {
    // Get details of selected index
    if (selectedDealIndex.value.length !== 1 || isMultiSelection.value) {
      return false;
    }

    const selectedDeal = getPageData.value[selectedDealIndex.value.at(0)].data;
    return Object.fromEntries(
      Object.entries(selectedDeal).map(([key, value]) => [
        model.value.find((x) => x.key === key)?.label || key,
        value
      ])
    );
  });

  const getSelectedIndex = computed(() => {
    return selectedDealIndex.value;
  });

  const setSearchQuery = (searchVal) => {
    selectedDealIndex.value = [];
    searchQuery.value = searchVal;
  };

  const setSelectedDealIndex = ({ isMulti, index }) => {
    isMultiSelection.value = isMulti;

    if (isMulti) {
      const indexPosition = selectedDealIndex.value.indexOf(index);

      if (indexPosition === -1) {
        selectedDealIndex.value.push(index);
      } else {
        selectedDealIndex.value.splice(indexPosition, 1);
      }
    } else {
      selectedDealIndex.value = [index];
    }
  };

  const setSortData = ({ column, direction }) => {
    sortColumn.value = column;
    sortDirection.value = direction;
  };

  return {
    clearSelectedIndex,
    exportAllAsCSV,
    exportSelectedAsCSV,
    fetchData,
    fetchModel,
    getPageData,
    getSelectedDealDetails,
    getSelectedIndex,
    isLoading,
    model,
    setSearchQuery,
    setSelectedDealIndex,
    setSortData
  };
});
