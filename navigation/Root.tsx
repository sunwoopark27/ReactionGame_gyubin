import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Host } from "react-native-portalize";
import AllStack from "./AllStack";
const Nav = createNativeStackNavigator();

const Root = () => {

    return (
        <Host
            children={
                <Nav.Navigator
                    screenOptions={{
                        presentation: "card",
                        headerShown: false,
                    }}
                >
                    <Nav.Screen name="AllStack" component={AllStack} />
                </Nav.Navigator>
            }
        ></Host>
    );
};
export default Root;
