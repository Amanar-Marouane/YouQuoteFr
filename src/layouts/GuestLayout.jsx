import { useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import { Context } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const GuestLayout = ({ children }) => {
    const navigate = useNavigate();
    const { isIn, userIsRole } = useContext(Context);

    useEffect(() => {
        if (isIn) {
            if (userIsRole('admin')) {
                navigate('/dashboard');
            } else {
                navigate('/home');
            }
        }
    }, [isIn, userIsRole]);

    return (
        <>
            <main className='h-[94vh] px-12 py-6 flex justify-center items-start'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default GuestLayout