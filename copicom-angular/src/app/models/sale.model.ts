import {saleDetail} from "./sale-detail.model";
import {Payment} from "./payment.model";

export interface Sale {
  id?: number;
  fecha?: string; // ISO date string
  total?: number;
  subtotal?: number | null;
  observaciones?: string;
  estado?: string;
  numeroFactura?: string;
  serie?: string;
  detalles?: saleDetail[];
  clienteId?: number;
  clienteNombre?: string;
  clienteDni?: string;
  pagos?: Payment[];
}
