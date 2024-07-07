import { StyleSheet } from "react-native";

export const loginScreenStyles = StyleSheet.create({
    SignInImage: {
        width: "50%",
        height: 150,
        alignSelf: "center",
        marginTop: 30
    },
    welcomeText: {
        textAlign: "center",
        fontSize: 24
    },
    loginText: {
        textAlign: "center",
        fontSize: 15,
        marginTop: 5,
        color: "#575757"
    },
    inputContainer: {
        marginHorizontal: 16,
        marginTop: 20,
        rowGap: 20
    },
    visibleIcon: {
        position: "absolute",
        right: 30,
        top: 15
    },
    icon: {
        position: "absolute",
        left: 24,
        top: 18,
        marginTop: -2
    },
    errorText: {
        color: "red",
        fontSize: 11,
        marginTop: -1
    },
    forgotSection: {
        marginHorizontal: 16,
        textAlign: "right",
        fontSize: 16,
        marginTop: -20,
        textDecorationLine: "underline"
    },
    signUpRedirect: {
        flexDirection: "row",
        marginHorizontal: 16,
        justifyContent: "center",
        marginBottom:  20
    }
})