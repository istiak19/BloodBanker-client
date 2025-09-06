import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logoPic from '../../assets/logo.png';

export default function Footer() {
    return (
        <footer className="bg-red-400 text-white pt-12 pb-6">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {/* Logo & Tagline */}
                    <div>
                        <div className="flex items-center gap-3">
                            <img
                                src={logoPic}
                                alt="BloodBanker Logo"
                                className="w-10 h-10 rounded-full bg-white p-1"
                            />
                            <h2 className="text-3xl font-bold">
                                <span className="text-black">Blood</span><span className="text-white">Banker</span>
                            </h2>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-gray-100">
                            Bridging donors and recipients to save lives and strengthen communities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            {["Home", "About Us", "Donate Now", "Contact"].map((item, idx) => (
                                <li key={idx}>
                                    <a href={`/${item.toLowerCase().replace(/\s+/g, '')}`} className="hover:text-black transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-3">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            {["FAQs", "Support", "Privacy Policy", "Terms of Service"].map((item, idx) => (
                                <li key={idx}>
                                    <a href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-black transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-3">Follow Us</h3>
                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <a href="https://facebook.com/BloodBanker" className="text-xl hover:text-black transition-colors">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com/BloodBanker" className="text-xl hover:text-black transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com/BloodBanker" className="text-xl hover:text-black transition-colors">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider & Copyright */}
                <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-gray-100">
                    © {new Date().getFullYear()} <span className="font-semibold text-black">BloodBanker</span>. All rights reserved.
                </div>
            </div>
        </footer>
    );
}