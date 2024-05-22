import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TestFontDirectiveComponent } from "./testFontDirective.component";
import { FontWeigthResizerDirective } from "../../fontWeigthResizer.directive";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("testFontDirective", () => {
  let fixture: ComponentFixture<TestFontDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestFontDirectiveComponent, FontWeigthResizerDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(TestFontDirectiveComponent);
    fixture.detectChanges();
  });

  it("should font weight bold", () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector("h2");
    const fontWeight = h2.style.fontWeight;
    expect(fontWeight).toEqual("bold");
  });
});
