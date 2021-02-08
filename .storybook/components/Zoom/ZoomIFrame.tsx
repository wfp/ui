import { Component, ReactElement } from 'react';
import { browserSupportsCssZoom } from './Zoom';

export type IZoomIFrameProps = {
  scale: number;
  children: ReactElement<HTMLIFrameElement>;
  iFrameRef: React.MutableRefObject<HTMLIFrameElement>;
  active?: boolean;
};

export class ZoomIFrame extends Component<IZoomIFrameProps> {
  iframe: HTMLIFrameElement = null;

  componentDidMount() {
    const { iFrameRef } = this.props;
    this.iframe = iFrameRef.current;
  }

  shouldComponentUpdate(nextProps: IZoomIFrameProps) {
    const { scale, active } = this.props;

    if (scale !== nextProps.scale) {
      this.setIframeInnerZoom(nextProps.scale);
    }

    if (active !== nextProps.active) {
      this.iframe.setAttribute('data-is-storybook', nextProps.active ? 'true' : 'false');
    }

    // this component renders an iframe, which gets updates via post-messages
    // never update this component, it will cause the iframe to refresh
    return false;
  }

  setIframeInnerZoom(scale: number) {
    try {
      if (browserSupportsCssZoom()) {
        Object.assign(this.iframe.contentDocument.body.style, {
          zoom: 1 / scale,
        });
      } else {
        Object.assign(this.iframe.contentDocument.body.style, {
          width: `${scale * 100}%`,
          height: `${scale * 100}%`,
          transform: `scale(${1 / scale})`,
          transformOrigin: 'top left',
        });
      }
    } catch (e) {
      this.setIframeZoom(scale);
    }
  }

  setIframeZoom(scale: number) {
    Object.assign(this.iframe.style, {
      width: `${scale * 100}%`,
      height: `${scale * 100}%`,
      transform: `scale(${1 / scale})`,
      transformOrigin: 'top left',
    });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}