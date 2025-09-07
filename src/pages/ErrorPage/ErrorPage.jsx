import { Link, useRouteError } from 'react-router-dom';
import error from '../../assets/error.jpg';

const ErrorPage = () => {
     const error = useRouteError();
  console.error(error);

    return (
        <section className="bg-gradient-to-r from-red-400 to-red-500 px-6 py-8">
            <div className="container min-h-screen mx-auto flex flex-col lg:flex-row items-center justify-center">
                <div className="text-center lg:text-left lg:w-1/2 text-white">
                    <h1 className="text-5xl font-bold mb-4">Oops!</h1>
                    <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
                    <p className="text-lg mb-6">
                        The page you are looking for doesn't exist. But don't worry, you can go back home.
                    </p>
                    <Link
                        to="/"
                        className="btn text-xl font-semibold text-white bg-red-600 rounded-md transition-colors duration-300 hover:bg-red-700"
                    >
                        Go Back
                    </Link>
                </div>

                <div className="relative lg:w-1/2 mt-8 lg:mt-0">
                    <img
                        className="w-full h-80 md:h-96 lg:h-[38rem] object-cover rounded-lg shadow-xl"
                        src={error}
                        alt="Error Page"
                    />
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;