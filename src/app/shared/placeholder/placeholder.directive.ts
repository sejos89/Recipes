import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceHolder]',
})
export class PlaceHolderDirective {
  // viewContainerRef gives you automatically access to the reference to a pointer at
  // the place where this directive is then used. It will allow you to get info (has methods like create new Components)
  // about the place where you use the directive
  constructor(public viewContainerRef: ViewContainerRef) {}
}
