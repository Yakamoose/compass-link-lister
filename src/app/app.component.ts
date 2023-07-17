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

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    this.http.get('./assets/productData-july16.json').subscribe((data: any) => {
      this.productData = data.data;
      // console.log(this.productData);

      this.productList = this.listConverter(this.productData);
      // html will display automatically
    });
  }

  listConverter(productData: any[]): any[] {
    // sort alphabetically    
    productData.sort((a, b) => a.productName.localeCompare(b.productName));
    productData.sort((a, b) => a.portfolio.localeCompare(b.portfolio));

    // remove recordType = Family
    productData = productData.filter(({ recordType }) => !['Family'].includes(recordType))

    return productData;
  }
}
