import { Component } from "@angular/core";
import { FontWeigthResizerDirective } from "../../fontWeigthResizer.directive";

@Component({
  imports: [FontWeigthResizerDirective],
  standalone: true,
  template: `<h2 fontWeightResizer="bold">test directive</h2>`,
})
export class TestFontDirectiveComponent {}
