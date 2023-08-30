import { Directive, ElementRef, HostListener } from '@angular/core';
import { removerCaracteresEspeciais } from 'src/app/utils/removerCaracteresEspeciais';

@Directive({
  selector: '[cepMask]'
})

export class CepMaskDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const cep = event.target.value;
    let cepMask = removerCaracteresEspeciais(cep)
    
    if (cepMask && cepMask.length > 8) {
      cepMask = cepMask.slice(0, 8)
    }
    
    if (cepMask) {
      cepMask = cepMask.replace(/^(\d{5})(\d)/, '$1-$2')
    }
    
    this.el.nativeElement.value = cepMask || ''
  }
}
