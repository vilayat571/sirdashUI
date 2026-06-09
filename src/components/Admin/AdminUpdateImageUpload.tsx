import { useEffect, useId, useRef, useState } from "react";
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
  // Stable ID to wire the label → input for accessibility
  const inputId = useId();

  // Revoke the object URL when it's no longer needed to free memory
  useEffect(() => {
    if (!imagePreview) return;
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Reset preview when the parent clears `file`
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

    // createObjectURL is synchronous and doesn't consume extra memory the way
    // a base-64 FileReader result does — much better for large images.
    setImagePreview(URL.createObjectURL(next));
  };

  const displayedImage = imagePreview ?? existingImageUrl;
  const hasImage = Boolean(displayedImage);

  return (
    <div className="flex min-w-0 flex-col gap-2">
      {/* Visible label associated with the hidden input via htmlFor */}
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-gray-700"
      >
        Image
      </label>

      {/*
        Use a <label> wrapping the input rather than a <button> that
        imperatively calls .click(). This is the correct semantic pattern
        for file upload trigger areas, works with keyboard, assistive tech,
        and avoids the nested-interactive-element issue.
      */}
      <label
        htmlFor={inputId}
        className={`flex w-full min-w-0 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2 ${
          hasImage
            ? "border-brand/30"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        {displayedImage ? (
          <img
            src={displayedImage}
            // Descriptive alt for uploaded preview so screen readers confirm
            // which image was selected.
            alt={file ? `Preview of ${file.name}` : "Current image"}
            className="max-h-48 w-full max-w-full rounded-xl object-cover"
            // Decode off the main thread to avoid layout jank on large images
            decoding="async"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
            <ImagePlus className="h-8 w-8" aria-hidden="true" />
            <span className="text-sm">Click to upload image</span>
            <span className="text-xs text-gray-400">PNG, JPG, WEBP</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          // Visually hidden but still focusable/operable by keyboard & AT
          className="sr-only"
          onChange={handleImageChange}
          // aria-label is redundant here because the surrounding <label>
          // already provides the accessible name; removing it avoids double-
          // announcing on some screen readers.
        />
      </label>
    </div>
  );
}