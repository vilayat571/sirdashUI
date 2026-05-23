import { useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";

type AdminUpdateImageUploadProps = Readonly<{
  file: File | null;
  onFileChange: (file: File | null) => void;
  existingImageUrl?: string | null;
}>;

export default function AdminUpdateImageUpload({
  file,
  onFileChange,
  existingImageUrl = null,
}: AdminUpdateImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) return;
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [file]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0] ?? null;
    onFileChange(next);

    if (!next) {
      setImagePreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      setImagePreview(readerEvent.target?.result as string);
    };
    reader.readAsDataURL(next);
  };

  const displayedImage = imagePreview ?? existingImageUrl;

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span className="text-sm font-semibold text-gray-700">Image</span>
      <button
        type="button"
        className={`flex w-full min-w-0 flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
          displayedImage
            ? "border-brand/30"
            : "border-gray-200 hover:border-gray-300"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        {displayedImage ? (
          <img
            src={displayedImage}
            alt="Preview"
            className="max-h-48 w-full max-w-full rounded-xl object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
            <ImagePlus className="h-8 w-8" aria-hidden />
            <span className="text-sm">Click to upload image</span>
            <span className="text-xs">PNG, JPG, WEBP</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </button>
    </div>
  );
}
