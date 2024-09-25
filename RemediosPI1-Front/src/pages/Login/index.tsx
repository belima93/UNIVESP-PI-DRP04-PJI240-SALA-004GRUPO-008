import Logo from '../../assets/logo.png'
import Background from '../../assets/background-home.jpg'

import { Flex, Button, Image, FormControl, FormLabel, Input, Box, Text, Link } from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

interface FormData {
  login: string
  password: string
}

export default function Login() {

  const initialValues: FormData = {
    login: '',
    password: ''
  }

  const validationSchema = Yup.object({
    login: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve conter 6 digitos')
    // .matches(/^[^\d]+$/, 'Nome não pode conter números'),
  })


  const handleSubmitLogin = (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    console.log(values)
    resetForm()
  }

  return (
    <>
      <Flex
        height='100vh'
        justify='center'
        align='center'
        bgImage={`url(${Background})`}
        bgPosition='center'
        bgSize='cover'
        bgRepeat='no-repeat'
      >
        <Box
          boxSize='md'
          bg='#247ba0'
          p='10'
          borderRadius='md'
          boxShadow='md'
        >
          <Image
            src={Logo}
            alt='Imagem mãos com remédio'
            boxSize='80px'
            mb='8'
            margin='0 auto'
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitLogin}
          >
            {({ errors, touched }) => (
              <Form noValidate>

                <FormControl h='60px'>
                  <FormLabel htmlFor='login' color='#fff'>Login</FormLabel>
                  <Field
                    as={Input}
                    id='login'
                    name='login'
                    type='email'
                    autoComplete='username'
                    placeholder='Digite seu e-mail'
                    sx={{
                      '::placeholder': {
                        color: 'gray.800'
                      },
                    }}
                  />
                  {errors.login && touched.login && <Text color='#8f1515' fontSize={14} fontWeight='500' pl={1}>{errors.login}</Text>}
                </FormControl>

                <FormControl mt={10} h='60px'>
                  <FormLabel htmlFor='password' color='#fff'>Senha</FormLabel>
                  <Field
                    as={Input}
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    placeholder='Digite sua senha'
                    sx={{
                      '::placeholder': {
                        color: 'gray.800'
                      },
                    }}
                  />
                  {errors.password && touched.password && <Text color='#8f1515' fontSize={14} fontWeight='500' pl={1}>{errors.password}</Text>}
                </FormControl>

                <Button
                  type='submit'
                  variant='outline'
                  color='white'
                  width='150px'
                  mt='50px'
                  _hover={{
                    color: '#247ba0',
                    bg: 'white'
                  }}
                >
                  Entrar
                </Button>

                <Text color='#000' fontSize='sm' mt='6px'>Não possui conta? <Link fontWeight="bold">Criar conta</Link></Text>

              </Form>
            )}

          </Formik>

        </Box>
      </Flex>
    </>
  )
}
