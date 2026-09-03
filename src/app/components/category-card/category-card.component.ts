import {Component, ElementRef, Input, signal, WritableSignal} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    // NgStyle,
    // NgClass
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  host: {'class': 'category-card-component'}
})
export class CategoryCardComponent {

  @Input({required:true}) categoryName!: string;
  @Input({required:true}) categoryDescription?: string;
  constructor(private element: ElementRef) {
  }

}
