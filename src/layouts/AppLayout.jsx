import Footer from '../components/Footer'
import Header from '../components/Header'

const AppLayout = ({ children }) => {

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