import { Flex } from "@chakra-ui/react"

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {

  return (
    <Flex
      justify='center'
      align='center'
      height='50'
      py='3'
      fontWeight='500'
      color='#808080'
      borderTopWidth='2px'
      data-testid="footer"
    >
            © {new Date().getFullYear()} - Remédio Solidário | Desenvolvido por DRP04-PJI240-SALA-004GRUPO-008
    </Flex>
  )
}

export default Footer