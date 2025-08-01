import { Injectable } from "@nestjs/common";

import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
        return data;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }

//   async post<T>(url: string, data: any, config?: any): Promise<T> {
//     const response = await this.axios.post<T>(url, data, config);
//     return response.data;
//   }

//   async patch<T>(url: string, data: any, config?: any): Promise<T> {
//     const response = await this.axios.patch<T>(url, data, config);
//     return response.data;
//   }

//   async delete<T>(url: string, config?: any): Promise<T> {
//     const response = await this.axios.delete<T>(url, config);
//     return response.data;
//   }
}
