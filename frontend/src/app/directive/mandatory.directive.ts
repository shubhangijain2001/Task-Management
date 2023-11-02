import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMandatory]'
})
export class MandatoryDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    const label = this.el.nativeElement.previousElementSibling;
    if (label) {
      const asterisk = this.renderer.createElement('span');
      asterisk.textContent = '*';
      asterisk.style.color = 'red';
      this.renderer.appendChild(label, asterisk);
    }
  }
}
