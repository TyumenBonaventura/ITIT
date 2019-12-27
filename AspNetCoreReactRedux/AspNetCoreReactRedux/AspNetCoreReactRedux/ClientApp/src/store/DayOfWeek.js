const initialState = {
    dayofweek: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestDayOfWeek: () => async (dispatch, getState) => {

        const url = 'api/DayOfWeek/DayOfWeek';
        const response = await fetch(url);
        const dayofweek = await response.json();
        dispatch({ type: 'FETCH_DAYOFWEEK', dayofweek });
    },
    saveDayOfWeek: dayofweek => async (dispatch, getState) => {

        const url = 'api/DayOfWeek/SaveDayOfWeek';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(dayofweek)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_DAYOFWEEK', dayofweek });
    },
    deleteDayOfWeek: dayOfWeekId => async (dispatch, getState) => {
        const url = 'api/DayOfWeek/DeleteDayOfWeek/' + dayOfWeekId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_DAYOFWEEK', dayOfWeekId });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_DAYOFWEEK': {
            return {
                ...state,
                dayofweek: action.dayofweek,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_DAYOFWEEK': {
            return {
                ...state,
                dayofweek: Object.assign({}, action.dayofweek),
                forceReload: true
            }
        }
        case 'DELETE_DAYOFWEEK': {
            return {
                ...state,
                dayOfWeekId: action.dayOfWeekId,
                forceReload: true
            }
        }
        default:
            return state;
    }
};
