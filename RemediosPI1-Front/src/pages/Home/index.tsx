import { Outlet, NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { Box, Flex, Image, List, UnorderedList } from '@chakra-ui/react'

import { MenuItems } from '../../common/MenuItems'

import Logo from '../../assets/logo.png'

import HideMenu from '../../assets/close-menu.png'

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {

  const [submenuOpen, setSubmenuOpen] = useState<{ [key: number]: boolean }>(
    MenuItems.reduce((acc, _, index) => ({ ...acc, [index]: false }), {})
  )

  const [menuHidden, setMenuHidden] = useState(false)

  const toggleSubmenu = (index: number) => {
    setMenuHidden(false)
    setSubmenuOpen((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const changeBoxWidth = () => {
    setSubmenuOpen(MenuItems.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}))
    setMenuHidden(!menuHidden)
  }

  return (
    <Flex align="center" justifyContent="center">
      <Box
        height="100vh"
        width={menuHidden ? '50px' : '270px'}
        backgroundColor="#247ba0"
        color="white"
        transition="width 0.2s ease"
      >
        <Flex height="90%" justifyContent="start" flexDirection="column">
          <Flex align="center" justify="center" m={menuHidden ? '2' : '5'}>
            <Image src={Logo} alt="Logo Ecum Detailing" width="70px" />
          </Flex>

          <Flex mt={10}>
            <UnorderedList ml={menuHidden ? 2 : 3} transition="width 0.2s ease">
              {MenuItems.map((menu, index) => (
                <React.Fragment key={index}>
                  <Flex
                    align="center"
                    justifyContent="space-between"
                    width="250px"
                    mb={1}
                    p={2}
                    cursor="pointer"
                    transition="background-color 0.3s, color 0.3s"
                    _hover={!menuHidden ? {backgroundColor: 'whiteAlpha.800',color: '#247ba0',borderRadius: '8'}:{}}
                    onClick={() => toggleSubmenu(index)}
                  >
                    <Flex align="center" gap={4}>
                      <Box fontSize={20}>
                        {menu.icon ? menu.icon : ''}
                      </Box>
                      <Box fontSize={20}>
                        {menu.title}
                      </Box>
                    </Flex>
                    {menu.submenu && (
                      <IoIosArrowDown
                        style={{ transform: submenuOpen[index] ? "rotate(180deg)" : "" }}
                      />
                    )}
                  </Flex>
                  {menu.submenu && submenuOpen[index] && (
                    <List mb={5}>
                      {menu.submenuItems.map((submenuItem, subIndex) => (
                        <Flex
                          as={NavLink}
                          fontSize="16px"
                          ml="40px"
                          mb={1}
                          p={1}
                          _hover={{
                            backgroundColor: 'whiteAlpha.800',
                            color: '#247ba0',
                            borderRadius: '6',
                          }}
                          to={submenuItem.path}
                          key={subIndex}
                          onClick={() => { toggleSubmenu(index) }}
                        >
                          {submenuItem.title}
                        </Flex>
                      ))}
                    </List>
                  )}
                </React.Fragment>
              ))}
            </UnorderedList>
          </Flex>
        </Flex>
            
        <Box ml={3}>
          <button onClick={() => { changeBoxWidth() }}>
            <Image src={HideMenu} alt="Ocultar menu lateral" width="25px" />
          </button>
        </Box>
      </Box>

      <Box flex={1}>
        <Outlet />
      </Box>
    </Flex>
  )
}

export default Home
