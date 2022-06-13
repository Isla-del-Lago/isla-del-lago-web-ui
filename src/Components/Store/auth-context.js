import React from "react";
const AuthContext = React.createContext({
    userLoginState: false,
    onLogout: () => {}
})
export default AuthContext