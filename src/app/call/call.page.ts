import { Component } from '@angular/core';
import { CallService } from '../services/call/call.service';
import { NgForm } from '@angular/forms';
import { catchError, } from 'rxjs/operators';
import { mostrarAlerta, takePicture } from '../app.utils';
import { AlertController } from '@ionic/angular';
import { Geolocation} from '@capacitor/geolocation'

@Component({
  selector: 'app-call',
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
})
export class CallPage {

  imageSource: any;
  imageCounter: number = 1;



  descricao: string = '';
  prioridade: string = 'Baixa';
  status: string = 'Pendente';
  latitude: any = '';
  longitude: any = '';
  imagemStr: string= '';



  constructor(
    private callService: CallService,
    private alertController: AlertController,) { this.getCurrentCoordinates(); }


  // Função assíncrona para enviar o chamado
  async enviarChamado(form: NgForm) {
    if (form.valid) {

      

      // Preparar os dados do chamado
      const dadosChamado = {
        descricao: this.descricao,
        prioridade: this.prioridade,
        status: this.status,
        localizacao: {
          latitude: this.latitude,
          longitude: this.longitude,
        },
        imagemStr: this.imageSource,
      };




      // Enviar o chamado usando o serviço e lidar com possíveis erros
      this.callService.enviarChamado(dadosChamado)
        .pipe(
          // Usar catchError para lidar com erros de envio
          catchError(error => {
            console.error('Erro ao enviar chamado:', error);
            throw error; // Lançar o erro novamente para ser capturado no subscribe
          })
        )
        .subscribe(async () => {
          // Criar e exibir o alerta de sucesso e atuzalizar a pagina
          mostrarAlerta(this.alertController,'Sucesso', 'Dados enviados com sucesso.', true);


        });
    } else {
      // Criar e exibir o alerta de erro quando campos não estão preenchidos
      mostrarAlerta(this.alertController,'Erro', 'Por favor, preencha todos os campos obrigatórios.', false);
      
    }
  }

  // Função para tirar uma foto usando takePicture
  async tirarFoto() {
    this.imageSource = await takePicture();
    console.log(this.imageSource)

  }

  async getCurrentCoordinates() {
    await Geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Erro ao obter localização', error);
     });
  }

}
