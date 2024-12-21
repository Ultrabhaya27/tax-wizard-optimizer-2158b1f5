import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadSectionProps {
  uploadedFile: string | null;
  ocrResult: string;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadSection = ({ uploadedFile, ocrResult, onFileUpload }: FileUploadSectionProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-primary');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary');
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const input = document.createElement('input');
      input.files = e.dataTransfer.files;
      onFileUpload({ target: input } as any);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-all duration-200 hover:border-primary"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={onFileUpload}
          accept="image/*,.pdf"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center space-y-2 group"
        >
          <Upload className="h-12 w-12 text-gray-400 group-hover:text-primary transition-colors" />
          <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
            Click to upload or drag and drop
          </span>
          <span className="text-xs text-gray-500">
            Supports PDF, JPG, PNG (max 10MB)
          </span>
        </label>
      </div>
      {uploadedFile && (
        <div className="flex items-center space-x-2 text-sm text-gray-600 animate-fade-in">
          <FileText className="h-4 w-4" />
          <span>{uploadedFile}</span>
        </div>
      )}
      {ocrResult && (
        <Alert className="animate-fade-in">
          <AlertDescription>
            Document processed successfully! Continue to enter additional details.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUploadSection;