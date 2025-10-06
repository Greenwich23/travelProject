import { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function SharedLayout() {
    const [bars, barsClicked] = useState(false)


    function barsDropDown() {
        barsClicked((bar) => !bar )
    }
    return (
        <div>
            <Navbar barsValue={bars} barsFunction={barsClicked}/>
            <Outlet/>
            <Footer/>
        </div>
    )
}