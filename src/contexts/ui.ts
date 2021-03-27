import React from "react";

export enum Status {
    LOADING = 'loading',
    FIRST_OPEN = 'firstOpen',
    UN_AUTHORIZED = 'unAuthorized',
    AUTHORIZED = 'authorized',
}

export function createApplicationState():Status {
    return Status.AUTHORIZED;
}

export const Context = React.createContext({
    applicationState:createApplicationState(),
    setApplicationState:(_:Status) => {},
});
