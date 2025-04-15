import { useContext } from "react";
import { Context } from "../../context/UserContext";
import AppLayout from "../../layouts/AppLayout";

const Index = () => {
    const { user } = useContext(Context);

    return (
        <AppLayout>
            <section className="h-[30vh] flex items-center justify-center bg-gray-100 w-full">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-[90%]">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h2>
                    <div className="text-gray-600 space-y-2">
                        <p><strong>Name:</strong> {user ? user.name : 'Loading ...'}</p>
                        <p><strong>Email:</strong> {user ? user.email : 'Loading ...'}</p>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Index;
