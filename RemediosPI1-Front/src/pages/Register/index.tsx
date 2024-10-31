import Logo from '../../assets/logo.png'
import Background from '../../assets/background-home.jpg'

import { Flex, Button, Image, FormControl, FormLabel, Input, Box, Text, Link, VisuallyHidden, Heading } from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { AxiosError } from 'axios'

interface FormData {
  id: number
  name: string
  email: string
  password: string
}

export default function Register() {
  const navigate = useNavigate()

  const initialValues: FormData = {
    id: 0,
    name: '',
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório').matches(/^[^\d]+$/, 'Nome não pode conter números'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve conter 6 digitos'),
  })

  const handleSubmitRegister = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    try {
      const existingUser = await api.get(`cadastro?email=${values.email}`)

      if (existingUser.status === 200 && existingUser.data) {
        toast.error('Usuário já cadastrado. Faça login.')
        navigate('/')
        return
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 404) {
          try {
            const { status } = await api.post('cadastro', values)

            console.log('RESPOSTA DA API', status)

            if (status === 201 || status === 200) {
              toast.success('Usuário cadastrado com sucesso!')
              resetForm()
              navigate('/')
            }
          } catch (err) {
            toast.error('Erro ao cadastrar o usuário. Tente novamente.')
          }
        } else {
          toast.error('Erro ao verificar o usuário. Tente novamente!')
        }
      }
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
          boxSize='lg'
          bg='#247ba0'
          p='10'
          borderRadius='md'
          boxShadow='md'
          position='relative'
        >
          <VisuallyHidden>
            <Heading as="h1">Criar Conta</Heading>
          </VisuallyHidden>
          <Image
            src={Logo}
            alt='Logo Ecum Detailing'
            boxSize='80px'

            position='absolute'
            top='30px'
            right='50px'
            width='80px'
            height='80px'

          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitRegister}
          >
            {({ errors, touched }) => (
              <Form noValidate>
                <Flex flexDirection='column' gap='35px'>

                  <FormControl h='60px'>
                    <FormLabel htmlFor='name' color='#fff'>Nome</FormLabel>
                    <Field
                      as={Input}
                      id='name'
                      name='name'
                      type='text'
                      autoComplete='current-name'
                      placeholder='Digite seu nome'
                      sx={{
                        '::placeholder': {
                          color: 'gray.800'
                        },
                      }}
                    />
                    {errors.name && touched.name && <Text color='#8f1515' fontSize={14} fontWeight='500' pl={1}>{errors.name}</Text>}
                  </FormControl>

                  <FormControl
                    h='60px'>
                    <FormLabel htmlFor='email' color='#fff'>E-mail</FormLabel>
                    <Field
                      as={Input}
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      placeholder='Digite seu e-mail'
                      sx={{
                        '::placeholder': {
                          color: 'gray.800'
                        },
                      }}
                    />
                    {errors.email && touched.email && <Text color='#8f1515' fontSize={14} fontWeight='500' pl={1}>{errors.email}</Text>}
                  </FormControl>

                  <FormControl
                    h='60px'>
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
                    mt='12px'
                    _hover={{
                      color: '#247ba0',
                      bg: 'white'
                    }}
                  >
                    Cadastrar
                  </Button>

                  <Text
                    color='#000'
                    fontSize='sm'
                    mt='20px'
                    position='absolute'
                    bottom='30px'
                    right='45px'
                  >
                    Já possuo cadastro! { }
                    <Link as={RouterLink} to="/" fontWeight="bold">
                      Entrar
                    </Link>
                  </Text>

                </Flex>

              </Form>
            )}

          </Formik>

        </Box>
      </Flex>
    </>
  )
}