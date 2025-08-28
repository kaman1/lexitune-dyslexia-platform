/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// HTML Element interfaces
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

// Event interfaces
interface Element {}
interface Event {}
interface MouseEvent extends Event {}
interface KeyboardEvent extends Event {}
interface EventListener {}

// Global objects
interface ResizeObserver {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

interface URL {
  toString(): string;
  href: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
}

interface Response {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  readonly body: ReadableStream<Uint8Array> | null;
  readonly bodyUsed: boolean;
  clone(): Response;
  json(): Promise<any>;
  text(): Promise<string>;
}

interface Request {
  readonly method: string;
  readonly url: string;
  readonly headers: Headers;
  readonly body: ReadableStream<Uint8Array> | null;
  readonly bodyUsed: boolean;
  clone(): Request;
  json(): Promise<any>;
  text(): Promise<string>;
}

// Global variables
declare var localStorage: Storage;
declare var sessionStorage: Storage;
declare var clearTimeout: (handle?: number) => void;
declare var setTimeout: (handler: TimerHandler, timeout?: number) => number; 