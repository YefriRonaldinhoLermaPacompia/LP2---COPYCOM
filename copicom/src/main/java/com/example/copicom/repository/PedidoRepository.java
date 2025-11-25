package com.example.copicom.repository;

import com.example.copicom.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByClienteId(Long clienteId);
    
    @Query("SELECT p FROM Pedido p WHERE p.estado = :estado")
    List<Pedido> findByEstado(@Param("estado") String estado);
    
    // Búsqueda por serie y número
    @Query("SELECT p FROM Pedido p WHERE p.serie = :serie AND p.numeroPedido = :numeroPedido")
    List<Pedido> findBySerieAndNumeroPedido(@Param("serie") String serie, @Param("numeroPedido") String numeroPedido);
    
    // Búsqueda por serie
    List<Pedido> findBySerie(String serie);
    
    // Búsqueda por número de pedido
    List<Pedido> findByNumeroPedido(String numeroPedido);
    
    // Búsqueda por serie y número (case insensitive)
    @Query("SELECT p FROM Pedido p WHERE UPPER(p.serie) = UPPER(:serie) AND p.numeroPedido = :numeroPedido")
    List<Pedido> buscarPorSerieYNumero(@Param("serie") String serie, @Param("numeroPedido") String numeroPedido);
}
