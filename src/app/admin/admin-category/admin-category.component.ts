import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/categories.interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/classes/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  newCategory: string;
  adminCategories: Array<ICategory> = [];
  id: number;
  nameCategory: string;
  item: ICategory;
  editStatus: boolean;
  searchName:string;


  constructor(private modalService: BsModalService, private catService: CategoriesService) { }

  ngOnInit() {
    this.getCategories();
  }

  private getCategories(): void {
    this.catService.getJSONCategories().subscribe(
      data => {
        this.adminCategories = data;
      }
    );
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  addCategory(): void {
    const newC: ICategory = new Category(1, this.newCategory);

    if (this.adminCategories.length > 0) {
      newC.id = this.adminCategories.slice(-1)[0].id + 1;
    }
    if (!this.editStatus) {
      this.catService.postJSONCategories(newC).subscribe(
        () => {
          this.getCategories();
        }
      );
    } else {
      newC.id = this.id;
      console.log(newC);
      
      this.catService.updateJSONCategories(newC).subscribe(
        () => { this.getCategories() }
      )
    }
    this.editStatus = false;
    this.newCategory = '';

  }


  openModalDel(templateDelete: TemplateRef<any>, item: ICategory): ICategory {
    this.modalRef = this.modalService.show(templateDelete);
    return this.item = item;

  }

  deleteCategory(): void {
    this.catService.deleteJSONCategories(this.item.id).subscribe(
      () => {
        this.getCategories();
      }
    );
  }


  editCategory(category: ICategory, template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    this.newCategory = category.nameCategory;
    this.id = category.id;
    this.editStatus = true;


  }










}
