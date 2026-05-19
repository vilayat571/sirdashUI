import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import AdminUpdateImageUpload from "../components/Admin/AdminUpdateImageUpload";
import { ICON_OPTIONS } from "../lib/adminIcons";
import { supabase } from "../lib/supabase";
import { useCreateAdminUpdate } from "../hooks/useAdminUpdates";

type UpdateForm = {
  title: string;
  description: string;
  date: string;
  icon: string;
};

const EMPTY_FORM: UpdateForm = {
  title: "",
  description: "",
  date: "",
  icon: "",
};

export default function AdminCreateUpdate() {
  const navigate = useNavigate();
  const createUpdate = useCreateAdminUpdate();
  const [form, setForm] = useState<UpdateForm>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const isSubmitting = isUploading || createUpdate.isPending;

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setImageFile(null);
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.title || !form.description || !form.date || !form.icon) {
      toast.error("Please fill in all fields and pick an icon");
      return;
    }

    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

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

    setIsUploading(false);

    createUpdate.mutate(
      { ...form, img: urlData.publicUrl },
      {
        onSuccess: () => {
          toast.success("Update created successfully");
          resetForm();
          navigate("/admin/dashboard/updates");
        },
        onError: (insertError) => {
          const message =
            insertError instanceof Error
              ? insertError.message
              : "Failed to create update";
          toast.error(message);
        },
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-xl min-w-0 overflow-x-hidden">
      <div className="mb-6 min-w-0">
        <h1 className="break-words text-2xl font-bold tracking-tight text-gray-900">
          Create New Update
        </h1>
        <p className="mt-1 break-words text-sm text-gray-500">
          Add a new product update to the public changelog.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          void handleCreate(event);
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
            Create Update
          </button>
          <button
            type="button"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            onClick={() => {
              resetForm();
              navigate("/admin/dashboard/updates");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}