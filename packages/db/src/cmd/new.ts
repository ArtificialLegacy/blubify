/**

    @cmd new
    @desc Creates a new .ts file in /migrations.

*/

import fs from 'fs/promises'
import { file_exists } from '../utility/file_exists'

const DIR = './migrations'

;(async () => {
    const time = Date.now()

    if (!(await file_exists(DIR))) await fs.mkdir(DIR)

    await fs.writeFile(
        `${DIR}/${time}.ts`,
        `import type { Migration } from '../src/types/migration'
        
export default {
    id: '${time}',
    date: '${new Date(time).toDateString()}',

    comments: [''],

    up: [/*sql*/ \`\`],
    down: [/*sql*/ \`\`],
} as Migration
`
    )

    console.log(`Created new migration: ${time}.ts.\n`)
    process.exit()
})()
