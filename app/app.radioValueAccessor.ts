import {Directive, Renderer, ElementRef, Self, forwardRef, Provider} from 'angular2/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';

//http://stackoverflow.com/questions/31879497/angular2-radio-button-binding

const RADIO_VALUE_ACCESSOR = CONST_EXPR(new Provider(
   NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => RadioControlValueAccessor), multi: true}
));

@Directive({
   selector:
       'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]',
   host: {'(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()'},
   bindings: [RADIO_VALUE_ACCESSOR]
})

export class RadioControlValueAccessor {
  onChange = (_) => {};
  onTouched = () => {};

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {}

  writeValue(value: any): void {
     this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value == this._elementRef.nativeElement.value);
  }
  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
  registerOnTouched(fn: () => {}): void { this.onTouched = fn; }
}
