import formidable from 'formidable'
import * as yup from 'yup'

/**
 * Validation schema for the upload import form.
 */
const uploadFieldsImportValidationSchema = yup.object({
  name: yup.tuple([yup.string().max(64)]).required(),
  playlist: yup.tuple([yup.string().length(36).required()]).required(),
})

const uploadFilesImportValidationSchema = yup.object({
  file: yup.array().of(yup.object()).required(),
})

async function validateUploadImport(
  _fields: formidable.Fields<string>,
  _files: formidable.Files<string>
): Promise<boolean> {
  const fieldsValid = await uploadFieldsImportValidationSchema
    .isValid(_fields)
    .then((_value) => _value)
    .catch(() => false)

  const filesValid = await uploadFilesImportValidationSchema
    .isValid(_files)
    .then((_value) => _value)
    .catch(() => false)

  return fieldsValid && filesValid
}

export default validateUploadImport
