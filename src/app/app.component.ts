import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  productData!: any[];
  productList!: any[];
  onlyShowLinkProducts = false;

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    this.http.get('./assets/productData-july16.json').subscribe((data: any) => {
      this.productData = data.data;
      this.productList = this.listConverter(this.productData);
    });
  }

  listConverter(productData: any[]): any[] {
    productData.sort((a, b) => a.productName.localeCompare(b.productName));
    productData.sort((a, b) => a.portfolio.localeCompare(b.portfolio));
    productData = productData.filter(({ recordType }) => !['Family'].includes(recordType));
    
    // Filter out products based on onlyShowLinkProducts
    if (this.onlyShowLinkProducts) {
      productData = productData.filter(product => product.compassLink !== '');
    }

    return productData;
  }
}
