export function fireEvent(eventName: string, detail?: object | boolean) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
}

export function waitForEvent(eventName: string): Promise<AppResponse> {
    return new Promise<AppResponse>((resolve) => {
        const listener = (e: object) => {
            window.removeEventListener(eventName, listener);
            window.removeEventListener('hideOverlay', listener);
            resolve((e as CustomEvent).detail);
        };

        window.addEventListener('hideOverlay', listener, { once: true });

        window.addEventListener(eventName, listener, { once: true });
    });
}