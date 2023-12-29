import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  standalone: true,
})
export class FilterPipe implements PipeTransform {

  transform(names: string[], value: string): string[] {
    return names.filter(name => name.includes(value));
  }

}
