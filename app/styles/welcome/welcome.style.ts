import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

export const welcomeStyles =  StyleSheet.create({
    slideImage: {
        alignSelf: "center",
        marginBottom: 30,
        width: "100%",
        height: hp("35.2%")

    }
})