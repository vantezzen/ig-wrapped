/* eslint-disable unused-imports/no-unused-vars */
export interface EmbedController {
  loadUri(_uri: string): void;
  play(): void; // Starts from the beginning
  playFromStart(): void;
  togglePlay(): void;
  pause(): void;
  resume(): void;
  seek(_seconds: number): void;
  destroy(): void;

  addListener(_event: string, _callback: (_state: any) => void): void;
  once(_event: string, _callback: () => void): void;
  removeListener(_event: string, _callback: (_state: any) => void): void;

  iframeElement: HTMLIFrameElement;
}

export interface SpotifyIframeApi {
  createController(
    _element: HTMLElement,
    _options: {
      uri: string;
      width?: number;
      height?: number;
    },
    _callback: (_EmbedController: any) => void
  ): void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady: (_IFrameAPI: any) => void;
  }
}

export { };
