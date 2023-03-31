import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing data for key "${key}": ${error}`);
    }
};

const retrieveData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.error(`Error retrieving data for key "${key}": ${error}`);
    }
};

export { storeData, retrieveData };

/** 
 * Usage example
 * 
// Store a value in local storage
storeData('myKey', { name: 'John', age: 30 });

// Retrieve a value from local storage
const myValue = await retrieveData('myKey');
console.log(myValue); // { name: 'John', age: 30 }
*/