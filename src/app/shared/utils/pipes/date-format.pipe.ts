import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateFormat",
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) return "";

    const date = new Date(value);
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1); // Janeiro é 0!
    const year = date.getFullYear();
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  private padZero(value: number): string {
    return value < 10 ? "0" + value : value.toString();
  }
}
