import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from '../../assets/lottie/loading.json';

const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <Player
                autoplay
                loop
                 src={loadingAnimation}
                style={{ height: "200px", width: "200px" }}
            />
        </div>
    );
};

export default Loading;