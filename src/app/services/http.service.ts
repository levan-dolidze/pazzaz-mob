import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { filter, map, toArray } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../shared/models';
import { SharedService } from '../shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = environment.apiUrl;
  userUID: any;

  constructor(private http: HttpClient, private shared: SharedService) { }


  get UID() {
    this.shared.userAuthChecking().subscribe((res) => {
      if (res) {
        let token = localStorage.getItem('user');
        this.userUID = JSON.parse(token)
      } else {
        return
      }
    })
    return this.userUID?.uid
  };



  getProducts(): Observable<ProductModel[]> {
    const productDammy = [{
      userUID: this.UID,
      itemId: 1,
      itemName: 'Ecco tred',
      image: 'data:image/jpeg;base64,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',
      newPrice: 60,
      brand: 'Ecco',
      storeId: 10,
      season: 'ზაფხული',
      gender: 'male',
      type: 'ფეხსაცმელი',
      typeL1: 'ჩექმა',
      typeL2: 'ნახევარჩექმა',
      material: 'ტყავი',
      color: 'თეთრი',
      hill: 'დაბალი',
      key: '-NE7nwxiVz-zhSqvvdSz'
    },
    {
      itemId: 2,
      userUID: this.UID,
      itemName: 'lacosta',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEhISEBIVFRUSFRUYEhUVFhUSFRUVFRUWFhURFxUZHSogGB0lHRUXITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0NFRAQFy0dFR0tLS0tLS0rKysrKystLSsrLS0tLSsrLS0tMS0rLSs3LSsrKy03Ky0tNystKysrLSsrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgECAwQFBwj/xABGEAACAQICBgcEBwUFCQEAAAAAAQIDEQQhBQYSMUFRBzJhcYGRoRMiscFCUmJyktHwFCMzsuFDRJOi8RU0U1RzgoPC0hb/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAHhEBAQEAAgIDAQAAAAAAAAAAAAERAiEDEhMxQVH/2gAMAwEAAhEDEQA/APcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOPpfWbDYWWxWqWla+yoyk0nubssgOwCBaT6WMDRbjFVaklwUNhec2vRHLwvTDCUm5YWSprrONRSkle21stK/mXB6iDS0RpSli6Ua1CanCW5rg+MWt6a5M3SAUuWV60YRlOclGMU3KTdlFJXcm3uSR4drp0o1niH+wyvQjZJNOLqPjJWd0nwuvAd/ix7qDxjVzXKGMyk5QqpZxbzfanxX6yuiWaD1ujBxjVb9nKWzGUk3syva20rq3Y8/gcvl7yzHT4rmztOwW05qSTTTT3NZp9ty46uQAAAAAAAAAAAAAAAAAAAAAAACjPBdZNI+3xdepfKVRqP3Y+7H0SPXNdtNfseFlOPXm1Tp/ele8vCKk/A8PqR4nTxz9SodrJim6j7Hk+7L5GlQ0lK+b7L9403O9Rrl822c65i3tp6X0f64T0fVjK+1Rm0q0Oa4TXKS9dx9GYLFwrU41aUlKE0pRks001kz42wOJs7Piem6ja818BTnS2VUpuMnTUnlCbWTXNX3rv4lzUSXpg1mlVl+w0HaEbPEyvk5b40VzS3vtsuDPMIYCKzlN352SRuVcVKpKUpu8ptyb+s27yfmzVxVPaSV2s75W5NHSccjOsGwqc41KNRqcHdXV1237LZdqbO/PWNOUZKLXvKU47S2ZTX0lxV/W199yP/sjf0nbsyMywtNJpxWfHj4PgzPLxy92OnHnZ1E40Z0m1sPtKFOMoyknsSbyS6yTXF8+3jY9k1f0vDG4eliKaajUV7PfFptSi+5po+W/9n9ZxqZLcrOV+d7bjd1d1txWjaiqUZNJte1pSzp1Fzcdyl9pWZj1k6hytvdfVAPPNF9LeDqukpxnT2178nZwhLk3e7X2rZXR6DTqKSUotNNXTWaae5pkZXAAAAAAAAAAAAAAAAAAAAAPKOmHSN6+HoJ5U4SqSXbN7EfJQl+Ig2Hlc3tftJ+30hXmnlGWxHlamtl+F1J+JyKdbLLfx5nbh9JXI1g1cnUn7SjZ360W9lp803kzm0NVa767hBdstp+USXKt2mrXr9v+nF/r5i8JptcSjoSnGSTlKb3/AFYu1uCz9eB0JJLJJWXDcl3cjDCfvzlwsoxXddv1foiimJFXt2+f9fzKuXP/AE7/AMy1SLtnl5fkXUZIysaL2oJrrZtpvLi3mvE2LW3eX63d24uVvz5ov2NKm6j4peBmcJ84SVuKuu5xaaKYhO6cc1azW7O7z8reRrxozm85NLsyMjp46sp03CKhFqPuqKUUpLgrbk93kTnQnS1iKMMPDEUacoU4qNTZ92TSyUk17qaS3Ws+w85raOX0KjvxTd/JmJYeqsm4yT33bT+BL2r63oVFOKkr2kk1fJ2avmjIeD6kdI+Iwa9ji716KX7uW0vawsso3fWXDPdw5HqOpeudHSUZKCcKtNJ1KTd7J5KcZfSX67+dmCTgAgAAAAAAAAAAAAABoaex37Phq9b/AIdOcl3pPZXnY3yJ9KVZw0bXt9J04vudSNwPCai2t+/nxvzMLut+dvD0/J+BlUik9z7jvEYfbdr7Vn/8mKrUb3XXbx3ct/mXPK9uz+WJTeBjhC2SLtkvsUYFDLTkYysQMtSF+8wTyyfg1+vQy7QavkBiilx8/lbgW4hO3uuzTV1zjndd+4vcXHdu/XoWxS4eQGrKc5O0fd9X/QyLRrazqO/C+42oWNatVkm7p73s2zTXB5ZEwarwdRdVu/erep09BaXxuCn7ShLYna14uDTV77M4vKS7PI06cKk+KivMx/slW7V7W3PLPtuTFer0emOvGnS9rhqftE/3zU5KMl9hZ7D73JfL1DVnT1LSGHhiKF9mV01JWlGUXaUX+Z8t06c116kbcs2/yJHqrrzV0ZeNCrtU5f2M1tU1K3WjZ7S8HwMWD6WB5Rqb0urEVo0MXFR9pJRp1KcWoqUslGabeTf0l/U9WTMioAAAAAAAAAAEc170fLFYSeHg0pVNlxcr2vCUZWdudreJIzk6Vl78e75gfPeltBYrCN+3oTjFfTS26b7duOSXfZnLVc+kFLt8zjaU1TweJu6uGhd75w/dy842v4mp5B4Jt/ruy/LzKqR6fpHoqpSu8PiJw5RqRVRd11Z/EjGkujrH0ruEIVlzpzV+/Znsvyua94I1co2VxWHqUZbNaE6cuU4yg/KSLEzSLkVTLSqKL0y5FiLkQXGKa4ovZRsosbvmt/o+zsZfFJmPd+vMvp/MosrVkpbN7Nx2u9O/HwLEp1YvYySTs3vk+S5I2b8/hcsi27WyXPcSw1r6O0enZ1PefbuO1SowWWxHyRrYZ3X64/1ubCJij0dQlm4bL5wey+/l6E+1M1xq4RKlXqyr0VlFzX72muyd/fXY0u/gQNMqptGfWD6J0dpqhiF+6qxl2X2ZfheZ0D5qhipR3M7mjtdMVQsoVpWX0Ze/HyZn1HvIPMtFdKiyWJpd8qe/8Defmic6G1gw+LV6FWMmt8erJd8Xn47iWDqAAgAAAcnTas4PvXwZ1jV0hhvaQtxTuu8DjRZkTNelUTbimtqPWV1dd6NhRMqrcrcJFdkIxYrDQqxcKsIzi98ZJSXkyIaZ6NsLWu6DeHnyj71P8D3eDRNNkqWWjxDTOo+Mwt37P2sF9Ojedl2w6y8rdpGz6URy9Lau4XFfx6EZSf017s/xxzNzn/R4Ci5I9N0j0XU3nh8RKH2aiU13bUbP0ZH8Z0d46n1YwqL7E0n5TsbnKIiTLbHXxGr2Lp9fC1l2+zlJecU0aFSGzlNbL5PJ+TLo1KmVvH4GSK39/wAkVrJNZPn/ACsvlHN/rgiwWiUviviUaKyjl5Ci7DyyXYvmzL7SxrUbN22ufo/6mzT0dVn/AA6dSf3YSl8EA9uHiEbtHVPG1Orha3/dH2f89jfodHWPlvhCH36kfhC5Ng4bxUTBUxae4m2H6K6z/iYinHsjGU/jsnYwfRdh451a1WfYtmmvg36k9oPKJVpPcdLVativ2iE8HGcqlOSfu32VzU5boxayd+Z7BhtTcDR6uHhJrjO9X+dtHRUFFbMUoxW5JJJeCMXmqTYDFKrBStZ5bUb32XbNGyR7QGI/eSgne8bvldcF5skJkAAAAAEe0pqnRrPaV4S3prJp80+BzJaBx1H+DiVUX1aq2/8AN1vUmgAgz0ljaX8bBqaX0qM//WS+Zatb6EcqsK1J/bpSa84XROmjDVwkJ9aKfgMEZwmsOFqu1PEUm/q7aUvwvP0OmmYtIaoYWtfapR8kcSpqLKjnhK9SlbdGMnseMOq/FEwSCwsR2OLxuGyxFNVor6cFsT77dV+h1MBpujWezGdpfUn7k/J7/C5BvFUVsLAEVkr78/UoVA1a+iqE+vQpS+9ThL4o1/8A87g/+Vof4NP8jpAujmrV7CL+60P8Kn+RetC4ZbsNR/wqf5G/5lrXf+vADFSwsIdSEY/dil8EZWyluxlLdhBRstb7S63cWN9oFG+8tcnyXiw33mOfcvF3AsqVPteEVc0qr7PxP5GWviEk7zy5RyRp0JSr/wC7w287bStJJ8nLd6gdPVvOs3fdB8LLNpZEqOVoLRjoxbm7zlvtuSW6KOqaAAAAAAAAAAAAABbKKe9HM0hq9h669+mu86oAilTVetT/AN2xdSK4RnarHuSmnZd1jBP/AGlS61GjWX2HKlLxvtJkyAEJescofx8HiIc3GMasfNO/oIa44P6VRw/6lOpD1cbE1aNetgaU+tTi+9ImCN0dZcHPq4qi/wDywv5XNyGkaMt1WD7pxfzM2K1TwdTrUIeSOPiujPAT/sYrwGDrLEw4S9UHiI/W9URSv0SYR9WNu451foio8G/MYJtUx9KPWqRXfOKNLEayYSHXxFFd9WH5kHqdEcFuv6GF9FqX1vQYJXiNftHw/vEJfcUqn8qZy8R0oYRfw41Z90FFf5mjlQ6NUvreRtUujtLg/IYM+H1+9s7RpbHLbmpPxjFfMzyq4jEytDGQpR+xQUp/iqTkv8pkwuo2zwZ2cDqs4bsii7QehKVO7queJlK15YhxqJWvbYhZQhv4JPdyJdh5qySSSXBZLyNDBaMcFmzp06dgLwAAAAAAAAAAAAAAAAAAAAAAAAAAAAFLDZXIqALdhciuyuRUAUsVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==',
      newPrice: 51,
      brand: 'Ecco',
      storeId: 10,
      season: 'ზაფხული',
      gender: 'male',
      type: 'ფეხსაცმელი',
      typeL1: 'ჩექმა',
      typeL2: 'ნახევარჩექმა',
      material: 'ტყავი',
      color: 'თეთრი',
      hill: 'დაბალი',
      key: '-NE7qvxdmLEQQifv3_NL'

    },
    {
      itemId: 3,
      userUID: this.UID,
      itemName: 'zara',
      image: 'data:image/jpeg;base64,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',
      newPrice: 60,
      brand: 'Ecco',
      storeId: 10,
      season: 'ზაფხული',
      gender: 'male',
      type: 'ფეხსაცმელი',
      typeL1: 'ჩექმა',
      typeL2: 'ნახევარჩექმა',
      material: 'ტყავი',
      color: 'თეთრი',
      hill: 'დაბალი',
      key: '-NE7nwxiVz-zhSqvvdSz'
    },
    ]
    return of(productDammy)
  };


  addSubscribtion(subscribtion: any): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${this.apiUrl}subscribtions.json`, subscribtion)
  };

  getSubscribtionItems(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}subscribtions.json`).pipe(
      map((res) => {
        if (res) {
          let arr: ProductModel[] = [];
          let array = []
          for (const key in res) {
            arr.push({ ...res[key], key: key })
          }
          from(arr).pipe(
            filter((x => x[0].userUID === this.UID)),
            toArray(),
          ).subscribe((response) => {
            arr = response
            for (let i = 0; i < arr.length; i++) {
              array.push({ ...arr[i][0], key: arr[i].key })
            }
          })
          return array
        }
        else {
          return []
        }
      })
    )
  };

  deleteSubscribedItem(key: any) {
    return this.http.delete(`${this.apiUrl}subscribtions/${key}.json`, key)
  };


  editChangedPrice(key:any,newObj:any) {
    return this.http.put(`${this.apiUrl}subscribtions/${key}.json`,newObj)
  };



}
