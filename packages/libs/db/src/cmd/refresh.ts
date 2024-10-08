/**

    @cmd refresh
    @desc Calls the down then up migration scripts of the current migrations.
    @desc If down migration fails, will revert to prev migration and require manual patching.

*/

import '../utility/env'
import { Migration } from '../types/migration'
import { meta_init } from '../utility/meta_init'
import { meta_update } from '../utility/meta_update'
import { migration_import } from '../utility/migration_import'
import { migrations_find } from '../utility/migrations_find'
import { script_call } from '../utility/script_call'

import 'dotenv/config'

const DIR = './migrations'

;(async () => {
    const migration = await meta_init()

    const migrations = await migrations_find(DIR)
    let migId = -1

    let id = `${migration}.ts`

    for (let i = 0; i < migrations.length; i++) {
        if (id === migrations[i]) migId = i
    }

    if (migId === -1) {
        console.log(`Current migration is invalid. Migration with id ${migId} does not exist.`)
        process.exit()
    }

    let mig: Migration = await migration_import(id)

    console.log(`Running migration down.`)

    for (let i = 0; i < mig.down.length; i++) {
        console.log(`Script ${i}.`)
        const success = await script_call(mig.down[i])

        if (!success) {
            console.log(`Migration down failed.`)
            let prev = migId > 1 ? migrations[migId - 1].split('.')[0] : '0'
            await meta_update(prev)
            process.exit()
        }
    }

    console.log(`Running migration up.`)

    for (let i = 0; i < mig.up.length; i++) {
        console.log(`Script ${i}.`)
        const succcess = await script_call(mig.up[i])

        if (!succcess) {
            console.log(`Migration up failed.`)
            process.exit()
        }
    }

    console.log(`Migration ${id} refreshed.`)
    process.exit()
})()
