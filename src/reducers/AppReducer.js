import * as ActionTypes from "../actions/ActionType";

const initialState = {
    action: null,
    value: '',
    isShowProgressBar: false,
    textOfProgressBar: null,
    isShowModal: false,
    titleModal: null,
    contentModal: null,
    okAction: null
};

export default (state = initialState, action) => {
    state.action = action.type;
    switch (action.type) {
        case ActionTypes.SHOW_PROGRESS_BAR:
            return {
                ...state,
                isShowProgressBar: action.isShowProgressBar,
                textOfProgressBar: action.textOfProgressBar
            };
        case ActionTypes.APP_SHOW_MODAL:
            return {
                ...state,
                isShowModal: action.isShowModal,
                titleModal: action.titleModal,
                contentModal: action.contentModal,
                okAction: action.okAction
            };
        case ActionTypes.APP_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookingData: action.bookingData
            };
        case ActionTypes.APP_BOOKINGS_ERROR:
            return {
                ...state,
                bookingData: action.bookingData
            };
        default:
            return state;
    }
}