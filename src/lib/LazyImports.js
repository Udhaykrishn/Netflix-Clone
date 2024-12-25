import { lazy } from "react";

export const Lazy = {
    Home:lazy(()=>import("../pages/Home/Home")),
    Signup:lazy(()=>import("../pages/Signup/Signup")),
    Login:lazy(()=>import("../pages/Login/Login")),
    Player:lazy(()=>import("../pages/Player/Player"))
}