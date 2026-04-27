import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle, Pencil, PlusCircle, Trash2 } from "lucide-react";
import DeleteUpdateDialog, {
  type DeleteUpdateTarget,
} from "../components/DeleteUpdateDialog";
import { ICON_MAP } from "../lib/adminIcons";
import {
  useAdminUpdates,
  useDeleteAdminUpdate,
  type AdminUpdate,
} from "../hooks/useAdminUpdates";

export type UpdateRow = AdminUpdate;

export default function AdminUpdates() {
  const navigate = useNavigate();
  const { data: updates, isPending, isError, error } = useAdminUpdates();
  const deleteUpdate = useDeleteAdminUpdate();
  const [deleteTarget, setDeleteTarget] = useState<DeleteUpdateTarget | null>(
    null,
  );

  useEffect(() => {
    if (isError && error) {
      const message =
        error instanceof Error ? error.message : "Failed to load updates";
      toast.error(message);
    }
  }, [isError, error]);

  const list = updates ?? [];
  const showInitialLoader = isPending && !isError;

  const handleDelete = (id: string) => {
    deleteUpdate.mutate(id, {
      onSuccess: () => {
        toast.success("Update deleted");
        setDeleteTarget(null);
      },
      onError: (deleteError) => {
        const message =
          deleteError instanceof Error
            ? deleteError.message
            : "Failed to delete update";
        toast.error(message);
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-5xl min-w-0 overflow-x-hidden">
      <DeleteUpdateDialog
        target={deleteTarget}
        isPending={deleteUpdate.isPending}
        onClose={() => setDeleteTarget(null)}
        onConfirm={(id) => {
          handleDelete(id);
        }}
      />

      <div className="mb-6 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-bold tracking-tight text-gray-900">
            Updates
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {list.length} update{list.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          to="/admin/dashboard/updates/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark sm:shrink-0"
        >
          <PlusCircle className="h-4 w-4" aria-hidden />
          New Update
        </Link>
      </div>

      {showInitialLoader && (
        <div className="flex items-center justify-center py-24">
          <LoaderCircle className="h-7 w-7 animate-spin text-gray-400" />
        </div>
      )}

      {!showInitialLoader && list.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-16 text-center shadow-sm">
          <p className="text-sm text-gray-400">No updates yet.</p>
          <Link
            to="/admin/dashboard/updates/create"
            className="mt-3 inline-flex text-sm font-semibold text-brand hover:text-brand-dark"
          >
            Create the first one
          </Link>
        </div>
      )}

      {!showInitialLoader && list.length > 0 && (
        <div className="flex min-w-0 flex-col gap-3">
          {list.map((update) => {
            const IconComp = ICON_MAP[update.icon];
            return (
              <article
                key={update.id}
                className="flex min-w-0 flex-col gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/15 bg-brand/5 text-brand">
                    {IconComp ? (
                      <IconComp className="h-5 w-5" aria-hidden />
                    ) : (
                      <span className="text-xs font-bold">
                        {update.icon?.slice(0, 2).toUpperCase() || "--"}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-gray-900 [overflow-wrap:anywhere]">
                          {update.title}
                        </h2>
                        <p className="mt-1 text-xs text-gray-400">
                          {update.date}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-brand/5 hover:text-brand"
                          aria-label={`Edit update: ${update.title}`}
                          onClick={() =>
                            navigate(
                              `/admin/dashboard/updates/edit/${update.id}`,
                            )
                          }
                        >
                          <Pencil className="h-4 w-4" aria-hidden />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`Delete update: ${update.title}`}
                          onClick={() =>
                            setDeleteTarget({
                              id: update.id,
                              title: update.title,
                            })
                          }
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    </div>

                    {update.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500 [overflow-wrap:anywhere]">
                        {update.description}
                      </p>
                    )}
                  </div>
                </div>

                {update.img && (
                  <img
                    src={update.img}
                    alt={update.title}
                    className="h-24 w-full max-w-full rounded-xl border border-gray-100 bg-gray-50 object-contain p-1 sm:h-16 sm:w-28 sm:shrink-0"
                  />
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
