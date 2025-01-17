import { Link } from 'react-router-dom';
import error from '../../assets/error.jpg';

const ErrorPage = () => {
    return (
        <section className='bg-red-400 px-60'>
            <div className='container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12'>
                <div className='wf-ull lg:w-1/2 *:text-white'>
                    <h1>Oops!</h1>
                    <p className='mt-4'>Sorry, an unexpected error has occurred.</p>
                    <p className='mt-4'>
                        Sorry, the page you are looking for doesn't exist. Here are some helpful link:
                    </p>

                    <div className='mt-6'>
                        <Link
                            to='/'
                            className='w-1/2 px-5 py-2 text-sm tracking-wide text-black transition-colors duration-200 bg-red-100  rounded-lg shrink-0 sm:w-auto hover:bg-red-500 hover:text-white'
                        >
                            Take me home page
                        </Link>
                    </div>
                </div>

                <div className='relative w-full mt-8 lg:w-1/2 lg:mt-0'>
                    <img
                        className=' w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover '
                        src={error}
                        alt='Error Page'
                    />
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;