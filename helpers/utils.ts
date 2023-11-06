import { toast } from 'react-hot-toast';

export const showLoadingToast = () => {
  toast('ladling...', { id: 'LOADING', duration: Infinity });
};

export const dismissLoadingToast = () => {
  toast.dismiss('LOADING');
};
