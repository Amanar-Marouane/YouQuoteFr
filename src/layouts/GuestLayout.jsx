import Footer from '../components/Footer'

const GuestLayout = ({ children }) => {
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