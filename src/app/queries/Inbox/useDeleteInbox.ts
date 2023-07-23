// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Constants
import { QUERY_KEYS } from "constants/queries";

// Services
import { deleteInbox } from "services/inbox.api";

// Types
import { InboxType } from "types/inbox.type";

export const useDeleteInbox = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (inbox: Partial<InboxType>) => await deleteInbox(inbox),
    onMutate: (inbox: Partial<InboxType>) => {},
    onSuccess: () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_INBOXS] });
    },
  });
  return mutation;
};