package com.RemediosPI1.RemediosPI1.services.impl;

import com.RemediosPI1.RemediosPI1.models.UsuarioModel;
import com.RemediosPI1.RemediosPI1.repositories.UsuarioRepository;
import com.RemediosPI1.RemediosPI1.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Optional<UsuarioModel> autenticar(String nomeUsuario, String senha) {

        Optional<UsuarioModel> usuario = usuarioRepository.findByNomeUsuario(nomeUsuario);

        if (usuario.isPresent() && usuario.get().getSenha().equals(senha)) {
            return usuario;
        }

        return Optional.empty();
    }

    @Override
    public UsuarioModel salvarUsuario(UsuarioModel usuario) {
        Optional<UsuarioModel> usuarioExistente = usuarioRepository.findByNomeUsuario(usuario.getNomeUsuario());

        if (usuarioExistente.isPresent()) {
            throw new IllegalArgumentException("Nome de usuário já existe!");
        }

        return usuarioRepository.save(usuario);
    }

    @Override
    public Optional<UsuarioModel> buscarPorNomeUsuario(String nomeUsuario) {
        return usuarioRepository.findByNomeUsuario(nomeUsuario);
    }
}
