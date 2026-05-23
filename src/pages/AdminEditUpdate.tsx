import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import AdminUpdateImageUpload from "../components/Admin/AdminUpdateImageUpload";
import { ICON_OPTIONS } from "../lib/adminIcons";
import { supabase } from "../lib/supabase";
import {
  useAdminUpdate,
  useUpdateAdminUpdate,
} from "../hooks/useAdminUpdates";
import type { UpdateForm } from "../types";

export default function AdminEditUpdate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: update,
    isPending,
    isError,
    error,
  } = useAdminUpdate(id);
  const updateAdminUpdate = useUpdateAdminUpdate();
  const [form, setForm] = useState<UpdateForm>({
    title: update?.title ?? "",
    description: update?.description ?? "",
    date: update?.date ?? "",
    icon: update?.icon ?? "",
  });
  const [existingImg, setExistingImg] = useState<string | null>(
    update?.img ?? null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPrefilled, setIsPrefilled] = useState<boolean>(Boolean(update));
  const [isUploading, setIsUploading] = useState(false);

  const isSubmitting = isUploading || updateAdminUpdate.isPending;

  useEffect(() => {
    if (!update || isPrefilled) return;

    setForm({
      title: update.title ?? "",
      description: update.description ?? "",
      date: update.date ?? "",
      icon: update.icon ?? "",
    });
    setExistingImg(update.img ?? null);
    setIsPrefilled(true);
  }, [update, isPrefilled]);

  useEffect(() => {
    if (!id || isPending) return;

    if (isError) {
      const message =
        error instanceof Error ? error.message : "Failed to load update";
      toast.error(message);
      navigate("/admin/dashboard/updates");
      return;
    }

    if (!update) {
      toast.error("Update not found");
      navigate("/admin/dashboard/updates");
    }
  }, [id, isPending, isError, error, update, navigate]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!id) return;

    if (!form.title || !form.description || !form.date || !form.icon) {
      toast.error("Please fill in all fields and pick an icon");
      return;
    }

    let imgUrl = existingImg;

    if (imageFile) {
      setIsUploading(true);
      const ext = imageFile.name.split(".").pop() ?? "png";
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("update-images")
        .upload(filename, imageFile);

      if (uploadError) {
        toast.error(uploadError.message || "Image upload failed");
        setIsUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("update-images")
        .getPublicUrl(filename);

      imgUrl = urlData.publicUrl;
      setIsUploading(false);
    }

    updateAdminUpdate.mutate(
      { id, input: { ...form, img: imgUrl } },
      {
        onSuccess: () => {
          toast.success("Update saved successfully");
          navigate("/admin/dashboard/updates");
        },
        onError: (saveError) => {
          const message =
            saveError instanceof Error
              ? saveError.message
              : "Failed to save update";
          toast.error(message);
        },
      },
    );
  };

  if (!isPrefilled) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoaderCircle className="h-7 w-7 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl min-w-0 overflow-x-hidden">
      <div className="mb-6 min-w-0">
        <h1 className="break-words text-2xl font-bold tracking-tight text-gray-900">
          Edit Update
        </h1>
        <p className="mt-1 break-words text-sm text-gray-500">
          Make changes and save to update the changelog entry.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          void handleSave(event);
        }}
        className="flex min-w-0 flex-col gap-5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <label className="flex min-w-0 flex-col gap-1.5">
          <span className="text-sm font-semibold text-gray-700">Title</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
            }
            className="min-w-0 rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/15"
            placeholder="e.g. Full MSSQL Support"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-1.5">
          <span className="text-sm font-semibold text-gray-700">
            Description
          </span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            className="min-w-0 resize-y rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/15 [overflow-wrap:anywhere]"
            placeholder="Describe the update..."
          />
        </label>

        <label className="flex min-w-0 flex-col gap-1.5">
          <span className="text-sm font-semibold text-gray-700">Date</span>
          <input
            type="date"
            value={form.date}
            onChange={(event) =>
              setForm((current) => ({ ...current, date: event.target.value }))
            }
            className="min-w-0 rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/15"
          />
        </label>

        <div className="flex min-w-0 flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">Icon</span>
          <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-5">
            {ICON_OPTIONS.map(({ name, Icon, label }) => (
              <button
                key={name}
                type="button"
                title={label}
                onClick={() =>
                  setForm((current) => ({ ...current, icon: name }))
                }
                className={`flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-semibold transition-colors ${
                  form.icon === name
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </div>

        <AdminUpdateImageUpload
          file={imageFile}
          onFileChange={setImageFile}
          existingImageUrl={existingImg}
        />

        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting && (
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
            )}
            Save Changes
          </button>
          <button
            type="button"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            onClick={() => navigate("/admin/dashboard/updates")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
