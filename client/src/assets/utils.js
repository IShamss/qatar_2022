export const loadUser = () => {
    try {
        const serializedState = localStorage.getItem("user");
        if (serializedState === null) {
            return null;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return null;
    }
};

export const saveUser = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("user", serializedState);
    } catch (err) {
        return null;
    }
};
