import type formidable from 'formidable'

namespace NodeJS {
  interface ProcessEnv {
    FFMPEG_PATH: string | undefined
    FFMPEG_LOCATION: string | undefined

    API_IP: string
    API_PORT: string
  }
}
