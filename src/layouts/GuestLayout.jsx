import { useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import { Context } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
const GuestLayout = ({ children }) => {
    const navigate = useNavigate();
    const { isIn } = useContext(Context);

    useEffect(() => {
        if (isIn) navigate('/home');
    }, [isIn]);

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