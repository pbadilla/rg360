
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useStaggeredAnimation } from '@/lib/animations';
import { ImageUpload } from './ImageUpload';
import { Edit2, Save, Trash2, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

// Types
interface Promotion {
  id: string;
  title: string;
  percentage: number;
  description: string;
  image?: string;
}

export function PromotionTable() {
  // Sample initial data
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      title: 'Summer Sale',
      percentage: 20,
      description: 'Discount on all summer items',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '2',
      title: 'New Year Special',
      percentage: 15,
      description: 'Start the year with great savings',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '3',
      title: 'Flash Deal',
      percentage: 30,
      description: 'Limited time offer',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Promotion>>({});
  const visibleItems = useStaggeredAnimation(promotions.length);

  // Handle edit click
  const handleEditClick = (promotion: Promotion) => {
    setEditingId(promotion.id);
    setEditValues({ ...promotion });
  };

  // Handle save click
  const handleSaveClick = (id: string) => {
    setPromotions(prev => 
      prev.map(promo => 
        promo.id === id ? { ...promo, ...editValues } : promo
      )
    );
    setEditingId(null);
    setEditValues({});
    toast.success('Promotion updated successfully');
  };

  // Handle delete click
  const handleDeleteClick = (id: string) => {
    setPromotions(prev => prev.filter(promo => promo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditValues({});
    }
    toast.success('Promotion deleted successfully');
  };

  // Handle input change
  const handleInputChange = (key: keyof Promotion, value: string | number) => {
    setEditValues(prev => ({ ...prev, [key]: value }));
  };

  // Handle image change
  const handleImageChange = (id: string, image: string) => {
    if (editingId === id) {
      setEditValues(prev => ({ ...prev, image }));
    } else {
      setPromotions(prev => 
        prev.map(promo => 
          promo.id === id ? { ...promo, image } : promo
        )
      );
      toast.success('Image updated successfully');
    }
  };

  // Add new promotion
  const handleAddPromotion = () => {
    const newPromotion: Promotion = {
      id: `${Date.now()}`,
      title: 'New Promotion',
      percentage: 10,
      description: 'Describe your promotion',
      image: ''
    };
    
    setPromotions(prev => [...prev, newPromotion]);
    setEditingId(newPromotion.id);
    setEditValues({ ...newPromotion });
    
    // Scroll to the new promotion after it's added
    setTimeout(() => {
      const element = document.getElementById(`promotion-${newPromotion.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handleAddPromotion}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors"
        >
          <PlusCircle size={16} />
          <span>Add Promotion</span>
        </button>
      </div>
      
      <div className="relative overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion, index) => (
                <tr 
                  key={promotion.id}
                  id={`promotion-${promotion.id}`}
                  className={cn(
                    "transition-all duration-300",
                    !visibleItems[index] && "opacity-0 translate-y-4",
                    editingId === promotion.id && "bg-accent/5"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ImageUpload 
                      currentImage={editingId === promotion.id ? editValues.image : promotion.image}
                      onImageChange={(image) => handleImageChange(promotion.id, image)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === promotion.id ? (
                      <input
                        type="text"
                        value={editValues.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full bg-background border-b border-border p-2 rounded-md"
                      />
                    ) : (
                      <div className="font-medium">{promotion.title}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === promotion.id ? (
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editValues.percentage || 0}
                          onChange={(e) => handleInputChange('percentage', parseInt(e.target.value, 10))}
                          className="w-16 bg-background border-b border-border p-2 rounded-md"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2">%</span>
                      </div>
                    ) : (
                      <div className="font-medium">{promotion.percentage}%</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === promotion.id ? (
                      <textarea
                        value={editValues.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full bg-background border-b border-border p-2 rounded-md"
                        rows={2}
                      />
                    ) : (
                      <div className="max-w-md line-clamp-2">{promotion.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {editingId === promotion.id ? (
                        <button
                          onClick={() => handleSaveClick(promotion.id)}
                          className="p-2 text-accent hover:text-accent/80 transition-colors"
                        >
                          <Save size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(promotion)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(promotion.id)}
                        className="p-2 text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {promotions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No promotions found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
