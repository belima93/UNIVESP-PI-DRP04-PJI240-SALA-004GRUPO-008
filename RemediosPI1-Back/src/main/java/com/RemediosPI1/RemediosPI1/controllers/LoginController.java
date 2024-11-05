package com.RemediosPI1.RemediosPI1.controllers;

import com.RemediosPI1.RemediosPI1.models.UsuarioModel;
import com.RemediosPI1.RemediosPI1.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioModel>login(@RequestBody UsuarioModel usuarioModel) {
        Optional<UsuarioModel> usuario = usuarioService.autenticar(usuarioModel.getEmail(), usuarioModel.getSenha());

        if (usuario.isPresent()) {
            return ResponseEntity.status(200).body(usuario.get());
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
}
