import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, User } from '@angular/fire/auth';
import { UserCredential } from 'firebase/auth';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { mostrarAlerta } from '../../app.utils';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private emailsPermitidos: string[] = [];
  private apiUrl = 'https://6492f037428c3d2035d0f153.mockapi.io/api/trevo/usuarios';

  constructor(private auth: Auth,
    private router: Router,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private http: HttpClient) { }

    private tokenKey = 'authToken'; 

  // Método para realizar o login com o Google
  // async signInWithGoogle(): Promise<UserCredential> {
  //   // Cria uma instância do provedor de autenticação do Google
  //   const provider = new GoogleAuthProvider();
  //   const result = await signInWithPopup(this.auth, provider);

  //   // Redireciona para a página 'home' após o login bem-sucedido
  //   if (result.user) {
  //     this.router.navigate(['/home']); // 'home' deve ser substituído pelo caminho real da sua página home
  //   }
  //   console.log(result)
  //   return result;

  // }

  async signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
  
    if (result.user) {
      const allowedEmails = ['felipemarcato10@gmail.com']; //Emails permitidos aqui
      const userEmail = result.user.email;
  
      if (userEmail && allowedEmails.includes(userEmail)) {
        localStorage.setItem(this.tokenKey, 'AuthToken');
        this.router.navigate(['/home']);
      } else {
        await this.signOut(); // Desconecta o usuário se o email não estiver na lista permitida
        mostrarAlerta(this.alertController,'Erro', 'Usuario não encontrado');
      }
    }
  
    return result;
  }

  async signOut(): Promise<void> {
    this.auth.signOut().then(() => {
      // Redireciona para a página de login após o logout
      localStorage.removeItem(this.tokenKey);
      this.router.navigate(['/login']); 
      this.popoverController.dismiss();
    });
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  
}
