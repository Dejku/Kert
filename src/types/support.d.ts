type SupportLink = {
    label: string,
    link: string,
    icon: string
}

type SupportPage = {
    link: string,
    title: string,
    tableOfContents: TableOfContent[],
    content: MainContent[],
}

type TableOfContent = {
    name: string,
    anchor: string,
}

type MainContent = {
    id: string,
    type: 'paragraph' | 'badge',
    content: string
    anchor?: string,
    bold?: string
}