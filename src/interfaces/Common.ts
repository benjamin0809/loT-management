export interface Link {
    key: string
    title: JSX.Element
    href?: string
    blankTarget?: boolean
    flag?: string
}

export interface HeaderProps {
    links: Link[]
}
