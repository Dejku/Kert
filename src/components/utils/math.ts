export function calculatePageHeight(header: HTMLDivElement | null, footer: HTMLDivElement | null, gapHeight: number, paddingHeight: number): number {
    const pageHeight = document.body.offsetHeight;
    const headerHeight = header?.offsetHeight;
    const footerHeight = footer?.offsetHeight;

    return pageHeight - (headerHeight as number) - (footerHeight as number) - gapHeight * 2 - paddingHeight * 2;
};

export const isSmaller = (value: number, range: number): boolean => value < range;
export const isBigger = (value: number, range: number): boolean => value > range;