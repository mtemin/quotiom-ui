import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { CategoryDto, CreateCategoryRequest, UpdateCategoryRequest } from './api.models';

@Injectable({ providedIn: 'root' })
export class CategoryService extends CrudService<CategoryDto, CreateCategoryRequest, UpdateCategoryRequest> {
  constructor() {
    super('category');
  }
}
