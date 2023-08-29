import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallService } from '../services/call/call.service';
import { AlertController } from '@ionic/angular';
import { mostrarAlerta, takePicture } from '../app.utils';

@Component({
  selector: 'app-edit-call',
  templateUrl: './edit-call.page.html',
  styleUrls: ['./edit-call.page.scss'],
})
export class EditCallPage implements OnInit {

  
  chamado: any;           // Armazena os dados do chamado
  imageSource: any;       // Armazena a imagem atual do chamado
  novaImagem: string = ''; // Armazena a nova imagem capturada como string

  constructor(
    private route: ActivatedRoute,
    private callService: CallService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Obtém o ID do chamado a partir dos parâmetros da rota
    const chamadoId = this.route.snapshot.paramMap.get('chamadoId');

    if (chamadoId) {
      // Chama o serviço para obter detalhes do chamado a partir do ID
      this.callService.obterChamado(chamadoId).subscribe(chamado => {
        this.chamado = chamado; // Define o objeto 'chamado' com os detalhes buscados
        this.imageSource = chamado.imagemStr; // Carrega a imagem atual do chamado
      });
    }
  }

  // Função para salvar as edições feitas no chamado
  salvarEdicao() {
    if (this.novaImagem) {
      this.chamado.imagemStr = this.novaImagem; // Atualiza a imagem do chamado com a nova imagem, se houver
    }

    // Envia os dados editados do chamado para o serviço
    this.callService.editarChamado(this.chamado.id, {
      descricao: this.chamado.descricao,
      prioridade: this.chamado.prioridade,
      status: this.chamado.status,
      localizacao: {
        latitude: this.chamado.localizacao.latitude,
        longitude: this.chamado.localizacao.longitude,
      },
      imagemStr: this.chamado.imagemStr, // Usa a imagem atualizada do chamado
    }).subscribe(() => {
      mostrarAlerta(this.alertController, 'Sucesso', 'Chamado Alterado com sucesso.', true);
    });
  }

  // Função para tirar uma foto usando a funcionalidade takePicture
  async tirarFoto() {
    this.imageSource = await takePicture(); // Chama a função takePicture para capturar uma foto
    this.novaImagem = this.imageSource;     // Salva a nova imagem capturada como uma string
  }
}
