import type formidable from 'formidable'

namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    DATABASE_HOST: string
    DATABASE_PORT: string
    DATABASE_USER: string
    DATABASE_PASSWORD: string
    DATABASE: string
    FFMPEG_PATH: string
    FFMPEG_LOCATION: string
    API_IP: string
    API_PORT: string
  }
}
