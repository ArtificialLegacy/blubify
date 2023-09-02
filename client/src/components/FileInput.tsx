import React, { useState, useRef, forwardRef } from 'react'

import { Box, TextField, InputAdornment } from '@mui/material'
import { UploadFile } from '@mui/icons-material'

interface fileInputProps {
  readonly fileAccepts: string
  readonly value: File
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>
  readonly onBlur: React.FocusEventHandler<HTMLInputElement>
  readonly name: string
  readonly helperText: string
  readonly error: boolean
}

/**
 * @prop fileAccepts - The accept field of the <input/> element
 * @prop value - The current value of the <input/> element
 * @prop onChange - The onChange event handler of the <input/> element
 * @prop onBlur - The onBlur event handler of the <input/> element
 * @prop name - The name attribute of the <input/> element
 * @prop helperText - The helperText attribute of the <input/> element
 * @prop error - The error attribute of the <input/> element
 * @prop ref - Ref prop for assigning a useRef object to the <input/> element
 *
 * @example
 *
 * <FileInput fileAccepts='audio/m4a' value={file} onChange={onChange} onBlur={onBlur} name='audio' helperText='Audio file' error={error} ref={inputRef} />
 */
const FileInput = forwardRef(function FileInput(
  _props: fileInputProps,
  _ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <input
        type='file'
        accept={_props.fileAccepts}
        ref={_ref}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          opacity: 0,
        }}
        onChange={_props.onChange}
        onBlur={_props.onBlur}
        name={_props.name}
      />
      <TextField
        variant='outlined'
        fullWidth
        label='Upload File'
        InputLabelProps={{
          shrink: _props.value.slice !== undefined,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <UploadFile />
            </InputAdornment>
          ),
        }}
        value={
          _props.value.slice === undefined
            ? ''
            : _props.value?.slice(12, _props.value.name?.length)
        }
        name={_props.name}
        helperText={_props.helperText}
        error={_props.error}
        onClick={() => {
          // @ts-ignore - this is done bc typescript doesn't know the .current property exists on ForwaredRef<HTMLInputElement>
          _ref.current?.click()
        }}
      />
    </Box>
  )
})

export default FileInput
