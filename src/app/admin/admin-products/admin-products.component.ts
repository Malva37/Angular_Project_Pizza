import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { Product } from 'src/app/shared/classes/product.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/categories.interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  modalRef: BsModalRef;
  adminProducts: Array<IProduct> = [];
  productCategoryID: number;
  productCategoryName: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productId: number;
  editStatus: boolean;
  adminCategories:Array<ICategory> =[];
  categoryName:string = 'pizza';
  // Upload image variables
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  searchName:string;
  
  

  constructor(private prService: ProductsService,
              private catService: CategoriesService, 
              private modalService: BsModalService,
              private afStorage :AngularFireStorage) { }
  // constructor(private prService: ProductsService,private modalService: BsModalService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }



  private getProducts(): void {
    this.prService.getJSONProducts().subscribe(
      data => {
        this.adminProducts = data;
      }
    );
  }

  
  private getCategories(): void {
    this.catService.getJSONCategories().subscribe(
      data => {
        this.adminCategories = data;
      }
    );
  }

  selectChangeHandler (event: any): string|number {
    console.log(event);
    this.productCategoryName = event.target.value;
    this.productCategoryID = event.target.selectedIndex;

    console.log(this.productCategoryName,  this.productCategoryID);
    return this.productCategoryName &&  this.productCategoryID;
  }

  addProduct(): void {
    console.log(this.productCategoryName);
    
    const newP: IProduct = new Product(1,
      this.productCategoryID,
      this.productCategoryName,
      this.productName,
      this.productDescription,
      this.productPrice,
      this.productImage);
      console.log(newP);
      
    if (this.adminProducts.length > 0) {
      newP.id = this.adminProducts.slice(-1)[0].id + 1;
    }

    if (!this.editStatus) {
      this.prService.postJSONProducts(newP).subscribe(
        () => {
          this.getProducts();
        }
      );
    } else {
      newP.id = this.productId;
      this.prService.updateJSONProducts(newP).subscribe(
        () => { this.getProducts() }
      );
    }
    this.editStatus = false;
    this.resetForm();
  }

  deleteProduct(product: IProduct): void {
    this.prService.deleteJSONProducts(product.id).subscribe(
      () => {
        this.getProducts();
      }
    );
  }


  resetForm(): void {
    this.productName = '';
    this.productDescription = '';
    this.productPrice = null;
  }

  public upload(event: any): void {
    console.log(event);
    const file = event.target.files[0];
    const filePath = `images/${this.createUUID()}.${file.type.split('/')[1]}`;
     this.task = this.afStorage.upload(filePath, file);
     this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
     this.uploadProgress = this.task.percentageChanges();
     this.task.snapshotChanges()
     .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
     .subscribe();
     this.task.then((e) => {
       this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(data => {
         this.productImage = data;
       });
    }
     );
   }

  private createUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  
  editProduct(product: IProduct, template: TemplateRef<any>) {
    console.log(product);
    this.modalRef = this.modalService.show(template);
    this.productName = product.name;
    this.productDescription = product.description;
    this.productPrice = product.price;
    this.productId = product.id;
    this.editStatus = true;
  }



}
