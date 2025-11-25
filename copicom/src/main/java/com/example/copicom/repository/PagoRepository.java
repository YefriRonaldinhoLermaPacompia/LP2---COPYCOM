package com.example.copicom.repository;

import com.example.copicom.entity.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PagoRepository extends JpaRepository<Pago, Long> {
    @Query("SELECT p FROM Pago p WHERE p.venta.id = :ventaId")
    List<Pago> findByVentaId(@Param("ventaId") Long ventaId);
}
