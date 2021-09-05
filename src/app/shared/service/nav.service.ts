import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { AuthService } from './auth.service';
import { WINDOW } from './windows.service';
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
  role?:string[]
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false
	role:string;
	items;
	constructor(@Inject(WINDOW) private window, private authService: AuthService,) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}
	
	MENUITEMS: Menu[] = [
		{
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false,role: ['ROLE_SUPER_ADMIN','ROLE_COMPANY']
		},
    {
      path: '/category/category-list', title: 'Category', icon:'box', type:'link', active: false, role: ['ROLE_SUPER_ADMIN','ROLE_COMAPNY']
    },
    {
      path: '/attribute/attribute-list', title: 'Attribute', icon:'box', type:'link', active: false, role: ['ROLE_SUPER_ADMIN','ROLE_COMAPNY']
    },
		{
			path: '/products/physical/product-list', title: 'Product', icon: 'box', type: 'link', active: false, role: ['ROLE_COMPANY']
      // children: [
			// 	{
			// 		title: 'Physical', type: 'sub', children: [
			// 			{ path: '/products/physical/product-list', title: 'Product', type: 'link' },
			// 			{ path: '/products/physical/add-product', title: 'Add Product', type: 'link' },
			// 		]
				// },
				// {
				// 	title: 'digital', type: 'sub', children: [
				// 		{ path: '/products/digital/digital-category', title: 'Category', type: 'link' },
				// 		{ path: '/products/digital/digital-product-list', title: 'Product List', type: 'link' },
				// 		{ path: '/products/digital/digital-add-product', title: 'Add Product', type: 'link' },
				// 	]
				// },
			// ]
		},
		// {
		// 	title: 'Sales', icon: 'dollar-sign', type: 'sub', active: false, children: [
		// 		{ path: '/sales/orders', title: 'Orders', type: 'link' },
		// 		{ path: '/sales/transactions', title: 'Transactions', type: 'link' },
		// 	]
		// },
		// {
		// 	title: 'Coupons', icon: 'tag', type: 'sub', active: false, children: [
		// 		{ path: '/coupons/list-coupons', title: 'List Coupons', type: 'link' },
		// 		{ path: '/coupons/create-coupons', title: 'Create Coupons', type: 'link' },
		// 	]
		// },
		// {
		// 	title: 'Pages', icon: 'clipboard', type: 'sub', active: false, children: [
		// 		{ path: '/pages/list-page', title: 'List Page', type: 'link' },
		// 		{ path: '/pages/create-page', title: 'Create Page', type: 'link' },
		// 	]
		// },
		// {
		// 	title: 'Media', path: '/media', icon: 'camera', type: 'link', active: false
		// },
		// {
		// 	title: 'Menus', icon: 'align-left', type: 'sub', active: false, children: [
		// 		{ path: '/menus/list-menu', title: 'Menu Lists', type: 'link' },
		// 		{ path: '/menus/create-menu', title: 'Create Menu', type: 'link' },
		// 	]
		// },
		// {
		// 	title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
		// 		{ path: '/users/list-user', title: 'User List', type: 'link' },
		// 		{ path: '/users/create-user', title: 'Create User', type: 'link' },
		// 	]
		// },
    {	path: '/group/groups', title: 'Groups', icon: 'users', type: 'link', active: false,role: ['ROLE_SUPER_ADMIN']},
		{
			path: '/vendors/list-vendors', title: 'Vendors', icon: 'users', type: 'link', active: false,role: ['ROLE_SUPER_ADMIN']
      //  children: [
			// 	{ path: '/vendors/list-vendors', title: 'Vendor List', type: 'link' },
			// 	{ path: '/vendors/create-vendors', title: 'Create Vendor', type: 'link' },
			// ]
		},
		// {
		// 	title: 'Localization', icon: 'chrome', type: 'sub', children: [
		// 		{ path: '/localization/translations', title: 'Translations', type: 'link' },
		// 		{ path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
		// 		{ path: '/localization/taxes', title: 'Taxes', type: 'link' },
		// 	]
		// },
		// {
		// 	title: 'Reports', path: '/reports', icon: 'bar-chart', type: 'link', active: false
		// },
		{
			path: '/settings/profile', title: 'Settings', icon: 'settings', type: 'link', role: ['ROLE_SUPER_ADMIN','ROLE_SUPER_ADMIN']
      // children: [
			// 	{ path: '/settings/profile', title: 'Profile', type: 'link' },
			// ]
		},
		// {
		// 	title: 'Invoice', path: '/invoice', icon: 'archive', type: 'link', active: false
		// },
		// {
		// 	title: 'Logout' ,
		// },
    {
			title: 'Chat', path: '/chat/chat', icon: 'message-circle', type: 'link', active: false ,role: ['ROLE_SUPER_ADMIN','ROLE_COMPANY']
		}
	]


	// Array
	setMenuItems(){
		console.log(this.role)
		if(this.role == 'ROLE_SUPER_ADMIN'){
			// this.items = new BehaviorSubject<Menu[]>( this.ADMINMENUITEMS);
			return;
		}

		
	}
	

	getMenuItems(): Observable<Menu[]> {
		// this.setMenuItems();
    this.items = new BehaviorSubject<Menu[]>( this.MENUITEMS);
        return this.items.asObservable();
    }

}
