/**

    @cmd revert
    @desc Calls the down scripts of the current migration.

*/

import { Migration } from '../types/migration'
import { meta_init } from '../utility/meta_init'
import { meta_update } from '../utility/meta_update'
import { migration_import } from '../utility/migration_import'
import { migrations_find } from '../utility/migrations_find'
import { script_call } from '../utility/script_call'

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

    let prev = migId > 1 ? migrations[migId - 1].split('.')[0] : '0'
    await meta_update(prev)

    for (let i = 0; i < mig.down.length; i++) {
        console.log(`Script ${i}.`)
        const success = await script_call(mig.down[i])

        if (!success) {
            console.log(`Migration down failed.`)
            process.exit()
        }
    }

    console.log(`Migration ${id} reverted to ${prev}.`)
    process.exit()
})()
