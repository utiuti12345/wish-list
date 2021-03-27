import React from "react";
import {NavigationContainer,NavigationState} from "@react-navigation/native";

import MainRoutes from "./Main";

export default function LoggingRoutes() {
    return (
        <NavigationContainer>
            <MainRoutes/>
        </NavigationContainer>
    )
}
