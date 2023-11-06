import { theAxios } from './axios';

export const fetcher = (url: string) => theAxios.get(url).then((res) => res.data);
