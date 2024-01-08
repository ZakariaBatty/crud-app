import { useContext } from "react"
import { UserContext } from "../../UserContext"

import Booking from "../listing/Booking";
import LoginPage from "../auth/LoginPage";


export default function BookingsPage() {
    const { ready } = useContext(UserContext);
    console.log("data ready", ready)
    return (
        <div>
            <div className="p-4">
                {!ready ? (<LoginPage />) : (<Booking />)}
            </div>
        </div>
    )
}