import { fetcher } from '@/api/fetcher';
import useSWR, { SWRConfiguration } from 'swr';

export default function useTodos(config?: SWRConfiguration) {
  const { data: todos, mutate: mutateTodos } = useSWR('/todos', fetcher, {
    ...config,
  });

  return {
    ...{
      todos,
      mutateTodos,
    },
  };
}
