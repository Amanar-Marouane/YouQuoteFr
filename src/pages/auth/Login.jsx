import { useContext } from 'react'
import Input from "../../components/Input"
import GuestLayout from "../../layouts/GuestLayout"
import SubmitButton from "../../components/SubmitButton"
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../context/UserContext'

const Login = () => {
    const navigate = useNavigate();
    const { setIsIn } = useContext(Context);
    const HOST = import.meta.env.VITE_HOST_BASE;

    const SubmitHandle = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            const response = await fetch(`${HOST}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });

            if (response.status === 200 || response.status === 403) {
                setIsIn(true);
                navigate('/home');
                return;
            }

            const res = await response.json();
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <GuestLayout>
            <section className="flex justify-center items-center flex-col w-full max-w-md mx-auto space-y-8 p-6 h-full">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h1>
                <p className="text-gray-600 text-center">Sign in to continue exploring amazing quotes</p>

                <form onSubmit={SubmitHandle} className="w-full space-y-6">
                    <Input type={'email'} name={'email'} label={'Email Address'} placeholder={'Enter your email address'} />
                    <Input type={'password'} name={'password'} label={'Password'} placeholder={'Enter your password'} />

                    <SubmitButton>
                        Sign In
                    </SubmitButton>
                </form>

                <p className="text-gray-600 text-center">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Sign up here
                    </Link>
                </p>
            </section>
        </GuestLayout>
    )
}

export default Login