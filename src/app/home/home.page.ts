import { Component, OnInit } from '@angular/core';
import { CallService } from '../services/call/call.service';
import { tap, catchError } from 'rxjs/operators';
import { NavController, PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { mostrarAlerta, takePicture } from '../app.utils';
import { PopoverComponent } from '../popover/popover.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pendingOrnot: string = "Pendente";


  chamados: any[] = [];

  constructor(
    private callService: CallService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.obterChamados();

  }


  editarChamado(chamado: any) {
    this.navCtrl.navigateForward('/edit-call/' + chamado.id); // Passando o ID como parte da URL

  }


  excluirChamado(chamado: any) {
    this.callService.excluirChamado(chamado.id)
      .pipe(
        catchError(error => {
          console.error('Erro ao excluir o chamado:', error);
          mostrarAlerta(this.alertController, 'Erro', 'Ocorreu um erro ao excluir o chamado.', false);
          throw error;
        })
      )
      .subscribe(() => {
        // Atualize a lista de chamados após a exclusão
        mostrarAlerta(this.alertController, 'Sucesso', 'Chamado Excuido com sucesso.', false);
        this.obterChamados();
      });
  }

  obterChamados() {

    this.callService.obterChamados()
      .pipe(
        catchError(error => {
          console.error('Erro ao obter a lista de chamados:', error);
          throw error;
        })
      )
      .subscribe((response: any[]) => {
        this.chamados = response;
      });
  }


  async presentPopover(ev: any){
    const popover = await this.popoverController.create({
      component:PopoverComponent,
      // cssClass: "my-custom-class",
      event: ev,
      translucent:true
    });
    
    return await popover.present();
  }
}
