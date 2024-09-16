//Get data from .json files in /public folder. Simulates an actual API request.

export const fetchFromAPI = async (filePath) => {
  try {
    const response = await fetch(`${filePath}.json`);
    if (!response.ok) throw new Error('Failed to fetch local JSON data');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
