import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

export const commonStyles =  StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        backgroundColor: "#2467ec",
        width: wp(88),
        height: hp(5.5),
        borderRadius: 5,
        marginHorizontal: 2,
        marginBottom: 4,
        margin: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    dotStyle: {
        width: wp(2.5),
        // height: hp(2.5),
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: "gray"
    },
    activeDot: {
        width: wp(2.5),
        // height: hp(2.5),
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: "#2467ec"
    },
    title: {
        fontSize: hp("3.5%"),
        textAlign: "center"
    },
    description: {
        fontSize: hp("2.5%"),
        textAlign: "center",
        color: "#575757"
    },
    welcomeStyleButton: {
        backgroundColor: "#2467ec",
        width: wp(80),
        height: hp(5.5),
        alignSelf:"center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    input: {
        marginHorizontal: 16,
        height: 55,
        borderRadius: 8,
        paddingLeft: 35,
        fontSize: 16,
        backgroundColor: "white",
        color: "#a1a1a1"
    },
    erroContainer: {
        position:"absolute",
        top: 60,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16
    }
})