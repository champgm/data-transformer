import {  verifyType } from './';

export interface Datum {
  brand_name: string;
  description: string;
  entity: Datum.Entity;
  id: string;
  intent: string;
  label: string;
  media_url: string;
  name: string;
  site_id: string;
  skill_id: string;
  template_name: string;
  title: string;
  type: string;
}
export namespace Datum {
  export function create(payload: any): Datum {
    if (!payload) { throw new Error('Datum not found'); }
    return {
      brand_name: verifyType(payload.brand_name, 'brand_name', 'string'),
      description: verifyType(payload.description, 'description', 'string'),
      entity: Entity.create(payload.entity),
      id: verifyType(payload.id, 'id', 'string'),
      intent: verifyType(payload.intent, 'intent', 'string'),
      label: verifyType(payload.label, 'label', 'string'),
      media_url: verifyType(payload.media_url, 'media_url', 'string'),
      name: verifyType(payload.name, 'name', 'string'),
      site_id: verifyType(payload.site_id, 'site_id', 'string'),
      skill_id: verifyType(payload.skill_id, 'skill_id', 'string'),
      template_name: verifyType(payload.template_name, 'template_name', 'string'),
      title: verifyType(payload.title, 'title', 'string'),
      type: verifyType(payload.type, 'type', 'string'),
    };
  }

  export interface Entity {
    value: string;
    type: string;
  }
  export namespace Entity {
    export function create(payload: any): Entity {
      if (!payload) { throw new Error('Entity not found'); }
      return {
        type: verifyType(payload.type, 'type', 'string'),
        value: verifyType(payload.value, 'value', 'string'),
      };
    }
  }
}
