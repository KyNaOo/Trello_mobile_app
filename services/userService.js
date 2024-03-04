import AsyncStorage from "@react-native-async-storage/async-storage";
const saveUser = async (user) => {
    try {
        const jsonUser = JSON.stringify(user)
        await AsyncStorage.setItem('user', jsonUser);
    } catch (e) {
        console.error(e);
    }
}

const isLogged = async () => {
    try {
        let user = await AsyncStorage.getItem('user');
        return !!user;
    } catch (e) {
        console.error(e);
    }
}

const removeUser = async () => {
    try {
        await AsyncStorage.removeItem('user');
    } catch (e) {
        console.error(e);
    }
}

const getUser = async () => {
    try {
        const jsonUser = await AsyncStorage.getItem('user');
        return JSON.parse(jsonUser);
    } catch (e) {
        console.error(e);
    }
}
export const userService = {
    saveUser,
    isLogged,
    removeUser,
    getUser
}
