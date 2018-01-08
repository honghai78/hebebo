import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from './../actions';
import {
    Text,
    View,
    Platform,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    BackAndroid,
    Alert,
    ScrollView,
    Keyboard
} from 'react-native'
import {ActionSheet} from 'native-base'
import style from './style';
import {images} from "../images";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import AppUnits from "../utils/AppUnits";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Splash from 'react-native-splash-screen';
import Toast from '@remobile/react-native-toast'

const DIA_CHI = 0, DICH_VU = 1, HO_TEN = 2, SDT = 3, EMAIL = 4, NGAY = 5, TIME = 6, NOTE = 7;
var BUTTONS = ["Dọn Dẹp Nhà Cửa", "Sửa Điện Lạnh, Sửa Điện", "Chuyển Nhà", "Trông trẻ"];


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            txtNgay: AppUnits.convertDate(new Date()),
            txtDiaChi: '',
            txtDichVu: '',
            txtHoTen: '',
            txtsdt: '',
            txtEmai: '',
            txtTime: '',
            isDateTimePickerVisibleTime: false,
            txtDescription: ''
        }
    }

    componentWillMount() {
        let date = new Date();
        date.setHours(new Date().getHours() + 2);
        this.setState({
            txtTime: date.toLocaleTimeString()
        })
        setTimeout(() => {
            Splash.hide();
        }, 1000)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.action === Actions.ActionTypes.APP_BOOKINGS_SUCCESS) {
            this.props.actions.setShowProgressBar(false)
            this.props.actions.setShowModal(true, "Thông Báo", "Đặt lịch thành công");
        } else if (nextProps.state.action === Actions.ActionTypes.APP_BOOKINGS_ERROR) {
            this.props.actions.setShowProgressBar(false)
            this.props.actions.setShowModal(true, "Có lỗi!", "Có lỗi xảy ra khi thực hiện đặt lịch. Vui lòng thử lại sau.");
        }
    }

    _onSubmitClick() {
        var date = this.state.txtNgay.split('/');
        var valueDate = `${date[2]}-${date[1]}-${date[0]}`;
        let services = this.state.txtDichVu;
        let cellphone = this.state.txtsdt;
        let user = this.state.txtHoTen;
        let email = this.state.txtEmai;
        let address = this.state.txtDiaChi;
        let booking_date = `${valueDate} ${this.state.txtTime}`;
        if(services.trim()==''||cellphone.trim()==''||user.trim()==''||email.trim()==''||address.trim()==''){
            Toast.showLongBottom("Không được để trống thông tin.");
            return;
        }
        var input =
            {
                "services": services,
                "cellphone": cellphone,
                "user": user,
                "email": email,
                "address": address,
                "booking_date": booking_date,
                "description": this.state.txtDescription
            }
        this.props.actions.setShowProgressBar(true, 'Vui lòng đợi!')
        this.props.actions.bookings(input);
    }

    _showActionSheet = () => {
        Keyboard.dismiss();
        ActionSheet.show(
            {
                options: BUTTONS,
                title: "Chọn Dịch Vụ"
            },
            (buttonIndex) => {
                this.setState({
                    txtDichVu: BUTTONS[buttonIndex]
                })
            }
        )
    }

    _showDateTimePicker() {
        Keyboard.dismiss();
        this.setState({isDateTimePickerVisible: true});
    }

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        if (new Date(date.toDateString()) < new Date(new Date().toDateString())) {
            Toast.showLongBottom("Lỗi! Vui lòng kiểm tra lại ngày.");
            this._hideDateTimePicker();
        } else {
            this.setState({
                txtNgay: AppUnits.convertDate(date)
            }, () => {
                this._hideDateTimePicker();
            });
        }
    };

    _showDateTimePickerTime() {
        Keyboard.dismiss();
        this.setState({isDateTimePickerVisibleTime: true});
    }

    _hideDateTimePickerTime = () => this.setState({isDateTimePickerVisibleTime: false});

    _handleDatePickedTime = (time) => {
        if (this.state.txtNgay === AppUnits.convertDate(new Date())) {
            if (time.getHours() - new Date().getHours() < 2) {
                Toast.showLongBottom("Vui lòng chọn hơn ít nhất 2 giờ kể từ bây giờ!");
                this._hideDateTimePickerTime();
                return;
            }
        }
        let value = time.toLocaleTimeString();
        this.setState({
            txtTime: value
        }, () => {
            this._hideDateTimePickerTime();
        });
    };

    _onChangeText(item, text) {
        let id = item.id;
        switch (id) {
            case DIA_CHI:
                this.setState({
                    txtDiaChi: text
                });
                break;
            case DICH_VU:
                this.setState({
                    txtDichVu: text
                });
                break;
            case HO_TEN:
                this.setState({
                    txtHoTen: text
                });
                break;
            case SDT:
                this.setState({
                    txtsdt: text
                });
                break;
            case EMAIL:
                this.setState({
                    txtEmai: text
                });
                break;
            case NGAY:
                this.setState({
                    txtNgay: text
                });
                break;
            case TIME:
                this.setState({
                    txtTime: text
                });
                break;
            case NOTE:
                this.setState({
                    txtDescription: text
                });
                break;
        }
    }

    _onTextSubmitEditing(item) {
        let id = item.id;
        switch (id) {
            case DIA_CHI:
                this.refs.Input1.focus();
                break;
            case DICH_VU:
                this.refs.Input2.focus();
                break;
            case HO_TEN:
                this.refs.Input3.focus();
                break;
            case SDT:
                this.refs.Input4.focus();
                break;
            case EMAIL:
                this.refs.Input5.focus();
                break;
            case NGAY:
                this.refs.Input6.focus();
                break;
            case TIME:
                this.refs.Input7.focus();
                break;
            case NOTE:
                this._onSubmitClick();
                break;
        }
    }

    _onFocusTextInput(item) {
        let id = item.id;
        switch (id) {
            case NGAY:
                this._showDateTimePicker();
                break;
            case TIME:
                this._showDateTimePickerTime();
                break
            case DICH_VU:
                this._showActionSheet();
                break;
        }
    }

    _renderInputLayout() {
        let array = [
            {
                id: DIA_CHI,
                name: 'Địa Chỉ'
            }, {
                id: DICH_VU,
                name: 'Dịch Vụ'
            },
            {
                id: HO_TEN,
                name: 'Họ và Tên'
            }, {
                id: SDT,
                name: 'Số Điện Thoại'
            }, {
                id: EMAIL,
                name: 'Email'
            }, {
                id: NGAY,
                name: 'Ngày'
            },
            {
                id: TIME,
                name: 'Thời Gian'
            }, {
                id: NOTE,
                name: 'Ghi chú (không bắt buộc)'
            }];
        return array.map((item, index) => {
            let id = item.id;
            let value = '';
            let keyboardType = 'default';
            let returnKeyType = 'next';

            switch (id) {
                case DIA_CHI:
                    value = this.state.txtDiaChi;
                    break;
                case DICH_VU:
                    value = this.state.txtDichVu;
                    break;
                case HO_TEN:
                    value = this.state.txtHoTen;
                    break;
                case SDT:
                    value = this.state.txtsdt;
                    keyboardType = 'phone-pad';
                    break;
                case EMAIL:
                    value = this.state.txtEmai;
                    keyboardType = 'email-address';
                    break;
                case NGAY:
                    value = this.state.txtNgay;
                    break;
                case TIME:
                    value = this.state.txtTime;
                    break;
                case NOTE:
                    value = this.state.txtDescription;
                    returnKeyType = 'done'
                    break
            }
            return (
                <View key={index}>
                    <Text style={{fontWeight: 'bold', marginTop: 15, fontSize: 16}}>{item.name}</Text>
                    <TextInput style={{
                        borderRadius: 4,
                        borderWidth: 1,
                        height: 40,
                        fontSize: 16,
                        marginTop: 10,
                        borderColor: '#d6d7da',
                        paddingLeft: 5
                    }} value={value} onChangeText={(text) => {
                        this._onChangeText(item, text)
                    }} keyboardType={keyboardType} returnKeyType={returnKeyType}
                               onSubmitEditing={(event) => {
                                   this._onTextSubmitEditing(item)
                               }}
                               ref={'Input' + item.id}
                               onFocus={() => this._onFocusTextInput(item)}
                               underlineColorAndroid='transparent'/>
                </View>
            )
        })
    }

    render() {
        const ScrollContainer = Platform.OS === 'ios' ? KeyboardAwareScrollView : ScrollView;
        return (<ScrollContainer style={style.container}>
            <ActionSheet ref={(c) => {
                ActionSheet.actionsheetInstance = c;
            }}/>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center', marginTop: 38
            }}>
                <Image source={images.logo_text} style={{width: 170, height: 40}}>
                </Image>
            </View>
            <View>
                <View style={{
                    height: 60,
                    backgroundColor: '#349F34',
                    marginTop: 38,
                    justifyContent: 'center',
                    paddingLeft: 15
                }}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 32}}>Đặt Lịch</Text>
                </View>
                <Text
                    style={{fontStyle: 'italic', fontWeight: 'bold', marginTop: 30, fontSize: 16, textAlign: 'center'}}>Vì
                    chúng mình ghét bề bộn!</Text>
                <View style={{margin: 15}}>
                    {this._renderInputLayout()}
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 15}}>
                    <TouchableOpacity style={{
                        width: 120,
                        backgroundColor: '#7EA8D0',
                        height: 45,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} onPress={() => {
                        this._onSubmitClick();
                    }}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>Xác
                            Nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                titleIOS={"Chọn Ngày Để Đặt Lịch"}
                cancelTextIOS="Xoá Bỏ"
                confirmTextIOS="Xác Nhận"
            />
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisibleTime}
                onConfirm={this._handleDatePickedTime}
                onCancel={this._hideDateTimePickerTime}
                titleIOS={"Chọn Giờ Để Đặt Lịch"}
                cancelTextIOS="Xoá Bỏ"
                confirmTextIOS="Xác Nhận"
                mode='time'
            />
        </ScrollContainer>)
    }
}

function mapStateToProps(state) {
    return {
        state: {...state.AppReducer}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...Actions.AppActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);