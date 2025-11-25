package com.example.copicom.utils;

import com.example.copicom.entity.Tamano;
import com.example.copicom.repository.TamanoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Order(5)
public class TamanoSeeder implements CommandLineRunner {

    private final TamanoRepository tamanoRepository;

    @Override
    public void run(String... args) throws Exception {
        // Solo insertar si la tabla está vacía
        if (tamanoRepository.count() == 0) {

            List<Tamano> tamanos = Arrays.asList(
                    Tamano.builder()
                            .nombreTamano("Pequeño")
                            .precioTamano(new BigDecimal("1.50"))
                            .build(),
                    Tamano.builder()
                            .nombreTamano("Mediano")
                            .precioTamano(new BigDecimal("3.00"))
                            .build(),
                    Tamano.builder()
                            .nombreTamano("Grande")
                            .precioTamano(new BigDecimal("5.00"))
                            .build(),
                    Tamano.builder()
                            .nombreTamano("Extra Grande")
                            .precioTamano(new BigDecimal("7.50"))
                            .build()
            );

            tamanoRepository.saveAll(tamanos);

            System.out.println("✔ Tamaños de ejemplo insertados correctamente.");
        } else {
            System.out.println("✔ La tabla de tamaños ya contiene datos, no se insertó nada.");
        }
    }
}
