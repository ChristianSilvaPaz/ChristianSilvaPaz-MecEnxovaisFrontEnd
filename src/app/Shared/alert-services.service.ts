import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class AlertServices {

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  openAlertRegisteredSuccessfully() {
    this.toast.fire({
      icon: 'success',
      title: 'Cadastrado com sucesso',
    });
  }

  openAlertUpdateSuccessfully() {
    this.toast.fire({
      icon: 'success',
      title: 'Atualizado com sucesso',
    });
  }

  openAlertDeletedSuccessfully() {
    this.toast.fire({
      icon: 'success',
      title: 'Excluído com sucesso',
    });
  }

  openAlertError() {
    this.toast.fire({
      icon: 'error',
      title: 'Ocorreu um erro inesperado',
    });
  }

  openAlertForInvalidUserOrPassword(){
    this.toast.fire({
      icon: 'error',
      title: 'Usuário e/ou senha inválidos',
    });
  }
}
