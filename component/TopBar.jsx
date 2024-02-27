import React, {useCallback} from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from "react-native";
import {useFonts} from "expo-font";

const fonts = {
    'Chillax-regular': "https://api.fontshare.com/v2/css?f[]=chillax@400&display=swap"
}
function TopBar(props) {
    const [fontsLoaded] = useFonts({
        'Chillax': require("../assets/fonts/Chillax-Regular.otf"),
    })

    if (fontsLoaded) {
        return (
            <View style={styles.topBar}>
                <Image style={styles.img} source={require("../assets/logo_flowy.png")} />
                <Text style={styles.title}>Flowy</Text>
            </View>
        );
    } else {
        return null;
    }
}


const styles = StyleSheet.create({
    topBar: {
        top: 0,
        width: "100%",
        backgroundColor: "#00171f",
        height: Dimensions.get('window').height * 0.13,
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        paddingTop: 50,
    },
    img: {
        width: 64,
        height: 64,
    },
    title: {
        fontSize: 24,
        color: "#fff",
        paddingRight:20,
        fontFamily: 'Chillax',
    }

})
export default TopBar;