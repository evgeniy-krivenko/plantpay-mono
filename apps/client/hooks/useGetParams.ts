import { useRouter } from 'next/router';

const useGetParams = (name: string): string | null => {
  const { query } = useRouter();
  const param = query[name];
  if (typeof param === 'string') {
    return param;
  }
  return null;
};

export default useGetParams;
