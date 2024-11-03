import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
import { Footer, Header } from '../../components'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { api } from '../../services/api'
import { toast } from 'react-toastify'

interface FormData {
  
  cpf: string
  nome: string
  rua: string
  numero: string
  bairro: string
  complemento: string
  cep: string
  cidade: string
  uf: string
  telefone: string
}

const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1")
}

const validateCPF = (cpf: string) => {
  const regex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/

  if (!regex.test(cpf)) {
    return false
  }
  return true
}

const Patient = () => {
  const initialValues: FormData = {
   
    cpf: "",
    nome: "",
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    cep: "",
    cidade: "",
    uf: "",
    telefone: "",
  }

  const validationSchema = Yup.object({
    cpf: Yup.string().required('CPF é obrigatório').test('cpf', 'CPF inválido', validateCPF),
    nome: Yup.string().required('Nome é obrigatório').matches(/^[^\d]+$/, 'Nome não pode conter números'),
    rua: Yup.string().required('A rua é obrigatória'),
    numero: Yup.string().required('O número é obrigatório'),
    bairro: Yup.string().required('O bairro é obrigatório'),
    complemento: Yup.string(),
    cep: Yup.string().matches(/^[0-9]{5}-?[0-9]{3}$/, 'CEP inválido'),
    cidade: Yup.string().required('A cidade é obrigatória'),
    uf: Yup.string().required('O estado é obrigatório'),
    telefone: Yup.string().required('O telefone é obrigatório').matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido'),
  })

  const handleSubmitForm = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {

    try {
      const { status } = await api.post('/paciente', values, {
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
      <Header />
      <Box
        height='calc(100vh - 115px)'
        p={8}
      >
        <Heading as="h1" fontWeight="bold" fontSize='xl'>Cadastro de Paciente</Heading>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({ errors, setFieldValue, values, touched }) => (
            <Form>
              <FormControl mt={7} position='relative'>
                <FormLabel htmlFor='cpf' color='#808080'>CPF do paciente</FormLabel>
                <Field
                  as={Input}
                  id='cpf'
                  name='cpf'
                  type='text'
                  placeholder='Digite o CPF'
                  width='30%'
                  onChange={(e: { target: { value: string } }) => {
                    const maskedCPF = maskCPF(e.target.value)
                    setFieldValue('cpf', maskedCPF)
                  }}
                  value={values.cpf}
                />
                {errors.cpf && touched.cpf && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1} position='absolute' left={0} bottom='-20px'>{errors.cpf}</Text>}
              </FormControl>

              <FormControl mt={7} display='flex' alignItems='center' gap={15}>
                <FormControl position='relative'>
                  <FormLabel htmlFor='nome' color='#808080'>Nome do paciente</FormLabel>
                  <Field as={Input} id='nome' name='nome' type='text' placeholder='Digite o nome completo' />
                  {errors.nome && touched.nome && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1} position='absolute' left={0} bottom='-20px'>{errors.nome}</Text>}
                </FormControl>
                <FormControl position='relative'>
                  <FormLabel htmlFor='telefone' color='#808080'>Telefone do paciente</FormLabel>
                  <Field
                    as={Input}
                    id='telefone'
                    name='telefone'
                    type='text'
                    placeholder='Informe o telefone'
                    onChange={(e: { target: { value: string } }) => {
                      const maskedPhone = maskPhone(e.target.value)
                      setFieldValue('telefone', maskedPhone)
                    }}
                    value={values.telefone}
                  />
                  {errors.telefone && touched.telefone && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1} position='absolute' left={0} bottom='-20px'>{errors.telefone}</Text>}
                </FormControl>
              </FormControl>

              <FormControl mt={7}>
                <FormLabel htmlFor='address' color='#808080'>Endereço do paciente</FormLabel>
                <FormControl display='flex' alignItems='center' gap={15}>
                  <FormControl w='350px' position='relative'>
                    <Field as={Input} id='cep' name='cep' type='text' placeholder='CEP' />
                    {errors.cep && touched.cep && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1} position='absolute' left={0} bottom='-20px'>{errors.cep}</Text>}
                  </FormControl>
                </FormControl>
              </FormControl>
              
              <FormControl mt={7}>
                <FormControl display='flex' alignItems='center' gap={15}>
                  <FormControl position='relative'>
                    <Field as={Input} id='rua' name='rua' type='text' placeholder='Informe o endereço completo' />
                    {errors.rua && touched.rua && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1} position='absolute' left={0} bottom='-20px'>{errors.rua}</Text>}
                  </FormControl>
                  <FormControl w='350px' position='relative'>
                    <Field as={Input} id='numero' name='numero' type='text' placeholder='Número' />
                    {errors.numero && touched.numero && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1} position='absolute' left={0} bottom='-20px'>{errors.numero}</Text>}
                  </FormControl>
                </FormControl>
              </FormControl>

              <FormControl mt={7}>
                <FormControl display='flex' alignItems='center' gap={15}>
                  <FormControl position='relative'>
                    <Field as={Input} id='bairro' name='bairro' type='text' placeholder='Informe o bairro' />
                    {errors.bairro && touched.bairro && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1} position='absolute' left={0} bottom='-20px' >{errors.bairro}</Text>}
                  </FormControl>
                  <FormControl position='relative'>
                    <Field as={Input} id='complemento' name='complemento' type='text' placeholder='Complemento' />
                  </FormControl>
                </FormControl>
              </FormControl>

              <FormControl mt={7}>
                <FormControl display='flex' alignItems='center' gap={15}>
                  <FormControl position='relative'>
                    <Field as={Input} id='cidade' name='cidade' type='text' placeholder='Informe a cidade' />
                    {errors.cidade && touched.cidade && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1} position='absolute' left={0} bottom='-20px'>{errors.cidade}</Text>}
                  </FormControl>
                  <FormControl w='350px' position='relative'>
                    <Field as={Input} id='uf' name='uf' type='text' placeholder='Informe o UF' />
                    {errors.uf && touched.uf && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1} position='absolute' left={0} bottom='-20px'>{errors.uf}</Text>}
                  </FormControl>
                </FormControl>
              </FormControl>

              <Flex justify={'flex-end'}>
                <Button mt={14} variant='outline' type='submit' colorScheme='blue' width='20%'>Cadastrar</Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
      <Footer />
    </>
  )
}

export default Patient