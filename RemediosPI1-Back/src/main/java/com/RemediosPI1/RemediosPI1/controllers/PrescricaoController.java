package com.RemediosPI1.RemediosPI1.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.RemediosPI1.RemediosPI1.models.PrescricaoModel;
import com.RemediosPI1.RemediosPI1.services.PrescricaoService;

@RestController
@RequestMapping("/prescricoes")
public class PrescricaoController {

    private final PrescricaoService prescricaoService;

    public PrescricaoController(PrescricaoService prescricaoService) {
        this.prescricaoService = prescricaoService;
    }

    @GetMapping
    public ResponseEntity<List<PrescricaoModel>> getAllPrescricoes() {
        List<PrescricaoModel> prescricoes = prescricaoService.getAllPrescricoes();
        return ResponseEntity.ok(prescricoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrescricaoModel> getPrescricaoById(@PathVariable Long id) {
        Optional<PrescricaoModel> prescricao = prescricaoService.getPrescricaoById(id);
        return prescricao.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PrescricaoModel> savePrescricao(@RequestBody PrescricaoModel prescricao) throws Exception {
        PrescricaoModel savedPrescricao = prescricaoService.savePrescricao(prescricao);
        return ResponseEntity.ok(savedPrescricao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescricao(@PathVariable Long id) {
        prescricaoService.deletePrescricao(id);
        return ResponseEntity.noContent().build();
    }
}
