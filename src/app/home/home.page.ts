import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public formControl: FormControl;
  public apiUrl: string = 'http://localhost:3333';
  public kilometers = signal<string>('');
  public selectedImage: string | undefined;
  public isLoading = signal<Boolean>(false);

  public constructor(
    private readonly loading: LoadingController,
    private readonly alert: AlertController,
    private readonly toast: ToastController
  ) {
    this.formControl = new FormControl('');
  }

  public async selectImage() {
    try {
      this.isLoading.set(true);
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      this.selectedImage = image.dataUrl;
      this.isLoading.set(false);
    } catch (error) {
      console.error('Error selecting image:', error);
      this.isLoading.set(false);
    }
  }

  public async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      this.selectedImage = image.dataUrl;
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  public async uploadImage() {
    this.isLoading.set(true);

    if (!this.selectedImage) {
      console.error('No image selected to upload.');
      return this.isLoading.set(false);
    }

    try {
      const blob = this.convertUrlToBlob(this.selectedImage);

      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');

      const response = await fetch(`${this.apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      this.kilometers.set(data.text);

      this.isLoading.set(false);

      return this.showAlert();
    } catch (error) {
      console.error('Error uploading image:', error);
      this.isLoading.set(false);
      return this.errorToast();
    }
  }

  private convertUrlToBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }

  private async showAlert() {
    const alert = await this.alert.create({
      header: 'Confirma o envio?',
      message: `A quilometragem detectada foi ${this.kilometers()}.`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: () => {
            this.formControl.setValue(this.kilometers());
          },
        },
      ],
    });

    await alert.present();
  }

  private async errorToast() {
    const toast = await this.toast.create({
      message: 'Aconteceu um erro!',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }
}
