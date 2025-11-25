package com.example.copicom.utils;

import com.example.copicom.entity.Cliente;
import com.example.copicom.repository.ClienteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ClienteSeeder implements CommandLineRunner {

    private final ClienteRepository clienteRepository;

    public ClienteSeeder(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Evitar duplicar datos si ya existen
        if (clienteRepository.count() > 0) {
            return;
        }

        Cliente cliente1 = Cliente.builder()
                .nombres("Juna")
                .apellidos("Tito")
                .dni("12345678")
                .direccion("Av. Los Próceres 123")
                .telefono("987654321")
                .ruc("20123456789")
                .correo("juan.perez@email.com")
                .build();

        Cliente cliente2 = Cliente.builder()
                .nombres("Yefri")
                .apellidos("Lerma")
                .dni("87654321")
                .direccion("Calle Falsa 456")
                .telefono("912345678")
                .ruc("20987654321")
                .correo("maria.gonzalez@email.com")
                .build();

        Cliente cliente3 = Cliente.builder()
                .nombres("Carlos")
                .apellidos("Ramírez")
                .dni("45678912")
                .direccion("Jr. Libertad 789")
                .telefono("999888777")
                .ruc("20456789123")
                .correo("carlos.ramirez@email.com")
                .build();

        clienteRepository.save(cliente1);
        clienteRepository.save(cliente2);
        clienteRepository.save(cliente3);

        System.out.println("Clientes seeders insertados correctamente!");
    }
}
