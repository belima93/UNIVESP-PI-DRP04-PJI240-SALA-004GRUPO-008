import Logo from '../../assets/logo.png'
import Background from '../../assets/background-home.jpg'

import { Flex, Button, Image, FormControl, FormLabel, Input, Box, Text, Link } from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { api } from '../../services/api'

interface FormData {
  name: string
  cpf: string
  email: string
  password: string
  confirmPassword: string
}

export default function Register() {

  const initialValues: FormData = {
    name: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object({
    login: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve conter 6 digitos')
 
  })


  const handleSubmitLogin = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    try {
      const { status } = await api.post('login', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    
      if (status === 201 || status === 200) {
        toast.success('Paciente cadastrado com sucesso!')
        resetForm()
      }
      if (status === 409) {
        toast.error('Paciente já cadastrado')
      }

    } catch (err) {
      toast.error('Falha no sistema! Tente novamente')
    }
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
                  {errors.email && touched.email && <Text color='#8f1515' fontSize={14} fontWeight='500' pl={1}>{errors.email}</Text>}
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