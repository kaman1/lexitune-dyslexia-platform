// DOM element interfaces
interface HTMLElement extends Element {}
interface HTMLDivElement extends HTMLElement {}
interface HTMLButtonElement extends HTMLElement {}
interface HTMLInputElement extends HTMLElement {}
interface HTMLTextAreaElement extends HTMLElement {}
interface HTMLSelectElement extends HTMLElement {}
interface HTMLAnchorElement extends HTMLElement {}
interface HTMLIFrameElement extends HTMLElement {}
interface HTMLSpanElement extends HTMLElement {}
interface HTMLCanvasElement extends HTMLElement {}
interface HTMLHeadingElement extends HTMLElement {}
interface HTMLParagraphElement extends HTMLElement {}
interface HTMLUListElement extends HTMLElement {}
interface HTMLOListElement extends HTMLElement {}
interface HTMLLIElement extends HTMLElement {}
interface HTMLTableElement extends HTMLElement {}
interface HTMLTableSectionElement extends HTMLElement {}
interface HTMLTableRowElement extends HTMLElement {}
interface HTMLTableCellElement extends HTMLElement {}
interface HTMLTableCaptionElement extends HTMLElement {}

// Events
interface MouseEvent extends Event {}
interface KeyboardEvent extends Event {}
interface EventListener {}

// Global objects
interface ResizeObserver {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

declare class URL {
  constructor(url: string, base?: string | URL);
  href: string;
  origin: string;
  protocol: string;
  hostname: string;
  host: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  toString(): string;
}

declare class Response {
  constructor(body?: BodyInit | null, init?: ResponseInit);
  readonly headers: Headers;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly type: ResponseType;
  clone(): Response;
  json(): Promise<any>;
  text(): Promise<string>;
}

declare class Request {
  constructor(input: RequestInfo, init?: RequestInit);
  readonly headers: Headers;
  readonly method: string;
  readonly url: string;
  readonly body: ReadableStream<Uint8Array> | null;
  clone(): Request;
  json(): Promise<any>;
  text(): Promise<string>;
} 