import fs from 'fs/promises'

async function file_exists(file: string): Promise<boolean> {
    return await fs
        .stat(file)
        .then(() => true)
        .catch(() => false)
}

export { file_exists }
