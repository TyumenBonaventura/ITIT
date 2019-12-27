const initialState = {
    reservationstatus: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestReservationStatus: () => async (dispatch, getState) => {

        const url = 'api/ReservationStatus/ReservationStatus';
        const response = await fetch(url);
        const reservationstatus = await response.json();
        dispatch({ type: 'FETCH_RESERVATIONSTATUS', reservationstatus });
    },
    saveReservationStatus: reservationstatus => async (dispatch, getState) => {

        const url = 'api/ReservationStatus/SaveReservationStatus';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(reservationstatus)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_RESERVATIONSTATUS', reservationstatus });
    },
    deleteReservationStatus: reservationStatusId => async (dispatch, getState) => {
        const url = 'api/ReservationStatus/DeleteReservationStatus/' + reservationStatusId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_RESERVATIONSTATUS', reservationStatusId });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_RESERVATIONSTATUS': {
            return {
                ...state,
                reservationstatus: action.reservationstatus,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_RESERVATIONSTATUS': {
            return {
                ...state,
                reservationstatus: Object.assign({}, action.reservationstatus),
                forceReload: true
            }
        }
        case 'DELETE_RESERVATIONSTATUS': {
            return {
                ...state,
                reservationStatusId: action.reservationStatusId,
                forceReload: true
            }
        }
        default:
            return state;
    }
};
