import * as ActionTypes from './ActionType'
import APIServices from '../service/api'
import ApiUrl from "../service/api/ApiUrl";
import AppUnits from "../utils/AppUnits";

export function setShowProgressBar(isShow, text) {
    return {
        type: ActionTypes.SHOW_PROGRESS_BAR,
        isShowProgressBar: isShow,
        textOfProgressBar: text!=null?text:null
    }
}

export function setShowModal(isShow, title, content, okAction) {
    return {
        type: ActionTypes.APP_SHOW_MODAL,
        isShowModal: isShow,
        titleModal: title,
        contentModal: content,
        okAction: okAction
    }
}

export function bookings(input) {
    console.log(input)
    return (dispatch) => {
        APIServices.post(ApiUrl.booking(), input).then((response) => {
            if(response.status < 400){
                dispatch({
                    type: ActionTypes.APP_BOOKINGS_SUCCESS,
                    bookingData: null
                })
            }else{
                dispatch({
                    type: ActionTypes.APP_BOOKINGS_ERROR,
                    bookingData: null
                })
            }
           // return response.json();
        }).then((responseJson) => {
           console.log(responseJson);
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: ActionTypes.APP_BOOKINGS_ERROR,
                bookingData: null
            })
        })
    }
}