import React, { useState } from 'react'

import {
  Box,
  Modal,
  Paper,
  List,
  ListItem,
  Stack,
  Typography,
  Tab,
  Tabs,
  Button,
} from '@mui/material'

import { Add, Download } from '@mui/icons-material'

import YoutubePanel from './YoutubePanel'
import UploadPanel from './UploadPanel'
import SharedKeyPanel from './SharedKeyPanel'

type importSongModalProps = {
  importSongModalOpen: boolean
  closeImportSongModal: () => void
}

/**
 * Modal that opens what adding a song to a playlist.
 *
 * @prop importSongModalOpen - if the modal is open
 * @prop closeImportSongModal - close this open
 * @prop playlistid - playlistid to add the imported song to
 * @prop setSongs - update the songs list state.
 */
function ImportSongModal(_props: importSongModalProps) {
  const [tab, setTab] = useState(0)

  const formIds = [
    'import-youtube-form',
    'import-upload-form',
    'import-share-form',
  ]

  const handleTabChange = (_e: React.SyntheticEvent, _value: number) => {
    setTab(_value)
  }

  return (
    <Modal open={_props.importSongModalOpen}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Paper>
          <List
            sx={{
              width: '500px',
            }}
          >
            <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction='row' alignItems='center' gap={1}>
                <Add fontSize='large' />
                <Typography variant='h4'>Import Song</Typography>
              </Stack>
            </ListItem>

            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  textColor='secondary'
                  indicatorColor='secondary'
                >
                  <Tab label='Youtube' />
                  <Tab label='Upload' />
                  <Tab label='Shared Key' />
                </Tabs>
              </Box>

              <YoutubePanel
                tab={tab}
                closeCreateSongModal={_props.closeImportSongModal}
              />
              <UploadPanel
                tab={tab}
                closeCreateSongModal={_props.closeImportSongModal}
              />
              <SharedKeyPanel
                tab={tab}
                closeCreateSongModal={_props.closeImportSongModal}
              />
            </ListItem>

            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='text'
                color='error'
                onClick={_props.closeImportSongModal}
              >
                Cancel
              </Button>
              <Button variant='contained' type='submit' form={formIds[tab]}>
                <Download sx={{ marginRight: '5px' }} />
                Import
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Modal>
  )
}

export default ImportSongModal
