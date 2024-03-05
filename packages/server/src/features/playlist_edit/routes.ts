import { Router } from 'express'

import { authUserCheck } from 'features/authentication'
import { userOwnsPlaylist } from 'features/playlist'

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
router.use(userOwnsPlaylist)

router.patch('/data/:playlistId', data)
router.delete('/delete/:playlistId', deleter)
router.patch('/order/up/:playlistId', orderup)
router.patch('/order/down/:playlistId', orderdown)

export default router
