import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from '../../assets/lottie/loading.json';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-red-50 text-red-600">
            {/* Loading Lottie */}
            <Player
                autoplay
                loop
                src={loadingAnimation}
                style={{ height: "220px", width: "220px" }}
            />

            {/* Blood Bank Related Text */}
            <h2 className="mt-6 text-2xl font-semibold animate-pulse">
                Saving Lives... Please Wait 🩸
            </h2>

            {/* Progress bar feeling */}
            <div className="mt-4 w-48 h-2 bg-red-200 rounded-full overflow-hidden">
                <div className="w-24 h-full bg-red-500 animate-ping"></div>
            </div>
        </div>
    );
};

export default Loading;