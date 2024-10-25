import Logo from '../../assets/logo.png'
import Background from '../../assets/background-home.jpg'

import { Flex, Button, Image, FormControl, FormLabel, Input, Box, Text, Link } from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
import { useUser } from '../../hooks/UserContext'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface FormData {
  email: string
  password: string
}

export default function Login() {
  const { putUserData } = useUser()
  const navigate = useNavigate()

  const initialValues: FormData = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve conter 6 digitos')
  })


  const handleSubmitLogin = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    try {
      const { status, data } = await api.post('login', {
        email: values.email,
        password: values.password
      })

      putUserData(data)

      if (status === 201 || status === 200) {

        toast.success('Seja bem vinda(o)!')
        setTimeout(() => {
          localStorage.setItem('remediosolidario:userLogin', JSON.stringify(data))
          resetForm()
          navigate('/home/paciente')
        }, 1500)

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
                  <FormLabel htmlFor='email' color='#fff'>Login</FormLabel>
                  <Field
                    as={Input}
                    id='email'
                    name='email'
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

                <Text color='#000' fontSize='sm' mt='20px'>Não possui conta? <Link as={RouterLink} to="cadastro" fontWeight="bold">Criar conta</Link></Text>

              </Form>
            )}

          </Formik>

        </Box>
      </Flex>
    </>
  )
}
