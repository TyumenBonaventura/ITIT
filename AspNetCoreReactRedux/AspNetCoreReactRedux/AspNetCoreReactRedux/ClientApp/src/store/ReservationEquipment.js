const initialState = {
    reservationequipment: [],
    reservation: [],
    equipment: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestReservationEquipment: () => async (dispatch, getState) => {

        const url = 'api/ReservationEquipment/ReservationEquipment';
        const response = await fetch(url);
        const reservationequipment = await response.json();
        dispatch({ type: 'FETCH_RESERVATIONEQUIPMENT', reservationequipment });
    },
    saveReservationEquipment: reservationequipment => async (dispatch, getState) => {

        const url = 'api/ReservationEquipment/SaveReservationEquipment';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(reservationequipment)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_RESERVATIONEQUIPMENT', reservationequipment });
    },
    deleteReservationEquipment: reservationequipmentId => async (dispatch, getState) => {
        const url = 'api/ReservationEquipment/DeleteReservationEquipment/' + reservationequipmentId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_RESERVATIONEQUIPMENT', reservationequipmentId });
    },
    requestReservation: () => async (dispatch, getState) => {

        const url = 'api/ReservationEquipment/Reservation';
        const response = await fetch(url);
        const reservation = await response.json();
        dispatch({ type: 'FETCH_RESERVATION', reservation });
    },
    requestEquipment: () => async (dispatch, getState) => {

        const url = 'api/ReservationEquipment/Equipment';
        const response = await fetch(url);
        const equipment = await response.json();
        dispatch({ type: 'FETCH_EQUIPMENT', equipment });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_RESERVATIONEQUIPMENT': {
            return {
                ...state,
                reservationequipment: action.reservationequipment,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_RESERVATIONEQUIPMENT': {
            return {
                ...state,
                reservationequipment: Object.assign({}, action.reservationequipment),
                forceReload: true
            }
        }
        case 'DELETE_RESERVATIONEQUIPMENT': {
            return {
                ...state,
                reservationequipmentId: action.reservationequipmentId,
                forceReload: true
            }
        }
        case 'FETCH_RESERVATION': {
            return {
                ...state,
                reservation: action.reservation,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'FETCH_EQUIPMENT': {
            return {
                ...state,
                equipment: action.equipment,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        default:
            return state;
    }
};
