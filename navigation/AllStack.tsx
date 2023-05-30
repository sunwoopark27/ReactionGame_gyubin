import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Game from "../screens/Game";
import Home from "../screens/Home";
const NativeStack = createNativeStackNavigator();

const HomeStack = () => {
    return(
        <NativeStack.Navigator
            screenOptions={{
                presentation: "card",
                contentStyle: { backgroundColor: "white" },
                headerTitleAlign: "center",
                headerTitleStyle: {  fontSize: 16 },
            }}
        >
            <NativeStack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }
                }
            />
            <NativeStack.Screen
                name="Game"
                component={Game}
                options={{
                    headerShown: false
                }
                }
            />
        </NativeStack.Navigator>
    )
}

export default HomeStack;
