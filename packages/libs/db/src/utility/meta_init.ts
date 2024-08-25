import { conn } from '../..'

async function meta_init(): Promise<string> {
    const table = (
        await conn.query(
            /*sql*/ `
        select * 
            from INFORMATION_SCHEMA.TABLES 
            where TABLE_SCHEMA = ?
            and TABLE_NAME = 'Meta'
    `,
            [process.env.DATABASE]
        )
    )[0] as unknown as Array<string>

    if (table.length === 0) {
        await conn.query(/*sql*/ `
            create table Meta (
                meta_key varchar(32) primary key,
                meta_value varchar(32) not null
            );
        `)

        await conn.query(
            /*sql*/ `
            insert into Meta (meta_key, meta_value)
                values (?, ?);
        `,
            ['migration', '0']
        )

        return '0'
    } else {
        // @ts-ignore
        const result: string = (
            await conn.query(
                /*sql*/ `
            select meta_value
                from Meta
                where meta_key = ?;
        `,
                ['migration']
            )
        )[0][0]['meta_value']

        return result
    }
}

export { meta_init }
