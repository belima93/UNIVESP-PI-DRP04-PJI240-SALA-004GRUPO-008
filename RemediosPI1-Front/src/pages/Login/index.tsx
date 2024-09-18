import Logo from '../../assets/logo.png'
import Background from '../../assets/background-home.jpg'

import { Flex, Button, Image, FormControl, FormLabel, Input, Box, Text, Link } from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik'

export default function Login() {

  const initialValues = () => { }
  const validationSchema = () => { }
  const handleSubmitForm = () => { }

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
            onSubmit={handleSubmitForm}
          >

            <Form>

              <FormControl h='60px'>
                <FormLabel htmlFor='email' color='#fff'>E-mail</FormLabel>
                <Field
                  as={Input}
                  id='email'
                  name='email'
                  type='text'
                  placeholder='Digite seu e-mail'
                  sx={{
                    '::placeholder': {
                      color: 'gray.800'
                    },
                  }}
                />
                {/* {errors.email && touched.email && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.email}</Text>} */}
              </FormControl>

              <FormControl mt={7} h='60px'>
                <FormLabel htmlFor='password' color='#fff'>Senha</FormLabel>
                <Field
                  as={Input}
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Digite sua senha'
                  sx={{
                    '::placeholder': {
                      color: 'gray.800'
                    },
                  }}
                />
                {/* {errors.password && touched.password && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.password}</Text>} */}
              </FormControl>

              <Button
                onClick={handleSubmitForm}
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



          </Formik>

        </Box>
      </Flex>
    </>
  )
}
