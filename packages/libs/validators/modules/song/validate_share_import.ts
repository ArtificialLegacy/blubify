import * as yup from 'yup'

/**
 * validation schema for the share import form.
 */
const shareImportValidationSchema = yup.object({
    shareKey: yup
        .string()
        .required('Share key is required.')
        .length(36, 'Share key can only be 36 characters long.')
        .matches(
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
            'Share key must be a valid format.'
        ),
})

async function validateShareImport(_data: { shareKey: string }): Promise<boolean> {
    return await shareImportValidationSchema
        .isValid(_data)
        .then((_value) => _value)
        .catch(() => false)
}

export { shareImportValidationSchema, validateShareImport }
