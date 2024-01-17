export function fireEvent(eventName: string, detail?: object | boolean) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
}

export function waitForEvent(eventName: string, once?: boolean): Promise<AppResponse> {
    return new Promise<AppResponse>((resolve) => {
        const listener = (e: object) => {
            window.removeEventListener(eventName, listener);
            resolve((e as CustomEvent).detail);
            window.removeEventListener('showOverlay', listener);
        };

        window.addEventListener('showOverlay', listener, { once: true });

        window.addEventListener(eventName, listener, { once: once || true });
    });
}