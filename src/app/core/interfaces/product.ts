export interface Product {
  id?: number;
  name: string;
  description: string;
  unit_price: number;
  registration_date?: string;
  id_category: number;
  id_supplier: number;
  state: string;
  stock: number;
}
