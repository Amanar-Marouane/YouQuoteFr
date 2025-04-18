import { useContext, useEffect, useState } from "react"
import AppLayout from "./AppLayout"
import { Context } from "../context/UserContext"
import Error404 from "../components/errors/Error404";

const AdminLayout = ({ children }) => {
    const { userIsRole, user } = useContext(Context);
    const [access, setAccess] = useState(true);

    useEffect(() => {
        setAccess(userIsRole('Admin'));
    }, [user]);

    if (!access) {
        return <Error404 backTo={'/home'} />
    }

    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}

export default AdminLayout