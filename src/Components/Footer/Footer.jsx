const Footer = () => {
    return (
        <footer className="footer md:px-16 px-5 *:text-white bg-red-400 items-center p-4">
            <aside className="grid-flow-col items-center">
                <p className="uppercase">Copyright © {new Date().getFullYear()} - All right reserved - By BloodBanker</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a>
                   <p>Get Support</p>
                </a>
                <a>
                <p><span></span>  Our Plugins</p>
                </a>
                <a>
                Our Themes
                </a>
            </nav>
        </footer>
    );
};

export default Footer;