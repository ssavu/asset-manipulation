import { ElementRef, OnInit } from 'angular2/core';
import { DropdownDirective } from './dropdown.directive';
export declare class DropdownMenuDirective implements OnInit {
    dropdown: DropdownDirective;
    el: ElementRef;
    constructor(dropdown: DropdownDirective, el: ElementRef);
    ngOnInit(): void;
}
