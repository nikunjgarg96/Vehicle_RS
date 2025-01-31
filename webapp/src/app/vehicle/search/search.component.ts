import { Component, OnInit } from '@angular/core';
import { vehicleItem } from '../item-info/vehicleItem';
import { VehicleServiceService } from '../vehicle-service.service';
import { VehicleListService } from '../vehicleList/vehicle-list.service';
import { BookingsServiceService } from 'src/app/booking/bookings-service.service';
import { AuthServiceService } from 'src/app/site/auth-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchKey:String; 
  sortkey:String;

  vehicleItem:vehicleItem[];
  filteredVehicleItem:vehicleItem[];
  isAdmin:boolean;

// onSearchText(event: any)
// {
//   console.log(event.target.value);
// }

  constructor(private vehicleService:VehicleServiceService,private vehicleListService:VehicleListService,private bookingsService:BookingsServiceService,private authService:AuthServiceService) { }

  ngOnInit() {
    if(this.authService.loggedIn){
      this.bookingsService.getAllBookings();
    }
    this.vehicleListService.getAllVehicle().subscribe(data=>{
      this.vehicleService.vehicleItem=data;
      this.isAdmin=this.vehicleService.isAdmin;
      if(this.isAdmin)
      {
        this.vehicleItem=this.vehicleService.getAllVehicleItem();
      }else{
        this.vehicleItem=this.vehicleService.getVehicleItems();
        

      }
      
      this.filteredVehicleItem=this.vehicleItem;
    })
    
  
  }
search()
{
  let filter = this.searchKey.toLocaleLowerCase();
  this.filteredVehicleItem=this.vehicleItem.filter(
    (item) =>item.name.toLocaleLowerCase().includes(filter));

  this.vehicleService.getSubject().next(this.filteredVehicleItem);
}

sortFunction(){
  if(this.sortkey=="seater"){
    this.filteredVehicleItem=this.filteredVehicleItem.sort((a:vehicleItem, b:vehicleItem): number =>{
      if(a.seater>b.seater)
        return 1;
      else
        return -1;
    })
  }
  if(this.sortkey=="type"){
    this.filteredVehicleItem=this.filteredVehicleItem.sort((a:vehicleItem, b:vehicleItem): number =>{
      if(a.type>b.type)
        return 1;
      else
        return -1;
    })
  }
  if(this.sortkey=="price"){
    this.filteredVehicleItem=this.filteredVehicleItem.sort((a:vehicleItem, b:vehicleItem): number =>{
      if(a.price>b.price)
        return 1;
      else
        return -1;
    })
  }

}


}
