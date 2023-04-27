import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {View} from "react-native";
import Root from "./navigation/Root";

const RootNavigation = () => {
    return (
        <View style={{ flex: 1 }} >
            <Root />
        </View>
    );
}


const App = () => {
    return (
        <NavigationContainer independent={true}>
            <RootNavigation />
        </NavigationContainer>
    );
};

export default App;
