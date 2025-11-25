package com.example.copicom.utils;

import com.example.copicom.entity.Material;
import com.example.copicom.repository.MaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Order(4)
public class MaterialSeeder implements CommandLineRunner {

    private final MaterialRepository materialRepository;

    @Override
    public void run(String... args) throws Exception {
        // Solo insertar si no hay registros
        if (materialRepository.count() == 0) {

            List<Material> materiales = Arrays.asList(
                    Material.builder()
                            .nombreMaterial("Papel Bond")
                            .precioMaterialUnitario(new BigDecimal("0.50"))
                            .cantidadServicioPedido(100)
                            .build(),
                    Material.builder()
                            .nombreMaterial("Cartulina")
                            .precioMaterialUnitario(new BigDecimal("1.20"))
                            .cantidadServicioPedido(50)
                            .build(),
                    Material.builder()
                            .nombreMaterial("Vinil Adhesivo")
                            .precioMaterialUnitario(new BigDecimal("2.00"))
                            .cantidadServicioPedido(30)
                            .build(),
                    Material.builder()
                            .nombreMaterial("Tela")
                            .precioMaterialUnitario(new BigDecimal("5.50"))
                            .cantidadServicioPedido(20)
                            .build(),
                    Material.builder()
                            .nombreMaterial("Lona")
                            .precioMaterialUnitario(new BigDecimal("3.80"))
                            .cantidadServicioPedido(15)
                            .build()
            );

            materialRepository.saveAll(materiales);

            System.out.println("✔ Materiales de ejemplo insertados correctamente.");
        } else {
            System.out.println("✔ La tabla de materiales ya contiene datos, no se insertó nada.");
        }
    }
}
