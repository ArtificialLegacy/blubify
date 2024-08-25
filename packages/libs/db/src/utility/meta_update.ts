import { conn } from '../..'

async function meta_update(migration: string) {
    await conn.query(
        /*sql*/ `
        update Meta
            set meta_value = ?
            where meta_key = ?;
    `,
        [migration, 'migration']
    )
}

export { meta_update }
