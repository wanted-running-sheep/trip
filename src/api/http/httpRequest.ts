import { ApiUrlType } from '@/types/enum';
import { AxiosInstance } from 'axios';

export class HttpRequest {
  private service: AxiosInstance;

  constructor(service: AxiosInstance) {
    this.service = service;
  }

  get<T>(url: ApiUrlType, params = '') {
    return this.service.get<T>(`${url}${params}`).then((res) => res);
  }
}
