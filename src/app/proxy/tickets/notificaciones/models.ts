import type { EmailVerificationStatus } from './email-verification-status.enum';
import type { CreationAuditedEntityDto } from '@abp/ng.core';
import type { EstadoEnvio } from '../../estado-envio.enum';
import type { TipoNotificacion } from '../../tipo-notificacion.enum';

export interface EmailVerificationResult {
  valido: boolean;
  estado: EmailVerificationStatus;
  lleno: boolean;
  existe: boolean;
}

export interface NotificacionWebHookData {
  ts: number;
  event?: string;
  mail: NotificacionWebHookData_MailData;
}

export interface NotificacionWebHookData_MailData {
  id?: string;
  domain?: string;
  from?: string;
  to?: string;
  subject?: string;
  type?: string;
  status?: string;
  channel?: string;
  user_variables: NotificacionWebHookData_MailData_UserVariableData;
  createdDate: number;
  updatedDate: number;
}

export interface NotificacionWebHookData_MailData_UserVariableData {
  id?: string;
}

export interface NotificacionesDto extends CreationAuditedEntityDto<string> {
  userId?: string;
  asunto?: string;
  contenido?: string;
  estado: EstadoEnvio;
  tipo: TipoNotificacion;
  intentos: number;
  adjunto: number[];
  isHtml: boolean;
  leida: boolean;
  imageUrl?: string;
}
