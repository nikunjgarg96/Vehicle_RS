import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { vehicleItem } from '../item-info/vehicleItem';
import { VehicleServiceService } from '../vehicle-service.service';
import { BookingsServiceService } from 'src/app/booking/bookings-service.service';
import { VehicleListService } from './vehicle-list.service';
@Component({
  selector: 'app-vehicleList',
  templateUrl: './vehicleList.component.html',
  styleUrls: ['./vehicleList.component.css']
})
export class VehicleComponent implements OnInit {

  //@Input()
   vehicleItem:vehicleItem[];
   deleteVehicleClicked = new EventEmitter();
   isAdmin:boolean;
  


  constructor(private vehicleService:VehicleServiceService,private bookingsService:BookingsServiceService,private vehicleListService:VehicleListService) { }

  ngOnInit() {
    this.isAdmin=this.vehicleService.isAdmin;
    this.vehicleListService.getAllVehicle().subscribe(data=>{
      this.vehicleItem=data;
      if(this.isAdmin){
        this.isAdminMethod();
      }
      else{
        this.isNotAdminMethod();
      }
    })

    
    
  }
  isAdminMethod()
    {
      this.vehicleItem=this.vehicleService.getAllVehicleItem();
      this.vehicleService.getSubject().subscribe((data)=>(
      this.vehicleItem=data
    ));
    }
    
  isNotAdminMethod(){
   this.vehicleItem=this.vehicleService.getVehicleItems();
   this.vehicleService.getSubject().subscribe((data)=>(
     this.vehicleItem=data
    ));
  }
  deleteVehicle(id:number){
    this.vehicleListService.deleteVechile(id).subscribe(data=>{
      alert("Vehicle Removed.")
      this.vehicleItem=data;
      // this.router.navigate(['search-bar'])

    })
  }

}
