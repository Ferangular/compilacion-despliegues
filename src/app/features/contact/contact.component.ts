import { Component, signal, computed } from '@angular/core';
import { email, FieldState, form, FormField, maxLength, minLength, required } from '@angular/forms/signals';


interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  subscribeNewsletter: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormField],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // Modelo de datos del formulario
  contactModel = signal<ContactData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium',
    subscribeNewsletter: false
  });

  // Crear el formulario con validación
  contactForm = form(this.contactModel, (schemaPath) => {
    // Validaciones para cada campo
    required(schemaPath.name, { message: 'El nombre es requerido' });
    minLength(schemaPath.name, 3, { message: 'Mínimo 3 caracteres' });
    maxLength(schemaPath.name, 50, { message: 'Máximo 50 caracteres' });

    required(schemaPath.email, { message: 'El email es requerido' });
    email(schemaPath.email, { message: 'Email inválido' });

    required(schemaPath.subject, { message: 'El asunto es requerido' });
    minLength(schemaPath.subject, 5, { message: 'Mínimo 5 caracteres' });
    maxLength(schemaPath.subject, 100, { message: 'Máximo 100 caracteres' });

    required(schemaPath.message, { message: 'El mensaje es requerido' });
    minLength(schemaPath.message, 10, { message: 'Mínimo 10 caracteres' });
    maxLength(schemaPath.message, 500, { message: 'Máximo 500 caracteres' });
  });

  // Computed properties para el estado del formulario
  isFormValid = computed(() => {
    const formState = this.contactForm();
    return formState.valid();
  });

  isFormTouched = computed(() => {
    const fields = [this.contactForm.name, this.contactForm.email, this.contactForm.subject, this.contactForm.message];
    return fields.some(field => {
      const fieldState = field();
      return fieldState.touched();
    });
  });

  // Opciones para el select de prioridad
  priorityOptions = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' }
  ];

  // Contador de caracteres
  messageCharCount = computed(() => {
    const fieldState = this.contactForm.message();
    return fieldState.value().length;
  });

  subjectCharCount = computed(() => {
    const fieldState = this.contactForm.subject();
    return fieldState.value().length;
  });

  // Método de envío
  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.isFormValid()) {
      // Marcar todos los campos como touched para mostrar errores
      this.markAllFieldsTouched();
      return;
    }

    // Obtener los datos del formulario
    const formData = this.contactModel();
    console.log('Formulario enviado:', formData);

    // Simular envío
    alert(`Formulario enviado con éxito:\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nAsunto: ${formData.subject}\nPrioridad: ${formData.priority}\nMensaje: ${formData.message}\nNewsletter: ${formData.subscribeNewsletter ? 'Sí' : 'No'}`);

    // Resetear formulario
    this.resetForm();
  }

  // Resetear formulario
  resetForm(): void {
    this.contactModel.set({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium',
      subscribeNewsletter: false
    });
    
    // Limpiar el estado de validación del formulario
    setTimeout(() => {
      const formState = this.contactForm();
      if (formState && typeof formState.reset === 'function') {
        formState.reset();
      }
    }, 0);
  }

  // Marcar todos los campos como touched
  markAllFieldsTouched(): void {
    // Como no hay método touch(), usamos el modelo directamente
    this.contactModel.update(current => ({
      ...current,
      // Forzamos un cambio para marcar como touched
      name: current.name + ' ',
      email: current.email + ' ',
      subject: current.subject + ' ',
      message: current.message + ' '
    }));

    // Luego restauramos los valores originales
    setTimeout(() => {
      this.contactModel.update(current => ({
        name: current.name.trim(),
        email: current.email.trim(),
        subject: current.subject.trim(),
        message: current.message.trim(),
        priority: current.priority,
        subscribeNewsletter: current.subscribeNewsletter
      }));
    }, 0);
  }

  // Métodos helper para validación con tipos correctos
  getFieldErrors(field: () => FieldState<string>): string[] {
    const fieldState = field();
    const errors = fieldState.errors();
    return errors ? errors.map((error: any) => error.message || 'Error desconocido').filter(Boolean) : [];
  }

  hasFieldError(field: () => FieldState<string>): boolean {
    const fieldState = field();
    return fieldState.touched() && fieldState.errors().length > 0;
  }
}
