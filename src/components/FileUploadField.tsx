"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";

const MAX_FILES = 5;
const MAX_SIZE_MB = 100;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

interface ValidationResult {
  valid: File[];
  errors: string[];
}

interface FileUploadProps {
  name?: string;
}

export default function FileUploadField({ name = "proof" }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (incoming: File[]): ValidationResult => {
    const newErrors: string[] = [];
    const combined = [...files, ...incoming];

    if (combined.length > MAX_FILES) {
      newErrors.push(`You can only upload up to ${MAX_FILES} files.`);
      return { valid: [], errors: newErrors };
    }

    const valid: File[] = [];
    for (const file of incoming) {
      if (file.size > MAX_SIZE_BYTES) {
        newErrors.push(`"${file.name}" exceeds the ${MAX_SIZE_MB}MB limit.`);
      } else {
        valid.push(file);
      }
    }

    return { valid, errors: newErrors };
  };

  const handleFiles = (incoming: File[]): void => {
    const { valid, errors: newErrors } = validate(incoming);
    setErrors(newErrors);
    if (valid.length > 0) setFiles((prev) => [...prev, ...valid]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;
    handleFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const removeFile = (index: number): void => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setErrors([]);
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isFull = files.length >= MAX_FILES;

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        name={name}
        multiple
        onChange={handleInputChange}
        className="hidden"
      />
      {files.length > 0 && (
        <ul className="flex flex-col gap-1">
          {files.map((file, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 px-3 py-2 bg-[#FFFFFF0A] border border-[#FFFFFF1F] rounded-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm truncate">{file.name}</span>
                <span className="text-xs text-[#FFFFFF40] shrink-0">
                  {formatSize(file.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-[#FFFFFF40] hover:text-white transition-opacity shrink-0 cursor-pointer"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {!isFull && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 w-fit px-3 py-1.5 border border-[#FFFFFF1F] rounded-sm text-sm text-white hover:bg-[#FFFFFF0A] transition-colors cursor-pointer"
        >
          <Plus size={14} />
          Add File
        </button>
      )}
      {errors.length > 0 && (
        <div className="flex flex-col gap-1">
          {errors.map((err, i) => (
            <span key={i} className="text-sm text-red-400">
              {err}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
