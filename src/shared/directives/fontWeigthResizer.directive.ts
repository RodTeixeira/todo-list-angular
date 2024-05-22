import { Directive, ElementRef, Input, OnChanges } from "@angular/core";

@Directive({
  selector: "[fontWeightResizer]",
  standalone: true,
})
export class FontWeigthResizerDirective implements OnChanges {
  @Input("fontWeightResizer") fontWeight!: string;
  defaultFontWeight = "normal";

  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true;
  }

  ngOnChanges(): void {
    this.el.nativeElement.style.fontWeight = this.fontWeight || this.defaultFontWeight;
    this.el.nativeElement.style.color = "blue";
  }
}
