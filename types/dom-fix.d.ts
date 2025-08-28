/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// This file exists to explicitly reference DOM types that might not be properly detected
// by the TypeScript compiler during the build process.

declare global {
  // Basic HTML elements
  interface HTMLElement {}
  interface HTMLDivElement extends HTMLElement {}
  interface HTMLButtonElement extends HTMLElement {}
  interface HTMLInputElement extends HTMLElement {}
  interface HTMLTextAreaElement extends HTMLElement {}
  interface HTMLSelectElement extends HTMLElement {}
  interface HTMLCanvasElement extends HTMLElement {}
  interface HTMLTableElement extends HTMLElement {}
  interface HTMLTableSectionElement extends HTMLElement {}
  interface HTMLTableRowElement extends HTMLElement {}
  interface HTMLTableCellElement extends HTMLElement {}
  interface HTMLTableCaptionElement extends HTMLElement {}
  interface HTMLParagraphElement extends HTMLElement {}
  interface HTMLHeadingElement extends HTMLElement {}
  interface HTMLSpanElement extends HTMLElement {}
  interface HTMLUListElement extends HTMLElement {}
  interface HTMLLIElement extends HTMLElement {}
  interface HTMLAnchorElement extends HTMLElement {}
  interface HTMLOListElement extends HTMLElement {}
  interface HTMLIFrameElement extends HTMLElement {}
  
  // For form elements
  interface Element {}
  interface Event {}
  interface FormEvent<T> extends Event {}
  interface FormEventHandler<T> {}
  interface MouseEvent extends Event {}
  interface KeyboardEvent extends Event {}
  
  // Global objects and interfaces
  interface ResizeObserver {
    disconnect(): void;
    observe(target: Element): void;
    unobserve(target: Element): void;
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
    searchParams: URLSearchParams;
  }
  
  interface URLSearchParams {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    getAll(name: string): string[];
    has(name: string): boolean;
    set(name: string, value: string): void;
    sort(): void;
    toString(): string;
  }
  
  interface Response {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
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
    readonly mode: RequestMode;
    readonly credentials: RequestCredentials;
    readonly cache: RequestCache;
    readonly redirect: RequestRedirect;
    readonly referrer: string;
    readonly referrerPolicy: ReferrerPolicy;
    readonly integrity: string;
    readonly keepalive: boolean;
    clone(): Request;
    json(): Promise<any>;
    text(): Promise<string>;
  }
  
  interface Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
  }
  
  interface EventListener {
    (evt: Event): void;
  }
  
  interface Storage {
    readonly length: number;
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
  }
  
  var localStorage: Storage;
  var sessionStorage: Storage;
  var clearTimeout: (handle: number) => void;
  var setTimeout: (handler: TimerHandler, timeout?: number) => number;
} 