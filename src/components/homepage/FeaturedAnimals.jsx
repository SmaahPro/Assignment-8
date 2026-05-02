"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Calendar, Weight, Eye } from "lucide-react";

const FeaturedAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await fetch('/allanimals.json');
                const data = await response.json();

                const cows = data.filter(animal => animal.type === "Cow").slice(0, 2);
                const goats = data.filter(animal => animal.type === "Goat").slice(0, 1);
                const sheeps = data.filter(animal => animal.type === "Sheep").slice(0, 1);

                const featured = [...cows, ...goats, ...sheeps];
                setAnimals(featured);
            } catch (error) {
                console.error("Error loading animals:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnimals();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    if (loading) {
        return (
            <div className="py-12">
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
            </div>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs text-emerald-400 font-medium">Featured Collection</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Featured <span className="text-emerald-400">Animals</span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-2">
                        Specially selected premium animals for your Qurbani
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {animals.map((animal) => (
                        <div key={animal.id} className="group bg-slate-900 rounded-xl overflow-hidden border border-black hover:border-black transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">

                            <div className="relative h-56 overflow-hidden bg-slate-800">
                                <img
                                    src={animal.image}
                                    alt={animal.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-0.5 rounded-full bg-black/70 text-white text-xs">
                                        {animal.type}
                                    </span>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${animal.category === "Large Animal"
                                        ? "bg-red-500/80 text-white"
                                        : animal.category === "Medium Animal"
                                            ? "bg-amber-500/80 text-white"
                                            : "bg-emerald-500/80 text-white"
                                        }`}>
                                        {animal.category === "Large Animal" ? "Large" : animal.category === "Medium Animal" ? "Medium" : "Small"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-bold text-white mb-1 truncate">
                                    {animal.name}
                                </h3>

                                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                                    <MapPin size={11} />
                                    <span>{animal.location}</span>
                                    <Calendar size={11} className="ml-1" />
                                    <span>{animal.age}y</span>
                                    <Weight size={11} className="ml-1" />
                                    <span>{animal.weight}kg</span>
                                </div>

                                <div className="text-emerald-400 font-bold text-lg mb-4">
                                    BDT {formatPrice(animal.price)}
                                </div>

                                <Link href={`/details-page/${animal.id}`}>
                                    <button className="w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-emerald-500 rounded-lg text-white text-sm font-medium transition-all duration-300">
                                        <Eye size={14} />
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedAnimals;