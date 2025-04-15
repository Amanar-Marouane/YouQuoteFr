import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/UserContext";

const LogoutBtn = () => {
    const { setIsIn } = useContext(Context);
    const navigate = useNavigate();
    const HOST = import.meta.env.VITE_HOST_BASE;

    const Logout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${HOST}/logout`, {
                credentials: 'include',
                method: 'POST',
            })

            if (response.status === 200) {
                setIsIn(false);
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form>
            <button type="submit" onClick={Logout} className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                Logout
            </button>
        </form>
    )
}

export default LogoutBtn