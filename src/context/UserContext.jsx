import { createContext, useEffect, useState } from "react"
import LoadingEffect from "../components/LoadingEffect";

export const Context = createContext('');

const UserContext = ({ children }) => {
    const HOST = import.meta.env.VITE_HOST_BASE;
    const [user, setUser] = useState(null);
    const [isIn, setIsIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const Request = async () => {
        try {
            const response = await fetch(`${HOST}/islogged`, {
                credentials: 'include',
            });

            const res = await response.json();

            setUser(res.data.user);
            setIsIn(res.data.authenticated);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Request();
    }, []);

    const userIsRole = (role) => {
        return user?.role === role;
    };

    const value = { user, isIn, setIsIn, userIsRole };

    if (loading) {
        return <LoadingEffect />
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default UserContext