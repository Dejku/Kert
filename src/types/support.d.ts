type SupportLinks = {
    label: string,
    link: string,
    icon: string
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