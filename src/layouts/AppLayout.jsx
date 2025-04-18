import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useContext, useEffect } from 'react';
import { Context } from '../context/UserContext';

const AppLayout = ({ children }) => {
    const navigate = useNavigate();
    const { isIn } = useContext(Context);

    useEffect(() => {
        if (!isIn) navigate('/login');
    }, [isIn]);

    return (
        <>
            <Header />
            <main className='min-h-[87vh] px-12 py-6 flex justify-center items-start'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default AppLayout