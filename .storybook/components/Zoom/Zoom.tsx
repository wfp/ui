import window from 'global';
import { ZoomElement as Element } from './ZoomElement';
import { ZoomIFrame as IFrame } from './ZoomIFrame';

export const browserSupportsCssZoom = (): boolean =>
  window.document.implementation.createHTMLDocument().body.style.zoom !== undefined;

export const Zoom = {
  Element,
  IFrame,
};