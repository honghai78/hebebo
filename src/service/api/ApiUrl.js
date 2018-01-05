import {HOST_SERVER} from './config'

export default class ApiUrl {

    static booking() {
        return HOST_SERVER + 'bookings';
    }
}