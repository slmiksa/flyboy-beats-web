
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  accept = "*",
  maxSize = 5, // Default 5MB
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (!file) {
      onFileSelect(null);
      setError(null);
      return;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`حجم الملف كبير جدًا. الحد الأقصى هو ${maxSize} ميجابايت`);
      onFileSelect(null);
      return;
    }
    
    setError(null);
    onFileSelect(file);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileSelect(null);
    setError(null);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={accept}
      />
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={handleClick}
          variant="outline"
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" /> اختر ملفًا
        </Button>
        
        <Button
          type="button"
          onClick={clearFile}
          variant="outline"
          className="text-destructive hover:text-destructive"
        >
          مسح
        </Button>
      </div>
      
      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}
    </div>
  );
};
