import { Router } from 'express'

import { authUserCheck } from 'features/authentication'
import { userOwnsSong } from 'features/songs'

import name from './routes/name'
import orderup from './routes/orderup'
import orderdown from './routes/orderdown'
import deleter from './routes/deleter'

/**
 * @middleware authUserCheck
 *
 * @endpoint '/name/:entryId' - Used to edit the name of a song entry.
 * @endpoint '/order/up/:entryId' - Used to move a song entry up in the playlist.
 * @endpoint '/order/down/:entryId' - Used to move a song entry down in the playlist.
 * @endpoint '/delete/:entryId' - Used to delete a song entry.
 *
 * @packageDocumentation
 */
const router = Router()
router.use(authUserCheck)

router.patch('/name/:entryId', userOwnsSong, name())
router.patch('/order/up/:entryId', userOwnsSong, orderup())
router.patch('/order/down/:entryId', userOwnsSong, orderdown())
router.delete('/delete/:entryId', userOwnsSong, deleter())

export default router
