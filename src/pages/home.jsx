import React from "react";
import PrincipalBillInfoForm from "../components/principal-bill-info-form";
// import { BrowserRouter, Switch, Route } from "react-router-dom";

class Home extends React.Component{
    render(){
        return(
            <div>
                <PrincipalBillInfoForm/>
            </div>
        )
    }
}
export default Home;