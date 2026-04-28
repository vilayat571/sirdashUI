import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export type AdminUpdate = {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  img: string | null;
  created_at: string;
};

export type AdminUpdateInput = {
  title: string;
  description: string;
  date: string;
  icon: string;
  img: string | null;
};

export const adminUpdatesKeys = {
  all: ["adminUpdates"] as const,
  list: () => [...adminUpdatesKeys.all, "list"] as const,
};

async function fetchAdminUpdates(): Promise<AdminUpdate[]> {
  const { data, error } = await supabase
    .from("updates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as AdminUpdate[];
}

export function useAdminUpdates(): UseQueryResult<AdminUpdate[]> {
  return useQuery({
    queryKey: adminUpdatesKeys.list(),
    queryFn: fetchAdminUpdates,
  });
}

export function useAdminUpdate(id: string | undefined) {
  const query = useAdminUpdates();
  const update = id
    ? query.data?.find((row) => row.id === id)
    : undefined;
  return { ...query, data: update };
}

export function useCreateAdminUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AdminUpdateInput) => {
      const { data, error } = await supabase
        .from("updates")
        .insert([input])
        .select()
        .single();

      if (error) throw error;
      return data as AdminUpdate;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminUpdatesKeys.list(),
      });
    },
  });
}

export function useUpdateAdminUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: AdminUpdateInput;
    }) => {
      const { data, error } = await supabase
        .from("updates")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as AdminUpdate;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminUpdatesKeys.list(),
      });
    },
  });
}

export function useDeleteAdminUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("updates").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: adminUpdatesKeys.list() });
      const previous = queryClient.getQueryData<AdminUpdate[]>(
        adminUpdatesKeys.list(),
      );
      queryClient.setQueryData<AdminUpdate[]>(
        adminUpdatesKeys.list(),
        (current) => (current ?? []).filter((row) => row.id !== id),
      );
      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(adminUpdatesKeys.list(), context.previous);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: adminUpdatesKeys.list(),
      });
    },
  });
}
