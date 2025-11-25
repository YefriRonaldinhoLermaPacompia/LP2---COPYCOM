package com.example.copicom.utils;

import com.example.copicom.entity.Servicio;
import com.example.copicom.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Order(8)
public class ServicioSeeder implements CommandLineRunner {

    private final ServicioRepository servicioRepository;

    @Override
    public void run(String... args) throws Exception {
        // Solo insertar si la tabla está vacía
        if (servicioRepository.count() == 0) {

            List<Servicio> servicios = Arrays.asList(
                    Servicio.builder()
                            .nombreServicio("Impresión A4")
                            .descripcion("Impresión a color en hoja tamaño A4.")
                            .precioUnitario(new BigDecimal("0.50"))
                            .cantidad(100)
                            .tamanoId(1L)          // Asume que Tamaño con ID 1 existe
                            .colorId(1L)           // Asume que Color con ID 1 existe
                            .materialId(1L)        // Asume que Material con ID 1 existe
                            .acabadoId(1L)         // Asume que Acabado con ID 1 existe
                            .tipoGeneracionId(1L)  // Asume que TipoGeneracion con ID 1 existe
                            .build(),

                    Servicio.builder()
                            .nombreServicio("Impresión Cartulina")
                            .descripcion("Impresión en cartulina tamaño A3.")
                            .precioUnitario(new BigDecimal("1.50"))
                            .cantidad(50)
                            .tamanoId(2L)
                            .colorId(2L)
                            .materialId(2L)
                            .acabadoId(2L)
                            .tipoGeneracionId(2L)
                            .build(),

                    Servicio.builder()
                            .nombreServicio("Dibujo Artístico")
                            .descripcion("Servicio de dibujo artístico personalizado.")
                            .precioUnitario(new BigDecimal("5.00"))
                            .cantidad(20)
                            .tamanoId(3L)
                            .colorId(3L)
                            .materialId(3L)
                            .acabadoId(3L)
                            .tipoGeneracionId(3L)
                            .build()
            );

            servicioRepository.saveAll(servicios);

            System.out.println("✔ Servicios insertados correctamente.");
        } else {
            System.out.println("✔ La tabla de servicios ya contiene datos, no se insertó nada.");
        }
    }
}
