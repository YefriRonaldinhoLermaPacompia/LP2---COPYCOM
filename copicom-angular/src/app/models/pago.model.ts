export interface Pago {
  id?: number;
  modo?: string; // EFECTIVO, TARJETA, TRANSFERENCIA, etc.
  monto?: number;
  fechaPago?: string;
  ventaId?: number;
}

