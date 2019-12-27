const initialState = {
    rate: [],
    dayofweek: [],
    equipmenttype: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestRate: () => async (dispatch, getState) => {

        const url = 'api/Rate/Rate';
        const response = await fetch(url);
        const rate = await response.json();
        dispatch({ type: 'FETCH_RATE', rate });
    },
    saveRate: rate => async (dispatch, getState) => {

        const url = 'api/Rate/SaveRate';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(rate)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_RATE', rate });
    },
    deleteRate: rateId => async (dispatch, getState) => {
        const url = 'api/Rate/DeleteRate/' + rateId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_RATE', rateId });
    },
    requestDayOfWeek: () => async (dispatch, getState) => {

        const url = 'api/Rate/DayOfWeek';
        const response = await fetch(url);
        const dayofweek = await response.json();
        dispatch({ type: 'FETCH_DAYOFWEEK', dayofweek });
    },
    requestEquipmentType: () => async (dispatch, getState) => {

        const url = 'api/Rate/EquipmentType';
        const response = await fetch(url);
        const equipmenttype = await response.json();
        dispatch({ type: 'FETCH_EQUIPMENTTYPE', equipmenttype });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_RATE': {
            return {
                ...state,
                rate: action.rate,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_RATE': {
            return {
                ...state,
                rate: Object.assign({}, action.rate),
                forceReload: true
            }
        }
        case 'DELETE_RATE': {
            return {
                ...state,
                rateId: action.rateId,
                forceReload: true
            }
        }
        case 'FETCH_DAYOFWEEK': {
            return {
                ...state,
                dayofweek: action.dayofweek,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'FETCH_EQUIPMENTTYPE': {
            return {
                ...state,
                equipmenttype: action.equipmenttype,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        default:
            return state;
    }
};
