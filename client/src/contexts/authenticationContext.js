import React from "react";

const authenticationContext = React.createContext("");

const AuthenticationProvider = authenticationContext.Provider;
const AuthenticationConsumer = authenticationContext.Consumer;

export { AuthenticationProvider, AuthenticationConsumer };
