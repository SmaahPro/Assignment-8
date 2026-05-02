"use client";

import { useEffect } from "react";
import "animate.css";

const HambaMubarakAnimation = ({ onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, 3500);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate__animated animate__fadeIn animate__faster">
            <div className="text-center p-8 bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl border border-gray-700 shadow-2xl max-w-sm w-full mx-4 animate__animated animate__zoomIn animate__delay-0.2s">

                <div className="text-7xl animate__animated animate__bounceInDown animate__slow">
                    🐑
                </div>

                <h1 className="text-white text-2xl mt-6 font-extrabold tracking-wide bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent animate__animated animate__pulse animate__infinite animate__slow">
                    Hamba Mubarak 🎉
                </h1>

                <p className="text-gray-400 mt-3 text-lg font-medium animate__animated animate__fadeInUp animate__delay-1s">
                    Qurbani Eid Vibes ✨
                </p>

                <div className="flex justify-center mt-6 space-x-1.5 animate__animated animate__flash animate__infinite">
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                </div>
            </div>
        </div>
    );
};

export default HambaMubarakAnimation;