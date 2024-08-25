import fs from 'fs/promises'
import { file_exists } from './file_exists'

async function migrations_find(dir: string): Promise<string[]> {
    if (!(await file_exists(dir))) {
        await fs.mkdir(dir)
        return []
    }

    return await fs.readdir(dir)
}

export { migrations_find }
