export interface AppTheme {
  primary: string;
  secondary: string;
  accent: string;
}

export interface AppUiSettings {
  showEnvironmentBadge: boolean;
  showDebugPanel: boolean;
}

export interface AppSettings {
  appName: string;
  environmentName: string;
  apiUrl: string;
  debug: boolean;
  logo: string;
  theme: AppTheme;
  ui: AppUiSettings;
}
