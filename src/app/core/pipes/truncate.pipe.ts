import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 60): string {
    if (!value) return '';
    const text = String(value);
    return text.length > limit ? text.substring(0, limit) + '…' : text;
  }
}