import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomMethods } from 'src/app/shared/custom/custom-method';
import { IChat } from 'src/app/shared/interfaces/chat.interface';
import { IContact } from 'src/app/shared/interfaces/contact.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { ChatService } from 'src/app/shared/service/chat.service';
import { ContactService } from 'src/app/shared/service/contact.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  // Public Properties
  public user: IUser;
  public chatedUser: IUser;
  public allUser: IUser[] = []; // Temp
  public mycontacts: IContact;
  public myContactUser: IUser[] = [];
  public myChats: IChat[] = [];
  public allChats: IChat[] = [];
  public newChat: IChat;

  //Other Properties
  public imgPath: string = CustomMethods.userPath;
  public searchText: string;

  isError: boolean = false;
  errMessage: string = 'no error';

  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private chatService: ChatService
  ) {}
  ngOnInit() {
    this.getuser(1);
  }
  // Chain 1
  getuser(id: number = 1) {
    this.userService.get(id).subscribe(
      (user: IUser) => {
        this.user = user;
      },
      (err: any) => {
        console.log(err);
        this.errMessage = 'Unable to display result of ID ' + id;
      },
      () => {
        this.isError = false;
        this.errMessage = 'Showing Result of ID ' + id;
        this.getContacts(id);
      }
    );
  }
  // Chain 2
  getContacts(myId: number = 1) {
    this.contactService.getContact(myId).subscribe(
      (mycontacts: IContact) => {
        this.mycontacts = mycontacts;
      },
      (err: any) => {
        console.log(err);
        this.isError = true;
        this.errMessage = 'Unable to fetch your Contacts';
      },
      () => {
        this.isError = false;
        this.errMessage = 'your Contacts are displayed';
        // Change at Real API
        this.getAllUser();
      }
    );
  }
  // Chain 3
  getAllUser() {
    this.userService.gets().subscribe(
      (users: IUser[]) => {
        this.allUser = users;
      },
      (err: any) => {
        console.log(err);
        this.isError = true;
        this.errMessage = 'All Users cannot be loaded';
      },
      () => {
        this.isError = false;
        this.errMessage = 'All Users have been Reterived';
        // Temporary Change at Real API
        this.myContactUser = [];
        this.mycontacts.contacts.forEach((y) => {
          this.myContactUser.push(this.allUser.find((x) => x.id === y));
          this.getallChats(); // Temporary
        });
      }
    );
  }
  // Contacts Search Functionality
  searchControl = new FormControl('');
  filterContacts() {
    const searchText: string = this.searchControl.value;
    if (searchText === '') {
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
  // Temporary Alternate
  getallChats(letsChat: boolean = false) {
    this.chatService.gets().subscribe(
      (allChats: IChat[]) => {
        this.allChats = allChats;
      },
      (err: any) => {
        console.log(err);
        this.isError = true;
        this.errMessage = 'Unable to Load Chats';
      },
      () => {
        this.isError = false;
        this.errMessage = 'Chats are being Displayed';
        if (letsChat) {
          this.letsChat(this.chatedUser);
        }
      }
    );
  }
  // Cannot Implement due to API flexibility
  getMyChats(userID: number, chatedUserId: number) {
    this.chatService.getMyChats(userID, chatedUserId).subscribe(
      (mychats: IChat[]) => {
        this.myChats = mychats;
      },
      (err: any) => {
        console.log(err);
        this.isError = true;
        this.errMessage = 'Unable to Load Chats';
      },
      () => {
        this.isError = false;
        this.errMessage = 'Chats are being Displayed';
      }
    );
  }
  // Start Chating with Specific Person in List
  letsChat(chatedUser: IUser) {
    this.chatedUser = chatedUser;
    if (this.allChats.length < 1) {
      this.getallChats();
    }
    this.myChats = this.allChats.filter(
      (x) =>
        (x.userA === this.user.id && x.userB === this.chatedUser.id) ||
        (x.userA === this.chatedUser.id && x.userB === this.user.id)
    );
  }
  deleteChat(chatId: number) {
    if (confirm('Are you sure you want to delete')) {
      this.chatService.delete(chatId).subscribe(
        (deleteMessage) => console.log(deleteMessage),
        (err) => console.log('Chat not Deleted Error = ' + err),
        () => {
          this.getallChats(true);
        }
      );
    }
  }
  // Send Chat
  chatMessage = new FormControl('');
  sendChat() {
    const message = this.chatMessage.value;
    this.newChat = {
      id: 0,
      userA: this.user.id,
      userB: this.chatedUser.id,
      message: message,
      date: new Date(),
    };
    this.chatService.add(this.newChat).subscribe(
      (sendMessage) => console.log(sendMessage),
      (err) => console.log('Chat Send Error = ' + err),
      () => {
        this.allChats.push(this.newChat);
        this.letsChat(this.chatedUser);
        this.chatMessage.setValue('');
      }
    );
  }
  // Temporary
  changeUserControl = new FormControl('');
  changeUser() {
    this.myContactUser = [];
    const Uid = +this.changeUserControl.value;
    this.getuser(Uid);
    this.changeUserControl.setValue('');
  }
  //compute duration (Last Message / User Online State)
  computeDuration(date: string): string {
    return CustomMethods.computeDuration(date);
  }
}
