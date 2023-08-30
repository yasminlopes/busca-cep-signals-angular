import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

interface ApiResponse {
  erro: boolean
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Injectable({
  providedIn: 'root',
})

export class BuscaCepService {
  private _http = inject(HttpClient);
  private _baseUrl = `https://viacep.com.br/ws`

  public buscarCep(cep: string) {
    return this._http.get<ApiResponse>(`${this._baseUrl}/${cep}/json/`)
  }
  
}
