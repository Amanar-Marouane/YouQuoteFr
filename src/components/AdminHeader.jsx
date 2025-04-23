import Button from "./Button";
import LogoutBtn from "./LogoutBtn";

const AdminHeader = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-gray-800">YouQuote Admin</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button label={'Dashboard'} to={'/dashboard'} />
                        <Button label={'Quotes Management'} to={'/dashboard/quotes'} />
                        <LogoutBtn />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader; 