import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';

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
  public showAlert = signal<Boolean>(false);
  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
      handler: () => {
        this.showAlert.set(false);
      },
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        this.showAlert.set(false);
        this.formControl.setValue(this.kilometers());
      },
    },
  ];

  public constructor(
    private readonly toast: ToastController,
    private readonly http: HttpClient
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
      this.isLoading.set(false);
      return;
    }

    try {
      const blob = this.convertUrlToBlob(this.selectedImage);

      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');

      this.http
        .post<{ text: string }>(`${this.apiUrl}/upload`, formData)
        .subscribe({
          next: (data) => {
            this.kilometers.set(data.text);
            this.showAlert.set(true);
            this.isLoading.set(false);
          },
          error: (error) => {
            console.error('Error uploading image:', error);
            this.isLoading.set(false);
            this.errorToast();
          },
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      this.isLoading.set(false);
      this.errorToast();
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
