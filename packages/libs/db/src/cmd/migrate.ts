/**

    @cmd migrate {id}
    @desc Calls migration scripts between two migrations.
    @arg id - A valid migration id. Can also be 'latest' or 'none'.

*/

import '../utility/env'
import { meta_init } from '../utility/meta_init'
import { migrations_find } from '../utility/migrations_find'
import type { Migration } from '../types/migration'
import { migration_import } from '../utility/migration_import'
import { meta_update } from '../utility/meta_update'
import { script_call } from '../utility/script_call'

const DIR = './migrations'

;(async () => {
    const idArg = process.argv[2]
    if (idArg === undefined) {
        console.error('No migration id provided.\n')
        process.exit()
    }

    if (idArg.toLowerCase() !== 'latest' && idArg.toLowerCase() !== 'none' && Number.isNaN(parseInt(idArg))) {
        console.error(`Migration id ${idArg} must be a number or 'latest' or 'none'.\n`)
        process.exit()
    }

    const migrations = await migrations_find(DIR)
    let migId = -2

    let id = `${idArg}.ts`
    if (idArg === 'latest') {
        id = migrations[migrations.length - 1]
    }
    if (idArg === 'none') {
        id = 'none'
        migId = -1
    }

    for (let i = 0; i < migrations.length; i++) {
        if (id === migrations[i]) migId = i
    }

    if (migId === -2) {
        console.error(`Migration with id ${id} does not exist.\n`)
        process.exit()
    }

    const current = await meta_init()
    let currId = -2

    if (current === '0') currId = -1

    for (let i = 0; i < migrations.length; i++) {
        if (`${current}.ts` === migrations[i]) currId = i
    }

    if (currId === -2) {
        console.error(`Current migration is invalid. Migration with id ${currId} does not exist.\n`)
        process.exit()
    }

    if (currId === migId) {
        console.error(`Current and target migrations are identical, no migration needed.\n`)
        process.exit()
    }

    const dir = currId < migId ? 1 : -1

    console.log(
        `Performing migration ${dir == 1 ? 'up' : 'down'} from: [${currId}] ${
            migrations[currId] || 'none'
        } to [${migId}] ${migrations[migId] || 'none'}`
    )

    let scripts: string[][] = []

    switch (dir) {
        case 1: {
            for (let i = currId + 1; i <= migId; i++) {
                let mig: Migration = await migration_import(migrations[i])
                scripts.push(mig.up)
            }

            break
        }

        case -1: {
            for (let i = currId; i > migId; i--) {
                let mig: Migration = await migration_import(migrations[i])
                scripts.push(mig.down)
            }
            break
        }
    }

    if (currId == -1) currId = 0

    for (let i = 0; i < scripts.length; i++) {
        console.log(`Running Migration: ${migrations[currId + i * dir]}.`)

        for (let z = 0; z < scripts[i].length; z++) {
            console.log(`Script ${z}.`)

            const success = await script_call(scripts[i][z])

            if (!success) {
                console.error(`Migration failed.`)
                process.exit()
            }
        }
    }

    let migName = migrations[migId]?.split('.')[0] ?? '0'
    await meta_update(migName)

    process.exit()
})()
