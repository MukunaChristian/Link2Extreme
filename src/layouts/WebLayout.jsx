import { Outlet } from "react-router";
import NavBar from "./NavBar";
import BottomNav from "../layouts/BottomNav"

export default function WebLayout() {
    return (
        <>
        <NavBar />
        <Outlet />
        <BottomNav/>
        </>
    );
}