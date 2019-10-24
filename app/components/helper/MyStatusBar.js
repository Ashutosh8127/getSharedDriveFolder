import React from 'react';
import { View, StatusBar, StyleSheet, Platform } from 'react-native';

const MyStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={[styles.statusBar, {backgroundColor}]}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
    }
})

MyStatusBar.defaultProps = {
    backgroundColor: "#00aeef",
    barStyle: "light-content"
}
export default MyStatusBar;