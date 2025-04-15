import { createContext, useEffect, useState } from "react"

export const Context = createContext('');

const UserContext = ({ children }) => {
    const HOST = import.meta.env.VITE_HOST_BASE;
    const [user, setUser] = useState(null);
    const [isIn, setIsIn] = useState(false);
    const value = { user, isIn, setIsIn };

    const Request = async () => {
        try {
            const response = await fetch(`${HOST}/islogged`, {
                credentials: 'include',
            });

            const res = await response.json();

            setUser(res.data['user']);
            setIsIn(res.data['authenticated']);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Request();
    }, []);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default UserContext