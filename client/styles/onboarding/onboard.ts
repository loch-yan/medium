import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    // height: 300,
    marginTop: 150
  },
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp('30%'),
    height: hp('19%'),
  },
  titleWrapper: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: hp('4%'),
    textAlign: 'center',
  },
  textDescWrapper: {
    marginTop: 10
  },
  textDsc: {
    textAlign: "center",
    color: "gray",
    fontSize: hp("2%")
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  buttonWrapper: {
    width:wp("92%"),
    paddingVertical:18,
    borderRadius: 4,
    marginTop: 40,
    backgroundColor: "#5d8fd8"
  }
});