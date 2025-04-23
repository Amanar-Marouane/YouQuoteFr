import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import { useContext, useEffect } from 'react';
import { Context } from '../context/UserContext';

const AppLayout = ({ children, Header }) => {
    const navigate = useNavigate();
    const { isIn, userIsRole } = useContext(Context);

    useEffect(() => {
        if (!isIn) {
            navigate('/login');
            return;
        }

        if (userIsRole('admin') && !window.location.pathname.startsWith('/dashboard')) {
            navigate('/dashboard');
        }
    }, [isIn, userIsRole]);

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