package com.RemediosPI1.RemediosPI1.tests;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.RemediosPI1.RemediosPI1.controllers.LoginController;
import com.RemediosPI1.RemediosPI1.models.UsuarioModel;
import com.RemediosPI1.RemediosPI1.services.UsuarioService;

public class LoginControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private LoginController loginController;

    @Mock
    private UsuarioService usuarioService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = standaloneSetup(loginController).build();
    }

    @Test
    public void testLoginComSucesso() throws Exception {
        UsuarioModel usuario = new UsuarioModel(1L, "usuario_teste", "senha123");

        when(usuarioService.autenticar(anyString(), anyString())).thenReturn(Optional.of(usuario));

        String jsonRequest = """
        {
          "nomeUsuario": "usuario_teste",
          "senha": "senha123"
        }
        """;

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(content().string("Login bem-sucedido!"))
                .andDo(print());
    }

    @Test
    public void testLoginComCredenciaisInvalidas() throws Exception {
        when(usuarioService.autenticar(anyString(), anyString())).thenReturn(Optional.empty());

        String jsonRequest = """
        {
          "nomeUsuario": "usuario_teste",
          "senha": "senhaInvalida"
        }
        """;

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Credenciais inválidas"))
                .andDo(print());
    }
}
