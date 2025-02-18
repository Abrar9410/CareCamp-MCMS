import { toast } from "react-toastify";


const Newsletter = () => {

    const handleSubscribe = e => {
        e.preventDefault();
        toast.success('Thank You for Subscribing to our Newsletter!', {
            position: "top-center",
            autoClose: 1500
        });
        e.target.reset();
    }

    return (
        <div className="w-11/12 sm:w-10/12 lg:w-3/4 xl:w-2/3 mx-auto my-12 p-4 md:p-8 rounded-2xl border border-primary bg-primary shadow-xl">
            <div className="rounded-2xl bg-blue-100 bg-cover bg-center border text-center py-10 md:py-14 px-4 md:px-8">
                <h2 className="text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Subscribe to our Newsletter</h2>
                <p className="text-pink-500 text-sm sm:text-base lg:text-xl mb-6">Get email notification whenever a new Camp is organized!</p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-4 items-center">
                    <input className="w-full px-4 sm:px-7 py-3 rounded-xl border-2 border-primary" type="email" name="" id="" placeholder="Enter your email" />
                    <input type="submit" value="Subscribe" className="w-full px-4 sm:px-7 py-3 rounded-xl text-primary font-bold bg-gradient-to-r from-pink-500 to-[#f8b500] cursor-pointer hover:scale-105"/>
                </form>
            </div>            
        </div>
    );
};

export default Newsletter;