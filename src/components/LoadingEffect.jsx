const LoadingEffect = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="relative w-16 h-16 transform rotate-45">
                <div className="absolute top-0 left-0 w-5 h-5 m-0.5 bg-gray-900" style={{ animation: 'square-animation 10s ease-in-out infinite both', animationDelay: '0s' }}></div>
                <div className="absolute top-0 left-0 w-5 h-5 m-0.5 bg-gray-900" style={{ animation: 'square-animation 10s ease-in-out infinite both', animationDelay: '-1.4285714286s' }}></div>
                <div className="absolute top-0 left-0 w-5 h-5 m-0.5 bg-gray-900" style={{ animation: 'square-animation 10s ease-in-out infinite both', animationDelay: '-2.8571428571s' }}></div>
                <div className="absolute top-0 left-0 w-5 h-5 m-0.5 bg-gray-900" style={{ animation: 'square-animation 10s ease-in-out infinite both', animationDelay: '-4.2857142857s' }}></div>
                <div className="absolute top-0 left-0 w-5 h-5 m-0.5 bg-gray-900" style={{ animation: 'square-animation 10s ease-in-out infinite both', animationDelay: '-5.7142857143s' }}></div>
                <div className="absolute top-0 left-0 w-5 h-5 m-0.5 bg-gray-900" style={{ animation: 'square-animation 10s ease-in-out infinite both', animationDelay: '-7.1428571429s' }}></div>
                <div className="absolute top-0 left-0 w-5 h-5 m-0.5 bg-gray-900" style={{ animation: 'square-animation 10s ease-in-out infinite both', animationDelay: '-8.5714285714s' }}></div>
            </div>
            <style>
                {`
                    @keyframes square-animation {
                        0% { transform: translate(0, 0) rotate(0deg); }
                        25% { transform: translate(100%, 0) rotate(90deg); }
                        50% { transform: translate(100%, 100%) rotate(180deg); }
                        75% { transform: translate(0, 100%) rotate(270deg); }
                        100% { transform: translate(0, 0) rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default LoadingEffect;