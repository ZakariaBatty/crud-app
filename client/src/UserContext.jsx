import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    const checkAndSetUser = async () => {

        try {
            const response = await axios.get("/profile");
            const userData = response.data;
            setUser(userData.user);
            setReady(true);

            Cookies.set("user", JSON.stringify(userData.user), { expires: 7 });
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        checkAndSetUser();
    }, []); // Empty dependency array ensures it only runs once on mount

    const logout = async () => {
        try {
            await axios.post("/logout");
            setUser(null);
            setReady(false);
            navigate("/login")
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, ready, logout }}>
            {children}
        </UserContext.Provider>
    );
}
