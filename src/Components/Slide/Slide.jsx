import { Link } from "react-router-dom";

const Slide = ({ text, image }) => {
    return (
        <div
            className='w-full bg-center bg-cover object-cover h-[400px]'
            style={{
                backgroundImage: `url(${image})`,
            }}
        >
            <div className='flex items-center justify-center w-full h-full'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold text-red-600 lg:text-4xl'>
                        {text}
                    </h1>
                    <br />
                    <div>
                        <Link
                            to='/login'
                            className='w-full px-5 py-2 mr-3 mt-4 text-sm font-medium text-white bg-red-400 rounded-full lg:w-auto hover:bg-red-300'
                        >
                            Join as a donor
                        </Link>
                        <Link
                            to='/search'
                            className='w-full px-5 py-2 mt-4 text-sm font-medium text-white bg-red-400 rounded-full lg:w-auto hover:bg-red-300'
                        >
                            Search Donors
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;