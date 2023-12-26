import { CustomResponse } from '../models';

export function fireEvent(eventName: string, detail: object | boolean) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
}

export function waitForUserInteraction(eventName: string, once?: boolean): Promise<CustomResponse> {
    return new Promise<CustomResponse>((resolve) => {
        const listener = (e: object) => {
            window.removeEventListener(eventName, listener);
            resolve((e as CustomEvent).detail);
        };

        window.addEventListener('showOverlay', listener, { once: true });

        window.addEventListener(eventName, listener, { once });
    });
}