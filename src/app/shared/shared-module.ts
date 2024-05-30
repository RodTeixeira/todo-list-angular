import { NgModule } from "@angular/core";
import { DateFormatPipe } from "./utils/pipes/date-format.pipe";

@NgModule({
  declarations: [DateFormatPipe],
  exports: [DateFormatPipe],
})
export class SharedModule {}
