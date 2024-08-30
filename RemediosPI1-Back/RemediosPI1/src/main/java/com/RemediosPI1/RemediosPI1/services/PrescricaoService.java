package com.RemediosPI1.RemediosPI1.services;

import java.util.List;
import java.util.Optional;

import com.RemediosPI1.RemediosPI1.models.PrescricaoModel;

public interface PrescricaoService {
    List<PrescricaoModel> getAllPrescricoes();
    Optional<PrescricaoModel> getPrescricaoById(Long id);
    PrescricaoModel savePrescricao(PrescricaoModel prescricao) throws Exception;
    void deletePrescricao(Long id);
}
