type Migration = {
    id: string
    date: string
    comments: [string, ...string[]]
    up: [string, ...string[]]
    down: [string, ...string[]]
}

export type { Migration }
