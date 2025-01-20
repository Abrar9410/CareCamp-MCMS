import emailjs from 'emailjs-com';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';
import { toast } from 'react-toastify';

const Contact = () => {

    const handleSubmit = e => {
        e.preventDefault();

        // Send the whole form data
        emailjs
            .sendForm(
                import.meta.env.VITE_EMAIL_SERVICE_ID,   // Your EmailJS service ID (e.g., Gmail)
                import.meta.env.VITE_EMAIL_TEMPLATE_ID,  // Your EmailJS template ID
                e.target,                                // The form itself
                import.meta.env.VITE_EMAIL_USER_ID       // Your EmailJS user ID (provided in your account)
            )
            .then(
                (result) => {
                    console.log(result.text);
                    toast.success('Email sent successfully!', {
                        position: "top-center",
                        autoClose: 1500
                    });
                    e.target.reset(); // Reset the form after submission
                },
                (error) => {
                    console.log(error.text);
                    toast.error('Error sending email. Please try again later.', {
                        position: "top-center",
                        autoClose: 1500
                    });
                }
            );
    };

    return (
        <div id="contact" className="bg-primary dark:bg-black my-8 py-16">
            <p className="w-10/12 lg:w-9/12 mx-auto text-white text-center text-xl mb-8">
                Have any query? Or facing a problem? Or perhaps you want to organize a Medical Camp!
                Feel free to reach out!
            </p>
            <div className="w-11/12 md:w-10/12 mx-auto flex flex-col sm:flex-row justify-between">
                <div className="flex flex-col items-center text-white w-full sm:w-1/2 p-8">
                    <p className="w-max text-center font-semibold text-lg min-[250px]:text-xl sm:text-2xl lg:text-3xl max-sm:mb-3 mb-6">Send Message</p>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full sm:max-w-[535px]">
                        <div className='w-full'>
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="userName"  // This is used by EmailJS to map to {{userName}} in the template
                                className="input input-bordered w-full bg-white text-black"
                                required
                            />
                        </div>
                        <div className='w-full'>
                            <input
                                type="email"
                                placeholder="Your Email"
                                name="userEmail"  // This is used by EmailJS to map to {{userEmail}} in the template
                                className="input input-bordered w-full bg-white text-black"
                                required
                            />
                        </div>
                        <div className='w-full'>
                            <textarea
                                placeholder="Message"
                                className="textarea textarea-bordered textarea-lg w-full bg-white text-black"
                                name="message"  // This is used by EmailJS to map to {{message}} in the template
                                required
                            ></textarea>
                        </div>
                        <input type="submit" value="Send Email" className='w-full p-3 text-white bg-green-500 dark:bg-primary font-semibold text-lg rounded-xl outline-none hover:scale-105 cursor-pointer' />
                    </form>
                </div>
                <div className="flex flex-col items-center text-white w-full sm:w-1/2 p-8">
                    <p className="w-max text-center font-semibold text-lg min-[250px]:text-xl sm:text-2xl lg:text-3xl max-sm:mb-3 mb-6">Contact Info.</p>
                    <div className="flex flex-col gap-4">
                        <p className="w-max text-sm min-[250px]:text-base lg:text-xl flex items-center gap-2">
                            <FaLocationDot />
                            <span>Cox's Bazar, Bangladesh</span>
                        </p>
                        <p className="w-max text-sm min-[250px]:text-base lg:text-xl flex items-center gap-2">
                            <FaPhoneAlt />
                            <span>+24567891234</span>
                        </p>
                        <p className="w-max text-sm min-[250px]:text-base lg:text-xl flex items-center gap-2">
                            <IoLogoWhatsapp className="text-green-600 bg-white rounded-full" />
                            <span>+24567891234</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;