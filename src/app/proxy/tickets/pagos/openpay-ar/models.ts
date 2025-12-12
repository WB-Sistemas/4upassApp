
export interface OpenpayWebhookData {
  type?: string;
  order: OpenpayWebhookOrder;
  payment: OpenpayWebhookPayment;
}

export interface OpenpayWebhookOrder {
  uuid?: string;
  status?: string;
  source?: string;
}

export interface OpenpayWebhookPayload {
  data: OpenpayWebhookData;
}

export interface OpenpayWebhookPayment {
  id: number;
  authorizationCode?: string;
  refNumber?: string;
  status?: string;
}
