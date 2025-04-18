import { useContext, useEffect, useState } from "react"
import AppLayout from "./AppLayout"
import { Context } from "../context/UserContext"
import Error404 from "../components/errors/Error404";

const UserLayout = ({ children }) => {
    const { userIsRole, user } = useContext(Context);
    const [access, setAccess] = useState(true);

    useEffect(() => {
        setAccess(userIsRole('User'));
    }, [user]);

    if (!access) {
        return <Error404 backTo={'/'} />
    }

    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}

export default UserLayout
