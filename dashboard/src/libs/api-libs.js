import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

const NetworkError = axios.create({
  baseURL: 'https://flowbeat.web.id/api',
})

NetworkError.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK') {
      toast({
        title: 'Jaringan jelek',
        description: 'WiFi tolong dihidupkan',
      });
    }
    return Promise.reject(error);
  }
);

export default NetworkError
