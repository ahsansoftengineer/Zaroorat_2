import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { IContact } from "../../interfaces/contact.interface";
import { IUser } from "../../interfaces/user.interface";
import { ContactService } from "../../service/contact.service";
import { UserService } from "../../service/user.service";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"],
})
export class ContactsComponent implements OnInit {

  public chatedUser: IUser;
  public mycontacts: IContact;
  public allUser: IUser[] = []; // Temp
  public myContactUser: IUser[] = [];
  
  // Public Properties
  @Input()
  public user: IUser;
  // Input Properties
  @Input()
  public chatvisible: boolean = true;

  // Output Properties
  @Output()
  public chatBotContact = new EventEmitter<boolean>();
  @Output()
  public chatBotwithContact = new EventEmitter<IUser>();

  isError: boolean = false;
  errMessage: string = "no error";
  // Public Properties
  public minimize: boolean = true;

  constructor(
    private userService: UserService,
    private contactService: ContactService,
  ) {}
  ngOnInit(): void {
    this.getuser(1);
  }

  public displayChat(displayBot: boolean): void {
    this.chatvisible = !displayBot;
    this.chatBotContact.emit(this.chatvisible);
  }

  getuser(id: number = 1) {
    this.userService.get(id).subscribe(
      (user: IUser) => {
        this.user = user;
      },
      (err: any) => {
        console.log(err);
        this.isError = true;
        this.errMessage = "Unable to display result of ID " + id;
      },
      () => {
        this.isError = false;
        this.errMessage = "Showing Result of ID " + id;
        this.getContacts(id);
      }
    );
  }
  getContacts(myId: number = 1) {
    this.contactService.getContact(myId).subscribe(
      (mycontacts: IContact) => {
        this.mycontacts = mycontacts;
      },
      (err: any) => {
        console.log(err);
        this.isError = true;
        this.errMessage = "Unable to fetch your Contacts";
      },
      () => {
        this.isError = false;
        this.errMessage = "your Contacts are displayed";
        // Change at Real API
        this.getAllUser();
      }
    );
  }
  getAllUser() {
    this.userService.gets().subscribe(
      (users: IUser[]) => {
        this.allUser = users;
      },
      (err: any) => {
        console.log(err);
        this.isError = true;
        this.errMessage = "All Users cannot be loaded";
      },
      () => {
        this.isError = false;
        this.errMessage = "All Users have been Reterived";
        // Temporary Change at Real API
        this.myContactUser = [];
        this.mycontacts.contacts.forEach((y) => {
          this.myContactUser.push(this.allUser.find((x) => x.id === y));
          // this.getallChats(); // Temporary
        });
      }
    );
  }
  // Contacts Search Functionality
  searchControl = new FormControl("");
  filterContacts(): void {
    const searchText = this.searchControl.value
    if (searchText === "") {
      this.myContactUser = [];
      this.mycontacts.contacts.forEach((y) => {
        this.myContactUser.push(this.allUser.find((x) => x.id === y));
      });
    } else {
      this.myContactUser = this.allUser.filter(
        (x) =>
          x.name === searchText ||
          x.businessName === searchText ||
          x.userName === searchText
      );
    }
  }
  // Start Chating with Specific Person in List
  letsChat(myContactedUser: IUser) {
    this.chatBotContact.emit(false);
    this.chatvisible = !this.chatvisible;
    this.chatBotwithContact.emit(myContactedUser);
  }
}
