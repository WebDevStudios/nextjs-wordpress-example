import * as Yup from 'yup'

/**
 * Create Yup string schema object.
 *
 * @author WebDevStudios
 * @see https://github.com/jquense/yup#string
 * @return {Object} Yup validationSchema Object.
 */
export default class StringSchemaFactory {
  /**
   * Constructor.
   *
   * Note: wp-graphql-gravity-forms plugin may need to be replaced.
   *
   * @see https://github.com/harness-software/wp-graphql-gravity-forms
   * @param {Object} fieldData from GravityForm GraphQL data Object.
   */
  constructor(fieldData) {
    this.fieldData = fieldData
  }

  /**
   * Get Yup schema object with validation requirements.
   *
   * Combine multiple schemas into one.
   *
   * @see https://github.com/jquense/yup#mixedconcatschema-schema-schema
   * @return {Object} Combined Yup validationSchema Object.
   */
  get schema() {
    return Yup.string()
      .concat(this.getMaxLengthSchema())
      .concat(this.getRequiredSchema())
  }

  /**
   * Get Yup required field validaion.
   *
   * @see https://github.com/jquense/yup#stringrequiredmessage-string--function-schema
   * @return {Object} Yup validationSchema Object.
   */
  getRequiredSchema() {
    if (!this.fieldData?.isRequired) {
      return
    }

    return Yup.string().required('Required!')
  }

  /**
   * Get Yup max line length validation.
   *
   * @see https://github.com/jquense/yup#stringmaxlimit-number--ref-message-string--function-schema
   * @return {Object} Yup validationSchema Object.
   */
  getMaxLengthSchema() {
    if (!this.fieldData?.maxLength) {
      return
    }

    return Yup.string().max(
      this.fieldData.maxLength,
      `Must be ${this.fieldData.maxLength} characters or less`
    )
  }
}