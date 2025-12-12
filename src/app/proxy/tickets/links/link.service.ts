import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  apiName = 'Default';
  

  createShortLink = (url: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/app/link/short-link',
      params: { url },
    },
    { apiName: this.apiName,...config });
  

  deleteShortLink = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/link/${id}/short-link`,
    },
    { apiName: this.apiName,...config });
  

  verificarLinkEventoByUrl = (url: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/link/verificar-link-evento',
      params: { url },
    },
    { apiName: this.apiName,...config });
  

  verificarLinkYoutube = (videoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: `/api/app/link/verificar-link-youtube/${videoId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
