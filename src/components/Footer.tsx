import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
    <section className="border-t-2 dark:border-gray-300 ">
        <div dir="ltr" className="max-w-screen-xl flex justify-between px-4 pb-8  mx-auto space-y-8 overflow-hidden sm:px-6 lg:px- fs:flex-col-reverse">
                
            <p dir="ltr" className="mt-8 text-base leading-6 font-normal text-center text-gray-400">
                © {new Date().getFullYear()} Abdelrahman Rageh 
            </p>
                
            <div className="flex justify-center mt-8 space-x-6">
                <a href="https://www.linkedin.com/in/abdelrahman-rageh/" className="text-gray-400 hover:text-gray-500" target="_blank">
                    <span className="sr-only">LinkedIn</span>
                    <FaLinkedin className="w-6 h-6" />
                </a>    
                <a href="https://github.com/abdelrahmanrageh" className="text-gray-400 hover:text-gray-500" target="_blank">
                    <span className="sr-only">GitHub</span>
                    <FaGithub className="w-6 h-6"/>
                </a>    
                <a href="https://www.facebook.com/abdelrahmanrageh99" className="text-gray-400 hover:text-gray-500" target="_blank">
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="w-6 h-6"/>
                </a>
                
            </div>
            
        </div>
    </section>
    );
}