import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-login',
  standalone: true, // Adicione standalone se for componente standalone
  imports: [ReactiveFormsModule],
  templateUrl: './page-login.html',
  styleUrls: ['./page-login.css'] // Corrija para styleUrls (array)
})
export class PageLogin {
  formulario = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
    lembrarMe: new FormControl(false)
  });

  constructor() {
    this.formulario.valueChanges.subscribe(val => {
      console.log('Formulário atualizado:', val);
    });
  }

  emailBlurred = false;
  senhaBlurred = false;


  getEmailError(): string {
    const email = this.formulario.get('email');
    if (this.emailBlurred) {
      if (email?.hasError('required')) return 'E-mail obrigatório.';
      if (email?.hasError('email')) return 'E-mail inválido.';
    }
    return '';
  }

  getSenhaError(): string {
    const senha = this.formulario.get('senha');
    if (this.senhaBlurred) {
      if (senha?.hasError('required')) return 'Senha obrigatória.';
    }
    return '';
  }

  onEmailBlur() {
    this.emailBlurred = true;
  }

  onSenhaBlur() {
    this.senhaBlurred = true;
  }

  onSubmit() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    setTimeout(() => {
      document.getElementById('loadIcon')?.classList.remove('d-none');
      console.log('Formulário enviado:', this.formulario.value);
    }, 1);
  }
}
