'use client'
import React, { useState, useRef } from 'react';
import { ImageIcon, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditableImageProps {
  src?: string;
  alt?: string;
  onSave: (src: string) => void;
  className?: string;
  aspectRatio?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt = 'Image',
  onSave,
  className = '',
  aspectRatio = 'aspect-video',
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(src || '');
  const [previewUrl, setPreviewUrl] = useState(src || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImageUrl(url);
    }
  };

  const handleSave = () => {
    onSave(imageUrl);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        className={`relative group cursor-pointer overflow-hidden rounded-lg bg-muted ${aspectRatio} ${className}`}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-primary-foreground flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span className="text-sm font-medium">Change Image</span>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Update Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Preview */}
            <div className={`${aspectRatio} rounded-lg overflow-hidden bg-muted`}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Upload */}
            <div>
              <Label>Upload from device</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full mt-2"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>

            {/* URL Input */}
            <div>
              <Label>Or enter image URL</Label>
              <Input
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                placeholder="https://example.com/image.jpg"
                className="mt-2"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditableImage;