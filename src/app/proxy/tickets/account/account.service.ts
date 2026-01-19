import type { UserIsActiveDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DtoReturnError, DtoReturnErrorData } from '../eventos/models';
import type { AddDatosBancariosEventosDto, GetDatosBancariosEventosDto } from '../../models';
import type { EmailVerificationResult } from '../notificaciones/models';
import type { AddDatosBancariosDto, CreateUsuarioDto, DatosBancariosDto, EditUsuarioDto, UsuarioDto } from '../usuarios/models';
import type { ResetPasswordDto } from '../../volo/abp/account/models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiName = 'Default';
  

  activarUser = (email: string, token: string, pass: string, rePass: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnErrorData<UsuarioDto>>({
      method: 'POST',
      url: '/api/app/account/activar-user',
      params: { email, token, pass, rePass },
    },
    { apiName: this.apiName,...config });
  

  addDatosBancariosToUser = (datosBancariosDto: AddDatosBancariosDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnErrorData<AddDatosBancariosDto>>({
      method: 'POST',
      url: '/api/app/account/datos-bancarios-to-user',
      body: datosBancariosDto,
    },
    { apiName: this.apiName,...config });
  

  cambiarPassword = (actual: string, nueva: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnError>({
      method: 'POST',
      url: '/api/app/account/cambiar-password',
      params: { actual, nueva },
    },
    { apiName: this.apiName,...config });
  

  cambiarPasswordById = (usuarioId: string, nueva: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnError>({
      method: 'POST',
      url: `/api/app/account/cambiar-password-by-id/${usuarioId}`,
      params: { nueva },
    },
    { apiName: this.apiName,...config });
  

  confirmarCortesia = (cortesiaId: string, usuarioId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/app/account/confirmar-cortesia',
      params: { cortesiaId, usuarioId },
    },
    { apiName: this.apiName,...config });
  

  createUsuario = (createUsuarioDto: CreateUsuarioDto, active?: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnErrorData<UsuarioDto>>({
      method: 'POST',
      url: '/api/app/account/usuario',
      params: { active },
      body: createUsuarioDto,
    },
    { apiName: this.apiName,...config });
  

  deleteDatosBancarios = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/account/${id}/datos-bancarios`,
    },
    { apiName: this.apiName,...config });
  

  edit = (editUsuarioDto: EditUsuarioDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UsuarioDto>({
      method: 'POST',
      url: '/api/app/account/edit',
      body: editUsuarioDto,
    },
    { apiName: this.apiName,...config });
  

  enviarConfirmacionMailClienteByEmail = (email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/account/enviar-confirmacion-mail-cliente',
      params: { email },
    },
    { apiName: this.apiName,...config });
  

  getDatosBancariosDeUltimaFuncionConComprobantesPendientes = (eventoId: string, funcionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnError>({
      method: 'GET',
      url: '/api/app/account/datos-bancarios-de-ultima-funcion-con-comprobantes-pendientes',
      params: { eventoId, funcionId },
    },
    { apiName: this.apiName,...config });
  

  getEmailValid = (email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EmailVerificationResult>({
      method: 'GET',
      url: '/api/app/account/email-valid',
      params: { email },
    },
    { apiName: this.apiName,...config });
  

  getListDatosBancarios = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DatosBancariosDto[]>({
      method: 'GET',
      url: '/api/app/account/datos-bancarios',
    },
    { apiName: this.apiName,...config });
  

  getListDatosBancariosEventos = (eventoId: string, funcionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetDatosBancariosEventosDto[]>({
      method: 'GET',
      url: '/api/app/account/datos-bancarios-eventos',
      params: { eventoId, funcionId },
    },
    { apiName: this.apiName,...config });
  

  getManyEmailsValid = (emails: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, Record<string, EmailVerificationResult>>({
      method: 'POST',
      url: '/api/app/account/get-many-emails-valid',
      body: emails,
    },
    { apiName: this.apiName,...config });
  

  getOneById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UsuarioDto>({
      method: 'GET',
      url: `/api/app/account/${id}/one`,
    },
    { apiName: this.apiName,...config });
  

  getUserByEmail = (email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UsuarioDto>({
      method: 'GET',
      url: '/api/app/account/user',
      params: { email },
    },
    { apiName: this.apiName,...config });
  

  getUserInRoles = (email: string, roles: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnErrorData<boolean>>({
      method: 'GET',
      url: '/api/app/account/user-in-roles',
      params: { email, roles },
    },
    { apiName: this.apiName,...config });
  

  getUserIsActive = (email: string, sinError?: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserIsActiveDto>({
      method: 'GET',
      url: '/api/app/account/user-is-active',
      params: { email, sinError },
    },
    { apiName: this.apiName,...config });
  

  getUserNoActive = (email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UsuarioDto>({
      method: 'GET',
      url: '/api/app/account/user-no-active',
      params: { email },
    },
    { apiName: this.apiName,...config });
  

  getUsersChangePassword = (input: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UsuarioDto[]>({
      method: 'GET',
      url: '/api/app/account/users-change-password',
      params: { input },
    },
    { apiName: this.apiName,...config });
  

  insertDatosBancariosALiquidar = (inputList: AddDatosBancariosEventosDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnError>({
      method: 'POST',
      url: '/api/app/account/datos-bancarios-aLiquidar',
      body: inputList,
    },
    { apiName: this.apiName,...config });
  

  recuperarContraseñaEmail = (email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/account/recuperar-contraseña-email',
      params: { email },
    },
    { apiName: this.apiName,...config });
  

  resetPassword = (dto: ResetPasswordDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnError>({
      method: 'POST',
      url: '/api/app/account/reset-password',
      body: dto,
    },
    { apiName: this.apiName,...config });
  

  setPrincipalToCuentaBancaria = (datoBancarioId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/account/set-principal-to-cuenta-bancaria/${datoBancarioId}`,
    },
    { apiName: this.apiName,...config });
  

  updateDatosBancarios = (id: string, input: AddDatosBancariosDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnError>({
      method: 'PUT',
      url: `/api/app/account/${id}/datos-bancarios`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateEventosDatosBancariosComprobante = (eventoId: string, funcionId: string, datosBancariosId: string, archivoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnError>({
      method: 'PUT',
      url: '/api/app/account/eventos-datos-bancarios-comprobante',
      params: { eventoId, funcionId, datosBancariosId, archivoId },
    },
    { apiName: this.apiName,...config });
  

  userExist = (email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/account/user-exist',
      params: { email },
    },
    { apiName: this.apiName,...config });
  

  usuarioActivo = (email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/account/usuario-activo',
      params: { email },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
