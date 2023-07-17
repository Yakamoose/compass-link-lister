import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
      // call display func here with (this.data)
      this.displayUI(this.productList);
    });
  }

  listConverter(productData: any[]): any[] {
    // sort alphabetically    
    productData.sort((a, b) => a.productName.localeCompare(b.productName));
    productData.sort((a, b) => a.portfolio.localeCompare(b.portfolio));

    productData = productData.filter(({ recordType }) => !['Family'].includes(recordType))

    // remove recordType = Family
    return productData;
  }

  displayUI(productList: any[]) {
    console.log({ productList })
  }

  ngOnInit() {
    // Fetch JSON data from assets

  }

}
