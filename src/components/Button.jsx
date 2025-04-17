import { Link } from "react-router-dom"

const Button = ({ label, to }) => {
    return (
        <Link to={to}>
            <button className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                {label}
            </button>
        </Link>
    )
}

export default Button