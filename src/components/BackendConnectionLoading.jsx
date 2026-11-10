import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";


const BackendConnectionLoading = () => {
    const { isServerConnected } = useContext(AppContext)

    if (isServerConnected) {
        document.body.style.overflow = 'unset';
        return
    }
    
    useEffect(() => { // use for block scroll of the page of when login is open 
        // setTimeout(() => {
            document.body.style.overflow = 'hidden';
        // },);
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, []);


    return (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/30 backdrop-blur-[3px] px-4">
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-white/60 bg-white/90 px-10 py-9 shadow-2xl backdrop-blur-xl">
                
                    <>
                        {/* Animated connection icon */}
                        <div className="relative flex h-20 w-20 items-center justify-center">
                            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400/20" />

                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                                <svg
                                    className="h-8 w-8 animate-pulse"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M8.5 16.5a5 5 0 017 0M5 13a10 10 0 0114 0m-17-3a15 15 0 0120 0M12 21h.01"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-xl font-bold text-slate-800">
                                Connecting to server
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Our server is waking up. Please wait...
                            </p>
                        </div>

                        {/* Animated loading dots */}
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600" />
                        </div>

                        <p className="text-xs font-medium tracking-wide text-slate-400">
                            THIS MAY TAKE A FEW SECONDS
                        </p>
                    </>
                

                {/* {!isServerLoading && !isServerConnected &&
                    <>
                        <div className="relative flex h-20 w-20 items-center justify-center">

                            {!isServerConnected && !isServerLoading &&<div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-500/30">
                                <svg
                                    className="h-8 w-8 "
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M8.5 16.5a5 5 0 017 0M5 13a10 10 0 0114 0m-17-3a15 15 0 0120 0M12 21h.01"
                                    />
                                </svg>
                            </div>}
                        </div>

                        <div className="text-center">
                            <h2 className="text-xl font-bold text-slate-800">
                                Connection failed
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Please try after some time
                            </p>
                        </div>

                    </>
                } */}
            </div>
        </div>

    )
}

export default BackendConnectionLoading;