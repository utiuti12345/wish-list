import React from "react";
import {DefaultTheme, NavigationContainer, NavigationState} from "@react-navigation/native";
import { useTheme } from '@react-navigation/native';

import MainRoutes from "./Main";
import {COLOR} from "../constants/theme";

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: COLOR.BLACK,
    },
};

export default function LoggingRoutes() {
    return (
        <NavigationContainer theme={MyTheme}>
            <MainRoutes/>
        </NavigationContainer>
    )
}
