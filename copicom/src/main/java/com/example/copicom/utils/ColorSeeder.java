package com.example.copicom.utils;

import com.example.copicom.entity.Color;
import com.example.copicom.repository.ColorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Order(7)
public class ColorSeeder implements CommandLineRunner {

    private final ColorRepository colorRepository;

    @Override
    public void run(String... args) throws Exception {
        // Solo insertar si la tabla está vacía
        if (colorRepository.count() == 0) {

            List<Color> colores = Arrays.asList(
                    Color.builder()
                            .nombreColor("Rojo")
                            .precioColor(new BigDecimal("1.50"))
                            .build(),
                    Color.builder()
                            .nombreColor("Azul")
                            .precioColor(new BigDecimal("1.20"))
                            .build(),
                    Color.builder()
                            .nombreColor("Verde")
                            .precioColor(new BigDecimal("1.30"))
                            .build(),
                    Color.builder()
                            .nombreColor("Amarillo")
                            .precioColor(new BigDecimal("1.10"))
                            .build()
            );

            colorRepository.saveAll(colores);

            System.out.println("✔ Colores insertados correctamente.");
        } else {
            System.out.println("✔ La tabla de colores ya contiene datos, no se insertó nada.");
        }
    }
}
