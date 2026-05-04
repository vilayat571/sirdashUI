import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  LayoutDashboard,
  LoaderCircle,
  PlusCircle,
} from "lucide-react";
import { dashboardActions } from "../data/admin";
import { useAdminUpdates } from "../hooks/useAdminUpdates";

export default function AdminDashboard() {
  const { data: updates, isPending, isError } = useAdminUpdates();

  const recentUpdates = updates?.slice(0, 3) ?? [];
  const totalUpdates = updates?.length ?? 0;
  const showInitialLoader = isPending && !isError;

  return (
    <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-6 overflow-x-hidden">
      <section className="min-w-0 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
              <LayoutDashboard className="h-3.5 w-3.5" aria-hidden />
              Admin Dashboard
            </div>
            <h1 className="break-words text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Manage SirDash updates
            </h1>
            <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-gray-500">
              Create new product updates, keep changelog entries current, and
              manage what visitors see on the landing page.
            </p>
          </div>

          <Link
            to="/admin/dashboard/updates/create"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark sm:w-auto"
          >
            <PlusCircle className="h-4 w-4" aria-hidden />
            New Update
          </Link>
        </div>
      </section>

      <section className="grid min-w-0 gap-4 md:grid-cols-2">
        {dashboardActions.map(({ title, description, href, Icon, cta }) => (
          <Link
            key={href}
            to={href}
            className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-brand/30 hover:bg-brand/5"
          >
            <div className="flex min-w-0 gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/15 bg-brand/5 text-brand">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <h2 className="break-words font-semibold text-gray-900">
                  {title}
                </h2>
                <p className="mt-1 break-words text-sm leading-6 text-gray-500">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid min-w-0 gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total updates</p>
          <div className="mt-3 flex items-end gap-2">
            {showInitialLoader ? (
              <LoaderCircle className="mb-1 h-6 w-6 animate-spin text-gray-400" />
            ) : (
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                {totalUpdates}
              </span>
            )}
            <span className="pb-1 text-sm text-gray-400">
              published entr{totalUpdates === 1 ? "y" : "ies"}
            </span>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-semibold text-gray-900">Recent updates</h2>
              <p className="mt-1 text-sm text-gray-500">
                Latest changelog entries.
              </p>
            </div>
            <Link
              to="/admin/dashboard/updates"
              className="shrink-0 rounded-lg px-2 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/5 sm:px-3"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 flex min-w-0 flex-col gap-3">
            {showInitialLoader && (
              <div className="flex items-center justify-center py-8">
                <LoaderCircle className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            )}

            {!showInitialLoader && recentUpdates.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">
                No updates yet.
              </div>
            )}

            {!showInitialLoader &&
              recentUpdates.map((update) => (
                <Link
                  key={update.id}
                  to={`/admin/dashboard/updates/edit/${update.id}`}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-gray-100 p-3 transition-colors hover:border-brand/30 hover:bg-brand/5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {update.title}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                      {update.date}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
