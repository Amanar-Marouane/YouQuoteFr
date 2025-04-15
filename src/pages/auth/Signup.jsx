import Input from "../../components/Input"
import GuestLayout from "../../layouts/GuestLayout"
import SubmitButton from "../../components/SubmitButton"
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const HOST = import.meta.env.VITE_HOST_BASE;

    const SubmitHandle = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch(`${HOST}/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });

            if (response.status === 201 && response.status === 403) {
                navigate('/profile');
                return;
            };

            const res = await response.json();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <GuestLayout>
            <section className="flex justify-center items-center flex-col w-full max-w-md mx-auto space-y-8 p-6 h-full">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Sign Up For Free</h1>
                <p className="text-gray-600 text-center">Join our community and start exploring amazing quotes</p>

                <form onSubmit={SubmitHandle} className="w-full space-y-6">
                    <Input type={'text'} name={'name'} label={'Full Name'} placeholder={'Enter your full name'} />
                    <Input type={'email'} name={'email'} label={'Email Address'} placeholder={'Enter your email address'} />
                    <Input type={'password'} name={'password'} label={'Password'} placeholder={'Enter a secure password'} />
                    <Input type={'password'} name={'password_confirmation'} label={'Password Confirmation'} placeholder={'Confirm your password'} />

                    <SubmitButton>
                        Create Account
                    </SubmitButton>
                </form>

                <p className="text-gray-600 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Sign in here
                    </Link>
                </p>
            </section>
        </GuestLayout>
    )
}

export default Signup