import { useContext, useEffect, useState } from "react"
import AppLayout from "./AppLayout"
import { Context } from "../context/UserContext"
import Error404 from "../components/errors/Error404";
import Header from "../components/Header";
const UserLayout = ({ children }) => {
    const { userIsRole, user } = useContext(Context);
    const [access, setAccess] = useState(true);

    useEffect(() => {
        setAccess(userIsRole('User'));
    }, [userIsRole, user]);

    if (!access) {
        return <Error404 backTo={'/dashboard'} />
    }

    return (
        <AppLayout Header={Header}>
            {children}
        </AppLayout>
    )
}

export default UserLayout
