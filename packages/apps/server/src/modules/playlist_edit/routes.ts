import { Router } from 'express'

import { authUserCheck } from 'modules/authentication'
import { userOwnsPlaylist } from 'modules/playlist'

import data from './routes/data'
import deleter from './routes/delete'
import orderup from './routes/order_up'
import orderdown from './routes/order_down'

/**
 * @middleware authUserCheck
 * @middleware userOwnsPlaylist
 *
 * @endpoint '/data/:playlistId' - This endpoint is used to submit playlist edit data.
 * @endpoint '/delete/:playlistId' - This endpoint is used to delete a playlist.
 * @endpoint '/order/up/:playlistId' - This endpoint is used to move a playlist up in the list.
 * @endpoint '/order/down/:playlistId' - This endpoint is used to move a playlist down in the list.
 *
 * @packageDocumentation
 */
const router = Router()
router.use(authUserCheck)

router.patch('/data/:playlistId', userOwnsPlaylist, data())
router.delete('/delete/:playlistId', userOwnsPlaylist, deleter())
router.patch('/order/up/:playlistId', userOwnsPlaylist, orderup())
router.patch('/order/down/:playlistId', userOwnsPlaylist, orderdown())

export default router
