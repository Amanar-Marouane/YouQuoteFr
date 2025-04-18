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
            <style jsx>{`
         @keyframes square-animation {
           0% { left: 0; top: 0; }
           10.5% { left: 0; top: 0; }
           12.5% { left: 20px; top: 0; }
           23% { left: 20px; top: 0; }
           25% { left: 40px; top: 0; }
           35.5% { left: 40px; top: 0; }
           37.5% { left: 40px; top: 20px; }
           48% { left: 40px; top: 20px; }
           50% { left: 20px; top: 20px; }
           60.5% { left: 20px; top: 20px; }
           62.5% { left: 20px; top: 40px; }
           73% { left: 20px; top: 40px; }
           75% { left: 0; top: 40px; }
           85.5% { left: 0; top: 40px; }
           87.5% { left: 0; top: 20px; }
           98% { left: 0; top: 20px; }
           100% { left: 0; top: 0; }
         }
       `}</style>
        </div>
    )
}

export default LoadingEffect