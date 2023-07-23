// Libraries
import { useQuery } from "@tanstack/react-query";

// Constants
import { QUERY_KEYS } from "constants/queries";

// Services
import { getInboxs } from "services/inbox.api";

export const useGetDataInbox = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_INBOXS],
    queryFn: getInboxs,
    keepPreviousData: true,
    staleTime: 5 * 1000,
  });

  return { data: data, isLoading };
};
