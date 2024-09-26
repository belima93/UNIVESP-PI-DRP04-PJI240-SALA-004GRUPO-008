package com.RemediosPI1.RemediosPI1.models;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UsuarioModelTest {

    @Test
    public void testUsuarioModelGettersAndSetters() {
        UsuarioModel usuario = new UsuarioModel();

        assertNull(usuario.getId());
        assertNull(usuario.getNomeUsuario());
        assertNull(usuario.getSenha());

        usuario.setId(1L);
        usuario.setNomeUsuario("usuario_teste");
        usuario.setSenha("senha123");

        assertEquals(1L, usuario.getId());
        assertEquals("usuario_teste", usuario.getNomeUsuario());
        assertEquals("senha123", usuario.getSenha());
    }

    @Test
    public void testUsuarioModelAllArgsConstructor() {
        UsuarioModel usuario = new UsuarioModel(1L, "usuario_teste", "senha123");

        assertEquals(1L, usuario.getId());
        assertEquals("usuario_teste", usuario.getNomeUsuario());
        assertEquals("senha123", usuario.getSenha());
    }

    @Test
    public void testUsuarioModelNoArgsConstructor() {
        UsuarioModel usuario = new UsuarioModel();

        assertNull(usuario.getId());
        assertNull(usuario.getNomeUsuario());
        assertNull(usuario.getSenha());
    }
}
