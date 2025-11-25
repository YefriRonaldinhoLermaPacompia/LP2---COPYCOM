export interface Payment {
  id?: number;
  modo?: string;
  monto?: number;
  ventaId?: number | null;
}
