export interface Product {
  id?: number;
  nombre?: string;
  descripcion?: string;
  codigo?: string;
  precio?: number;
  stock?: number;
  activo?: true,
  categoriaId?: number;
  categoriaNombre?: string;
  categoriaCodigo?: string;
  fechaCreacion?: string;
  fechaModificacion?: string;
  cantidad?: number;
  precioUnitario?: number;
  subtotal?: number;
}
