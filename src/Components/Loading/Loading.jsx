import { Player } from "@lottiefiles/react-lottie-player";

const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <Player
                autoplay
                loop
                src="/assets/lottie/loading.json"
                style={{ height: "200px", width: "200px" }}
            />
        </div>
    );
};

export default Loading;