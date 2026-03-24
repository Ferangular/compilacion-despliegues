import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppSettings } from '../interfaces/app-settings.interface';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private http = inject(HttpClient);
  private settings!: AppSettings;

  async load(): Promise<void> {
    this.settings = await firstValueFrom(this.http.get<AppSettings>(environment.jsonFile));
  }

  get config(): AppSettings {
    return this.settings;
  }
}
