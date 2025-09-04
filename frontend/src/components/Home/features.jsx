import React from "react";
import { BadgeCheck, Search, Truck, Video } from "lucide-react";

const Features = () => {
  const features = [
    { id: 1, icon: <BadgeCheck size={32} />, text: "100% CERTIFIED" },
    { id: 2, icon: <Search size={32} />, text: "TRANSPARENCY" },
    { id: 3, icon: <Truck size={32} />, text: "FREE SHIPPING" },
    { id: 4, icon: <Video size={32} />, text: "VIDEO CONSULTATION" },
  ];

  return (
    <section className="bg-amber-500 text-white py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center divide-x divide-white/30">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center justify-center gap-2 px-4"
          >
            <div>{feature.icon}</div>
            <p className="text-sm font-semibold">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
