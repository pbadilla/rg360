import type React from "react";

import { Move, Palette, Settings, Type, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { BannerData } from "@/types/banner";

interface ControlPanelProps {
  bannerData: BannerData;
  updateBannerData: (updates: Partial<BannerData>) => void;
}

const ControlPanel = ({ bannerData, updateBannerData }: ControlPanelProps) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateBannerData({ backgroundImage: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const presetImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        Customize Banner
      </h2>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content" className="flex items-center gap-1">
            <Type size={14} />
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-1">
            <Upload size={14} />
          </TabsTrigger>
          <TabsTrigger value="style" className="flex items-center gap-1">
            <Palette size={14} />
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-1">
            <Settings size={14} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4 mt-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={bannerData.title}
              onChange={(e) => updateBannerData({ title: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={bannerData.subtitle}
              onChange={(e) => updateBannerData({ subtitle: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Title Font Size: {bannerData.titleSize}px</Label>
            <Slider
              value={[bannerData.titleSize]}
              onValueChange={([value]) =>
                updateBannerData({ titleSize: value })
              }
              max={72}
              min={12}
              step={2}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Subtitle Font Size: {bannerData.subtitleSize}px</Label>
            <Slider
              value={[bannerData.subtitleSize]}
              onValueChange={([value]) =>
                updateBannerData({ subtitleSize: value })
              }
              max={48}
              min={10}
              step={2}
              className="mt-2"
            />
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4 mt-6">
          <div>
            <Label htmlFor="image-upload">Upload Image</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Preset Images</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {presetImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => updateBannerData({ backgroundImage: img })}
                  className="aspect-video bg-cover bg-center rounded border-2 border-transparent hover:border-blue-500 transition-all"
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="style" className="space-y-4 mt-6">
          <div>
            <Label htmlFor="title-color">Title Color</Label>
            <Input
              id="title-color"
              type="color"
              value={bannerData.titleColor}
              onChange={(e) => updateBannerData({ titleColor: e.target.value })}
              className="mt-1 h-10"
            />
          </div>

          <div>
            <Label htmlFor="subtitle-color">Subtitle Color</Label>
            <Input
              id="subtitle-color"
              type="color"
              value={bannerData.subtitleColor}
              onChange={(e) =>
                updateBannerData({ subtitleColor: e.target.value })
              }
              className="mt-1 h-10"
            />
          </div>

          <div>
            <Label htmlFor="bg-color">Overlay Color</Label>
            <Input
              id="bg-color"
              type="color"
              value={bannerData.backgroundColor}
              onChange={(e) =>
                updateBannerData({ backgroundColor: e.target.value })
              }
              className="mt-1 h-10"
            />
          </div>

          <div>
            <Label>Font Family</Label>
            <Select
              value={bannerData.titleFont}
              onValueChange={(value) =>
                updateBannerData({ titleFont: value, subtitleFont: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Poppins">Poppins</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Playfair Display">
                  Playfair Display
                </SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4 mt-6">
          <div>
            <Label>Banner Width: {bannerData.width}px</Label>
            <Slider
              value={[bannerData.width]}
              onValueChange={([value]) => updateBannerData({ width: value })}
              max={1200}
              min={400}
              step={50}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Banner Height: {bannerData.height}px</Label>
            <Slider
              value={[bannerData.height]}
              onValueChange={([value]) => updateBannerData({ height: value })}
              max={800}
              min={200}
              step={50}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Title Position X: {bannerData.titlePosition.x}%</Label>
            <Slider
              value={[bannerData.titlePosition.x]}
              onValueChange={([value]) =>
                updateBannerData({
                  titlePosition: { ...bannerData.titlePosition, x: value },
                })
              }
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Title Position Y: {bannerData.titlePosition.y}%</Label>
            <Slider
              value={[bannerData.titlePosition.y]}
              onValueChange={([value]) =>
                updateBannerData({
                  titlePosition: { ...bannerData.titlePosition, y: value },
                })
              }
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Subtitle Position X: {bannerData.subtitlePosition.x}%</Label>
            <Slider
              value={[bannerData.subtitlePosition.x]}
              onValueChange={([value]) =>
                updateBannerData({
                  subtitlePosition: {
                    ...bannerData.subtitlePosition,
                    x: value,
                  },
                })
              }
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Subtitle Position Y: {bannerData.subtitlePosition.y}%</Label>
            <Slider
              value={[bannerData.subtitlePosition.y]}
              onValueChange={([value]) =>
                updateBannerData({
                  subtitlePosition: {
                    ...bannerData.subtitlePosition,
                    y: value,
                  },
                })
              }
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ControlPanel;
