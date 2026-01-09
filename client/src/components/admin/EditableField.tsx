import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  type?: 'text' | 'textarea';
  label?: string;
  className?: string;
  displayClassName?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  type = 'text',
  label,
  className = '',
  displayClassName = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && <label className="text-sm font-medium text-muted-foreground">{label}</label>}
        <div className="flex gap-2 items-start">
          {type === 'textarea' ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 min-h-[100px]"
              autoFocus
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
              autoFocus
            />
          )}
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={handleSave} className="text-success hover:text-success">
              <Check className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel} className="text-destructive hover:text-destructive">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative ${className}`}>
      {label && <label className="text-sm font-medium text-muted-foreground block mb-1">{label}</label>}
      <div className="relative">
        <div className={`pr-10 ${displayClassName}`}>
          {value || <span className="text-muted-foreground italic">Click to edit...</span>}
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsEditing(true)}
          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EditableField;