import * as yup from 'yup'

/**
 *
 * Nesse arquivo fica todas as configurações e validações personalizadas de formulário do projeto
 * yup: https://github.com/jquense/yup
 *
 */

// validação de cpf yup
yup.addMethod(yup.string, 'cpf', function (errorMessage) {
    return this.test(`test-card-length`, errorMessage, function (value) {
        const { path, createError } = this
        if (isCpfValido(value)) return true
        return createError({ path, message: errorMessage })
    })
})

export { yup }
