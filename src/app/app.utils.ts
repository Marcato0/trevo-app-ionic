import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


export async function mostrarAlerta(
  alertController: AlertController,
  titulo: string,
  mensagem: string,
  recarregarPagina: boolean = false
) {
  const alert = await alertController.create({
    header: titulo,
    message: mensagem,
    buttons: [
      {
        text: 'OK',
        handler: () => {
          if (recarregarPagina) {
            window.location.reload();
          }
        }
      }
    ]
  });

  await alert.present();
}

export const takePicture = async () => {
  
  const image = await Camera.getPhoto({
    quality: 5,
    width: 10,
    height: 10,
    allowEditing: false,
    resultType: CameraResultType.Base64,
    source: CameraSource.Prompt,
  });

  
  return 'data:image/jpeg;base64,' + image.base64String;
  
};
