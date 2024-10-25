import Logo from '../../assets/logo.png'
import Background from '../../assets/background-home.jpg'

import { Flex, Button, Image, FormControl, FormLabel, Input, Box, Text, Link } from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Link as RouterLink } from 'react-router-dom'
// import { api } from '../../services/api'

interface FormData {
  id: number
  name: string
  cpf: string
  email: string
  password: string
  confirmPassword: string
}

const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

const validateCPF = (cpf: string) => {
  const regex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/

  if (!regex.test(cpf)) {
    return false
  }
  return true
}

export default function Register() {

  const initialValues: FormData = {
    id: 0,
    name: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object({
    cpf: Yup.string().required('CPF é obrigatório').test('cpf', 'CPF inválido', validateCPF),
    name: Yup.string().required('O nome é obrigatório').matches(/^[^\d]+$/, 'Nome não pode conter números'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve conter 6 digitos'),
    confirmPassword: Yup.string()
      .required('A confirmação da senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  })

  const handleSubmitLogin = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    console.log("Register", values)
    toast.success('Usuário cadastrado com sucesso!')
    resetForm()
    // try {
    //   const { status } = await api.post('login', values, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })

    //   if (status === 201 || status === 200) {
    //     toast.success('Usuário cadastrado com sucesso!')
    //     resetForm()
    //   }
    //   if (status === 409) {
    //     toast.error('Usuário já cadastrado')
    //   }

    // } catch (err) {
    //   toast.error('Falha no sistema! Tente novamente')
    // }
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
          h='620px'
          w='40%'
          bg='#247ba0'
          p='10'
          borderRadius='md'
          boxShadow='md'
          position='relative'
        >
          <Image
            src={Logo}
            alt='Imagem mãos com remédio'
            boxSize='80px'
            position='absolute'
            top='30px'
            right='50px'
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitLogin}
          >
            {({ errors, setFieldValue, values, touched }) => (
              <Form noValidate>
                <Flex flexDirection='column' gap='35px'>

                  <FormControl
                    h='60px'>
                    <FormLabel htmlFor='cpf' color='#FFF'>CPF</FormLabel>
                    <Field
                      as={Input}
                      id='cpf'
                      name='cpf'
                      type='text'
                      placeholder='Digite o CPF'
                      sx={{
                        '::placeholder': {
                          color: 'gray.800'
                        },
                      }}
                      width='40%'
                      onChange={(e: { target: { value: string } }) => {
                        const maskedCPF = maskCPF(e.target.value)
                        setFieldValue('cpf', maskedCPF)
                      }}
                      value={values.cpf}                      
                    />
                    {errors.cpf && touched.cpf && <Text color='#8f1515' fontSize={14} fontWeight='500' pl={1}>{errors.cpf}</Text>}
                  </FormControl>

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

                  <FormControl
                    h='60px'>
                    <FormLabel htmlFor='confirmPassword' color='#fff'>Confirmar Senha</FormLabel>
                    <Field
                      as={Input}
                      id='confirmPassword'
                      name='confirmPassword'
                      type='password'
                      autoComplete='current-confirmPassword'
                      placeholder='Digite sua senha novamente'
                      sx={{
                        '::placeholder': {
                          color: 'gray.800'
                        },
                      }}
                    />
                    {errors.confirmPassword && touched.confirmPassword && <Text color='#8f1515' fontSize={14} fontWeight='500' pl={1}>{errors.confirmPassword}</Text>}
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
                    Já possuo cadastro! {}
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