import { Link } from "react-router-dom";
import logo from "../../assets/CareCamp_logo.png";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-primary p-8">
            <div className="sm: md: lg:w-2/3 mx-auto grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-0">
                <div className="flex flex-col max-sm:items-center max-sm:gap-2">
                    <div className="flex items-center">
                        <img className="w-6 sm:w-8 md:w-10 rounded-md" src={logo} alt="logo" />
                        <p className="min-[200px]:text-lg min-[320px]:text-xl lg:text-2xl text-white font-bold">CampCare</p>
                    </div>
                    <p className="text-white max-[200px]:text-sm text-center sm:text-start sm:pt-6">
                        Transforming Lives Through Thoughtful Planning and Seamless Medical Camp Management.
                    </p>
                </div>
                <div className="text-center">
                    <h6 className="text-white text-lg font-bold pb-2 sm:pb-4">Company</h6>
                    <ul className="text-white/70 font-light">
                        <Link to="/about-dev" className="hover:underline"><li>About Dev</li></Link>
                        <Link to="/contact" className="hover:underline"><li>Contact Us</li></Link>
                        <Link to="/contact" className="hover:underline"><li>Careers</li></Link>
                        <Link to="/contact" className="hover:underline"><li>Advertisement</li></Link>
                    </ul>
                </div>
                <div className="text-center">
                    <h6 className="text-white text-lg font-bold pb-2 sm:pb-4">Legal</h6>
                    <ul className="text-white/70 font-light">
                        <Link to="/terms-of-service" className="hover:underline"><li>Terms of Service</li></Link>
                        <Link to="/privacy-policy" className="hover:underline"><li>Privacy Policy</li></Link>
                        <Link to="/cookie-policy" className="hover:underline"><li>Cookie Policy</li></Link>
                    </ul>
                </div>
            </div>
            <div className="flex justify-center items-center gap-4 sm:gap-6 mt-8 bg-black w-max mx-auto p-1 rounded-md">
                <Link to="https://x.com/AbrarS896" target="_blank">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current text-blue-400">
                        <path
                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                </Link>
                <Link to="https://github.com/Abrar9410" target="_blank" className="text-2xl bg-white rounded-full">
                    <FaGithub />
                </Link>
                <Link to="https://www.facebook.com/profile.php?id=61551634958282" target="_blank">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current text-blue-500">
                        <path
                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                </Link>
            </div>
            <hr className="my-4 sm:my-8" />
            <p className="text-center text-xs min-[435px]:text-sm text-white/60">Copyright © {new Date().getFullYear()} - All rights reserved by TrendyTalks Ltd</p>
        </div>
    );
};

export default Footer;