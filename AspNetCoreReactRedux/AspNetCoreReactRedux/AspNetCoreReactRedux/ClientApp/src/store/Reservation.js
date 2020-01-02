const initialState = {
    reservation: [],
    user: [],
    reservationstatus: [],
    doctype: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestReservation: () => async (dispatch, getState) => {

        const url = 'api/Reservation/Reservation';
        const response = await fetch(url);
        const reservation = await response.json();
        dispatch({ type: 'FETCH_RESERVATION', reservation });
    },
    saveReservation: reservation => async (dispatch, getState) => {

        const url = 'api/Reservation/SaveReservation';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(reservation)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_RESERVATION', reservation });
    },
    deleteReservation: reservationId => async (dispatch, getState) => {
        const url = 'api/Reservation/DeleteReservation/' + reservationId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_RESERVATION', reservationId });
    },
    requestUser: () => async (dispatch, getState) => {

        const url = 'api/Reservation/User';
        const response = await fetch(url);
        const user = await response.json();
        dispatch({ type: 'FETCH_USER', user });
    },
    requestReservationStatus: () => async (dispatch, getState) => {

        const url = 'api/Reservation/ReservationStatus';
        const response = await fetch(url);
        const reservationstatus = await response.json();
        dispatch({ type: 'FETCH_RESERVATIONSTATUS', reservationstatus });
    },
    requestDocType: () => async (dispatch, getState) => {

        const url = 'api/Reservation/DocType';
        const response = await fetch(url);
        const doctype = await response.json();
        dispatch({ type: 'FETCH_DOCTYPE', doctype });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_RESERVATION': {
            return {
                ...state,
                reservation: action.reservation,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_RESERVATION': {
            return {
                ...state,
                reservation: Object.assign({}, action.reservation),
                forceReload: true
            }
        }
        case 'DELETE_RESERVATION': {
            return {
                ...state,
                reservationId: action.reservationId,
                forceReload: true
            }
        }
        case 'FETCH_USER': {
            return {
                ...state,
                user: action.user,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'FETCH_RESERVATIONSTATUS': {
            return {
                ...state,
                reservationstatus: action.reservationstatus,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'FETCH_DOCTYPE': {
            return {
                ...state,
                doctype: action.doctype,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        default:
            return state;
    }
};
