import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'tasks';

export const saveTasksToStorage = async (tasks: any[]) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save tasks:', e);
  }
};

export const loadTasksFromStorage = async (): Promise<any[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load tasks:', e);
    return [];
  }
};
