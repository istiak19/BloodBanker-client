import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logoPic from '../../assets/logo.png';

export default function Footer() {
    return (
        <footer className="bg-red-400 *:text-white pt-12 pb-6">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {/* Logo & Tagline */}
                    <div>
                        <div className="flex items-center gap-3">
                            <img
                                src={logoPic}
                                alt="BloodBanker Logo"
                                className="w-10 h-10"
                            />
                            <h2 className="text-3xl font-bold text-black">BloodBanker</h2>
                        </div>
                        <p className="mt-3 text-gray-100 text-sm leading-relaxed">
                            Bridging donors and recipients to save lives and strengthen communities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg  text-black font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/" className="hover:text-red-500 transition-colors">Home</a>
                            </li>
                            <li>
                                <a href="/about" className="hover:text-red-500 transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="/bloodDPublic" className="hover:text-red-500 transition-colors">Donate Now</a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-red-500 transition-colors">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg text-black font-semibold mb-3">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/faqs" className="hover:text-red-500 transition-colors">FAQs</a>
                            </li>
                            <li>
                                <a href="/support" className="hover:text-red-500 transition-colors">Support</a>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="hover:text-red-500 transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/terms" className="hover:text-red-500 transition-colors">Terms of Service</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-3">Follow Us</h3>
                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <a href="https://facebook.com/BloodBanker" className="text-xl hover:text-red-500 transition-colors">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com/BloodBanker" className="text-xl hover:text-red-500 transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com/BloodBanker" className="text-xl hover:text-red-500 transition-colors">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider & Copyright */}
                <div className="mt-10 text-center text-sm text-gray-100">
                    © {new Date().getFullYear()} <span className="font-semibold text-black">BloodBanker</span>. All rights reserved.
                </div>
            </div>
        </footer>
    );
}