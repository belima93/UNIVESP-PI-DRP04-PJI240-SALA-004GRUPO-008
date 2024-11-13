import Logo from "../../assets/logo.png"
import Background from "../../assets/background-home.jpg"

import {
  Flex,
  Button,
  Image,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Link,
  VisuallyHidden,
  Heading,
} from "@chakra-ui/react"
import { Field, Form, Formik, FormikHelpers } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { api } from "../../services/api"
import { useUser } from "../../hooks/UserContext"
import { Link as RouterLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

interface FormData {
  email: string
  senha: string
}

export default function Login() {
  const { putUserData } = useUser()
  const navigate = useNavigate()

  const initialValues: FormData = {
    email: "",
    senha: "",
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("O login é obrigatório"),
    senha: Yup.string()
      .required("A senha é obrigatória")
      .min(6, "A senha deve conter 6 digitos"),
  })

  const handleSubmitLogin = async (
    values: FormData,
    { resetForm }: FormikHelpers<FormData>
  ) => {
    try {
     
      const response = await api.post(`login`,values)
      
      
      if (response.status == 200) {
        toast.success("Seja bem-vindo(a)!")

        const user = response.data      

        putUserData(user)

        setTimeout(() => {
          localStorage.setItem(
            "remediosolidario:userLogin",
            JSON.stringify(user)
          )
          resetForm()
          navigate("/home/paciente")
        }, 1500)
      }

      else{
        toast.error("Usuário não encontrado!")
        return
      }

    } catch (err) {
      toast.error("Falha no sistema! Tente novamente")
    }
  }

  return (
    <>
      <Flex
        height="100vh"
        justify="center"
        align="center"
        bgImage={`url(${Background})`}
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
      >
        <Box boxSize="md" bg="#247ba0" p="10" borderRadius="md" boxShadow="md">
          <VisuallyHidden>
            <Heading as="h1">Login</Heading>
          </VisuallyHidden>
          <Image
            src={Logo}
            alt="Logo Ecum Detailing"
            boxSize="80px"
            mb="8"
            margin="0 auto"
            width="80px"
            height="80px"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitLogin}
          >
            {({ errors, touched }) => (
              <Form noValidate>
                <FormControl h="60px">
                  <FormLabel htmlFor="email" aria-labelledby="email" color="#fff">
                    Login
                  </FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="login"
                    autoComplete="username"
                    placeholder="Digite o e-mail cadastrado"
                    sx={{
                      "::placeholder": {
                        color: "gray.800",
                      },
                    }}
                  />
                  {errors.email && touched.email && (
                    <Text color="#8f1515" fontSize={14} fontWeight="500" pl={1}>
                      {errors.email}
                    </Text>
                  )}
                </FormControl>

                <FormControl mt={10} h="60px">
                  <FormLabel htmlFor="senha" aria-labelledby="senha" color="#fff" >
                    Senha
                  </FormLabel>
                  <Field
                    as={Input}
                    id="senha"
                    name="senha"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Digite a senha"
                    sx={{
                      "::placeholder": {
                        color: "gray.800",
                      },
                    }}
                  />
                  {errors.senha && touched.senha && (
                    <Text color="#8f1515" fontSize={14} fontWeight="500" pl={1}>
                      {errors.senha}
                    </Text>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  variant="outline"
                  color="white"
                  width="150px"
                  mt="50px"
                  _hover={{
                    color: "#247ba0",
                    bg: "white",
                  }}
                >
                  Entrar
                </Button>

                <Text color="#000" fontSize="sm" mt="20px">
                  Não possui conta?{" "}
                  <Link as={RouterLink} to="cadastro" fontWeight="bold">
                    Criar conta
                  </Link>
                </Text>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  )
}
