import type { Migration } from '../types/migration'

async function migration_import(migration: string): Promise<Migration> {
    return (await import(`../../migrations/${migration}`)).default as Migration
}

export { migration_import }
