import { LoaderCircle } from "lucide-react";

export type DeleteUpdateTarget = {
  id: string;
  title: string;
};

type DeleteUpdateDialogProps = Readonly<{
  target: DeleteUpdateTarget | null;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}>;

export default function DeleteUpdateDialog({
  target,
  isPending,
  onClose,
  onConfirm,
}: DeleteUpdateDialogProps) {
  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close delete confirmation"
        disabled={isPending}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/40 disabled:cursor-not-allowed"
      />
      <dialog
        open
        aria-labelledby="delete-update-title"
        className="relative m-0 max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
      >
        <h2 id="delete-update-title" className="text-lg font-bold text-gray-900">
          Delete this update?
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          &quot;{target.title}&quot; will be permanently removed. This cannot be
          undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => onConfirm(target.id)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending && (
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
            )}
            Delete
          </button>
        </div>
      </dialog>
    </div>
  );
}
