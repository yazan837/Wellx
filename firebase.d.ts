declare module "firebase/app" {
  interface FirebaseOptions {
    apiKey?: string;
    authDomain?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
    measurementId?: string;
  }

  interface FirebaseApp {
    crashlytics?(): Crashlytics;
  }

  interface Crashlytics {
    setCrashlyticsCollectionEnabled(enabled: boolean): void;
    crash(): void;
    recordError(error: Error): void;
    // Add other Crashlytics methods you may use
  }

  export function initializeApp(
    options: FirebaseOptions,
    name?: string
  ): FirebaseApp;
  export function app(name?: string): FirebaseApp;
}
