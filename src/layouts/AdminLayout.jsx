import { useContext, useEffect, useState } from "react"
import AppLayout from "./AppLayout"
import { Context } from "../context/UserContext"
import Error404 from "../components/errors/Error404";
import { useNavigate } from "react-router-dom";
import LoadingEffect from "../components/LoadingEffect";
import AdminHeader from "../components/AdminHeader";

const AdminLayout = ({ children }) => {
    const { userIsRole, user, isIn } = useContext(Context);
    const navigate = useNavigate();
    const [access, setAccess] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isIn) {
            navigate('/login');
            return;
        }

        const checkAccess = async () => {
            const isAdmin = userIsRole('Admin');
            setAccess(isAdmin);
            setLoading(false);

            if (!isAdmin) {
                navigate('/home');
            }
        };

        checkAccess();
    }, [userIsRole, user, isIn]);

    if (loading) {
        return <LoadingEffect />;
    }

    if (!access) {
        return <Error404 backTo={'/home'} />;
    }

    return (
        <AppLayout Header={AdminHeader}>
            {children}
        </AppLayout>
    )
}

export default AdminLayout