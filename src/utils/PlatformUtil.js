import {Platform, PixelRatio, Dimensions } from "react-native"

export default class PlatformUtil {
    static getDefaultValue(androidValue, iosValue) {
        if (Platform.OS == "android") {
            return androidValue;
        }
        return iosValue;
    }
    static isIphone5And5s() {
      var flag = false;
      if (Platform.OS == "ios") {
        var height = Dimensions.get('window').height * PixelRatio.get();
        var width = Dimensions.get('window').width * PixelRatio.get();
        if (height == '1136' && width == '640') {
          flag = true;

        }
      }
      return flag;
    }
}
