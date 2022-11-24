import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form') ingredientEditForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredientByIndex(index);
      this.ingredientEditForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }

  // onSubmit(name:string, amount:number){
  //   this.shoppingListService.onAdd(new Ingredient(name, amount));
  // }

  onSubmit(form: NgForm) {
    if (!this.editMode)
      this.shoppingListService.onAdd(
        new Ingredient(form.value.name, form.value.amount)
      );
    else
      this.shoppingListService.onUpdate(
        this.editedItemIndex,
        new Ingredient(form.value.name, form.value.amount)
      );

    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.shoppingListService.onDelete(this.editedItemIndex);
    this.editMode = false;
    this.ingredientEditForm.reset();
  }

  onClear(){
    this.ingredientEditForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
