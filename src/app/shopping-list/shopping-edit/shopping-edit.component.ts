import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name', { static: false }) name: ElementRef;
  @ViewChild('amount', { static: false }) amount: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() clear = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onAddItem() {
    const ingName = this.name.nativeElement.value;
    const ingAmount = this.amount.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredientAdded.emit(newIngredient);
  }
}
