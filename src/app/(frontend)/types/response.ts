// src/app/types/response.ts
import type { Product } from '@/payload-types';

export interface ResponseType {
  loading: boolean;
  result: Product[] | null;
  error?: Error | null; // Cambiado de any a Error | null
}
