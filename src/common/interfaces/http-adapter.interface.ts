export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
//   post<T>(url: string, data: any, config?: any): Promise<T>;
//   patch<T>(url: string, data: any, config?: any): Promise<T>;
//   delete<T>(url: string, config?: any): Promise<T>;
}
