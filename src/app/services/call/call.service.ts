import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  private apiUrl = 'https://6492f037428c3d2035d0f153.mockapi.io/api/trevo';

  constructor(private http: HttpClient) { }

    enviarChamado(dadosChamado: {
      descricao: string;
      prioridade: string;
      status:string;
      localizacao: { latitude: string; longitude: string };
      imagemStr: string;
      
    }): Observable<any> {
      const chamadoUrl = `${this.apiUrl}/chamado`;
      return this.http.post(chamadoUrl, dadosChamado);
    }

  obterChamado(id: string): Observable<any> {
    const chamadoUrl = `${this.apiUrl}/chamado/${id}`;
    return this.http.get<any>(chamadoUrl);
  }
  

  obterChamados(): Observable<any[]> {
    const chamadosUrl = `${this.apiUrl}/chamado`;
    return this.http.get<any[]>(chamadosUrl);
  }

  
  editarChamado(id: string, dadosChamado: {
    descricao: string;
    prioridade: string;
    status: string;
    localizacao: { latitude: string; longitude: string };
    imagemStr:string;
  }): Observable<any> {
    const chamadoUrl = `${this.apiUrl}/chamado/${id}`;
    return this.http.put(chamadoUrl, dadosChamado);
  }
  

  excluirChamado(id: string): Observable<any> {
    const chamadoUrl = `${this.apiUrl}/chamado/${id}`;
    return this.http.delete(chamadoUrl);
  }
}
