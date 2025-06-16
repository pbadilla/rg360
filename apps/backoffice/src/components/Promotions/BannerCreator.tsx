import React, { useState } from "react";
import BannerPreview from "./BannerPreview";
import ControlPanel from "./ControlPanel";
import { BannerData } from "@/types/banner";

const BannerCreator = () => {
  const [bannerData, setBannerData] = useState<BannerData>({
    backgroundImage:
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop",
    title: "Summer Sale",
    subtitle: "Up to 50% Off Everything",
    titleColor: "#ffffff",
    subtitleColor: "#f1f5f9",
    backgroundColor: "#1e293b",
    titleSize: 48,
    subtitleSize: 24,
    titleFont: "Inter",
    subtitleFont: "Inter",
    width: 800,
    height: 400,
    titlePosition: { x: 50, y: 40 },
    subtitlePosition: { x: 50, y: 60 },
  });

  const updateBannerData = (updates: Partial<BannerData>) => {
    setBannerData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Banner Promotion Creator
          </h1>
          <p className="text-slate-300 text-lg">
            Create stunning promotional banners with our intuitive editor
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BannerPreview bannerData={bannerData} />
          </div>
          <div className="lg:col-span-1">
            <ControlPanel
              bannerData={bannerData}
              updateBannerData={updateBannerData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCreator;
