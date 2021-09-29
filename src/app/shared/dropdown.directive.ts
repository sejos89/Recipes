import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  // Por un lado capturo el evento generado al clickar en cualquier punto, para saber que elemento del DOM ha sido clickado
  // Si el evento esta dentro de uno de los dos elRef, se ejecuta el !this.isOpen en dicho elRef, y en el otro elRef se ejecuta el false
  // Si el evento esta fuera de los dos elRef, se ejecuta el false en ambos
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
}
