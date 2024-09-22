export const fetchUserData = () => async dispatch => {
    dispatch({ type: 'FECTH_USER_START' });

    try {
        const response = await fetch('https://apiactions.ru');
        const userData = await response.json();

        dispatch({ type: 'FECTH_USER_SUCCESS', payload: userData });
    } catch (error) {
        dispatch({ type: 'FECTH_USER_FAILURE', payload: error.message })
    }
};