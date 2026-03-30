import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-image-lab',
  standalone: true,
  templateUrl: './image-lab.component.html',
  styleUrl: './image-lab.component.scss'
})
export class ImageLabComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lazyContainer') lazyContainer!: ElementRef;
  
  // Sample images data
  nativeLazyImages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/400/300?random=${i + 1}`,
    alt: `Imagen de prueba ${i + 1}`,
    title: `Lazy Loading Nativo ${i + 1}`
  }));

  manualLazyImages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/400/300?random=${i + 13}`,
    alt: `Imagen manual ${i + 1}`,
    title: `Lazy Loading Manual ${i + 1}`,
    loaded: false
  }));

  private observer!: IntersectionObserver;
  private observedElements = new Set<Element>();

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
            this.observedElements.add(entry.target);
            this.loadImage(entry.target as HTMLElement);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Cargar 50px antes de entrar en viewport
        threshold: 0.1
      }
    );

    // Observar todas las imágenes manuales
    setTimeout(() => {
      const lazyImages = this.lazyContainer?.nativeElement.querySelectorAll('.image-lab__manual-item');
      lazyImages.forEach((img: Element) => this.observer.observe(img));
    }, 0);
  }

  private loadImage(element: HTMLElement): void {
    const img = element as HTMLImageElement;
    const src = img.dataset['src'];
    
    if (src && !img.src) {
      img.src = src;
      img.onload = () => {
        img.classList.add('image-lab__manual-item--loaded');
      };
      img.onerror = () => {
        img.classList.add('image-lab__manual-item--error');
      };
    }
  }

  // Para recargar y probar de nuevo
  reloadTest(): void {
    window.location.reload();
  }
}
