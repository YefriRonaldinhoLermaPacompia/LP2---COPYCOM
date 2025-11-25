export interface Pedido {
  id?: number;
  fechaPedido?: string;
  totalPedido?: number;
  observaciones?: string;
  estado?: string; // PENDIENTE, EN_PRODUCCION, ENTREGADO, CANCELADO
  serie?: string; // Serie del pedido (ej: "PED", "B001")
  numeroPedido?: string; // Número del pedido (ej: "00001")
  clienteId?: number;
  clienteNombre?: string;
  clienteDni?: string;
  detalles?: DetallePedido[];
  envioId?: number;
  pagoId?: number;
}

export interface DetallePedido {
  id?: number;
  cantidad?: number;
  precioUnitario?: number;
  subtotal?: number;
  servicioId?: number;
  servicioNombre?: string;
  trabajadorId?: number;
  trabajadorNombre?: string;
  maquinaId?: number;
  maquinaNombre?: string;
  multiplicador?: number;
  costoAdicional?: number;
}

