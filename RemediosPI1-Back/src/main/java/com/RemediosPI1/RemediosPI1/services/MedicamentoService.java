package com.RemediosPI1.RemediosPI1.services;

import com.RemediosPI1.RemediosPI1.models.MedicamentoModel;

import java.util.List;
import java.util.Optional;

public interface MedicamentoService {
    List<MedicamentoModel> getAllMedicamentos();
    Optional<MedicamentoModel> getMedicamentoById(Long id);
    MedicamentoModel saveMedicamento(MedicamentoModel medicamento);
    void deleteMedicamento(Long id);

}
