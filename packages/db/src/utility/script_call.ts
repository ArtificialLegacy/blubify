import { conn } from '../..'

async function script_call(script: string): Promise<boolean> {
    const success = await conn
        .execute(script)
        .then(() => true)
        .catch((err) => {
            console.error(`\n${err}\n`)
            return false
        })

    return success
}

export { script_call }
