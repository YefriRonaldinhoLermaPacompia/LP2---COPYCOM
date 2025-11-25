package com.example.copicom.utils;

import com.example.copicom.entity.TipoGeneracion;
import com.example.copicom.repository.TipoGeneracionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Order(6)
public class TipoGeneracionSeeder implements CommandLineRunner {

    private final TipoGeneracionRepository tipoGeneracionRepository;

    @Override
    public void run(String... args) throws Exception {
        // Solo insertar si la tabla está vacía
        if (tipoGeneracionRepository.count() == 0) {

            List<TipoGeneracion> tipos = Arrays.asList(
                    TipoGeneracion.builder()
                            .nombreTipoGeneracion("Manual")
                            .build(),
                    TipoGeneracion.builder()
                            .nombreTipoGeneracion("Automática")
                            .build(),
                    TipoGeneracion.builder()
                            .nombreTipoGeneracion("Mixta")
                            .build()
            );

            tipoGeneracionRepository.saveAll(tipos);

            System.out.println("✔ Tipos de generación insertados correctamente.");
        } else {
            System.out.println("✔ La tabla de tipos de generación ya contiene datos, no se insertó nada.");
        }
    }
}
