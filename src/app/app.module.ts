import { AddCardPagePage } from './../pages/add-card/add-card';
import {RewardsPage} from '../pages/rewards/rewards';
import {VipPage} from '../pages/vip/vip';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MyDatePickerModule } from 'mydatepicker';
import { } from '@types/googlemaps';

import { PLACES_API_KEY } from '../services/config'
import { IonicStorageModule } from '@ionic/storage';
import { filter } from './../providers/filter-pipe';

//import { PLACES_API_KEY } from '../services/config';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { ImagePicker } from '@ionic-native/image-picker';

// Pages
import { HomePage } from '../pages/home/home';
import { ProductsTab } from '../pages/products/products';
import { ShopsListPage } from '../pages/shops-list/shops-list';
import { CategoryListPage } from '../pages/category-list/category-list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ProductListByCategoryPage } from "../pages/product-list-by-category/product-list-by-category-page";
import { ProductListByCategory } from "../pages/product-list-by-category/product-list-by-category";
import { ProductDetailsPage } from "../pages/product-details/product-details";
import { CartPage } from '../pages/cart/cart';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DateTimePage } from '../pages/date-time/date-time';
import { DateHousePage } from '../pages/date-house/date-house';
import { OrderItemsPage } from '../pages/order-items/order-items';
import { AddressPage } from '../pages/address/address';
import { AddAddressPage } from '../pages/add-address/add-address';
import { submitformPage } from '../pages/submitform/submitform';
import { PaymentSavedCardsPage } from '../pages/payment-saved-cards/payment-saved-cards';
import { SavedDetailsPage } from '../pages/payment-saved-cards/saved-details';
import { CreditCardPage } from '../pages/payment-saved-cards/credit-card';
import { PaymentCreditCardPage } from '../pages/payment-credit-card/payment-credit-card';
import { FinalPage } from "../pages/final/final";
import { ForgotEmailPage } from "../pages/forgot-email/forgot-email"
import { MatchPage } from "../pages/match/match";
import { TodoListPagePage } from "../pages/todo-list/todo-list";


import { OrderConfirmationPage } from '../pages/order-confirmation/order-confirmation';
import { OrderSummaryPage } from '../pages/order-summary/order-summary';
import { InvoicePage } from '../pages/invoice/invoice';

import { HouseCleaningPage } from '../pages/house-cleaning/house-cleaning';


import { ProvidersManualPage } from '../pages/providers-manual/providers-manual';
import { ProvidersRecommendedPage } from '../pages/providers-recommended/providers-recommended';


import { LearnMoreManualPage } from '../pages/learn-more-manual/learn-more-manual';
import { LearnMoreRecommendedPage } from '../pages/learn-more-recommended/learn-more-recommended';

import { ApartmentsPage } from '../pages/apartments/apartments';
import { ApartmentschosenPage } from './../pages/apartments-chosen/apartments-chosen';
import { AddApartmentPage } from './../pages/add-apartment/add-apartment';

import { PetServicesPage } from '../pages/pet-services/pet-services';

import { SelectPetPage } from '../pages/select-pet/select-pet';
import { AddPetPage } from '../pages/add-pet/add-pet';

import { NotificationPage } from '../pages/notification/notification';

import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { OrderDisplayPage } from '../pages/order-display/order-display';


import { SettingsPage } from "../pages/settings/settings";
import { ProfileSettingsPage } from "../pages/profile-settings/profile-settings";
import { AddressSettingsPage } from "../pages/address-settings/address-settings";
import { CardSettingsPage } from "../pages/card-settings/card-settings";


// Services
import { UserService } from '../services/user-services';
import { OrderService } from '../services/order-services';
import { ShopService } from '../services/shop-services';
import { LoadingService } from '../services/loading-service';
import { AddressService } from '../services/address-services';
import { ProductsService } from '../services/products-service';
import { PetService } from '../services/pet-services';
import { ProviderService } from '../services/provider-services';
import { ShareDataService } from '../services/shared-data';
import { CartAddRemoveService } from '../services/cart-add-services';
import { SearchService } from '../services/search-servicefilter';
import { CreditcardService } from "../services/creditcard-services";
import { PromocodeService } from "../services/promocode-service";

import { PetDataProvider } from '../providers/pet-data';
import { CartDataProvider } from '../providers/cart-data';
import { DatePickerService } from './../pages/date-house/datepicker.service';


import { PayPalModule } from '../module/paypal.module';
import { Camera } from '@ionic-native/camera';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { HouseCleaningService } from '../services/house-cleaning-services';
import { DoListPage } from '../pages/do-list/do-list';
import { FilterPipe } from '../pipes/filter/filter';

import { NotificationService } from '../services/notification-service';
import { BundledealsPage } from '../pages/bundledeals/bundledeals';
import { ReceiptPage } from '../pages/receipt/receipt';


const placeSettings: AgmCoreModule = {
  apiKey: PLACES_API_KEY,
  libraries: ["places"]
}
//'app_id': '4e98c640'
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '3bcdd7f0'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductsTab,
    ShopsListPage,
    CategoryListPage,
    ProductListByCategoryPage,
    ProductListByCategory,
    LoginPage,
    RegisterPage,
    ProductDetailsPage,
    CartPage,
    DateTimePage,
    DateHousePage,
    OrderItemsPage,
    AddressPage,
    AddAddressPage,
    PaymentSavedCardsPage,
    SavedDetailsPage,
    CreditCardPage,
    PaymentCreditCardPage,
    HouseCleaningPage,
    ProvidersRecommendedPage,
    ProvidersManualPage,
    ProvidersRecommendedPage,
    LearnMoreManualPage,
    LearnMoreRecommendedPage,
    OrderConfirmationPage,
    OrderSummaryPage,
    PetServicesPage,
    SelectPetPage,
    AddPetPage,
    ApartmentsPage,
    AddApartmentPage,
    ApartmentschosenPage,
    NotificationPage,
    MyOrdersPage,
    OrderDisplayPage,
    filter,
    InvoicePage,
    FinalPage,
    ForgotEmailPage,
    MatchPage,
    SettingsPage,
    ProfileSettingsPage,
    AddressSettingsPage,
    CardSettingsPage,
    DoListPage,
    FilterPipe,
    TodoListPagePage,
    VipPage,
    RewardsPage,
    AddCardPagePage,
    submitformPage,
    BundledealsPage,
    ReceiptPage

  ],
  imports: [
    BrowserModule,
    SuperTabsModule,
    AgmCoreModule.forRoot(placeSettings),
    IonicModule.forRoot(MyApp,
      {
        backButtonText: '',
        backButtonIcon: 'ios-arrow-dropleft-outline'
      }),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    PayPalModule,
    MyDatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductsTab,
    ShopsListPage,
    CategoryListPage,
    ProductListByCategoryPage,
    ProductListByCategory,
    LoginPage,
    RegisterPage,
    ProductDetailsPage,
    CartPage,
    DateTimePage,
    DateHousePage,
    OrderItemsPage,
    AddressPage,
    AddAddressPage,
    PaymentSavedCardsPage,
    SavedDetailsPage,
    CreditCardPage,
    PaymentCreditCardPage,
    HouseCleaningPage,
    ProvidersRecommendedPage,
    ProvidersManualPage,
    ProvidersRecommendedPage,
    LearnMoreManualPage,
    LearnMoreRecommendedPage,
    OrderConfirmationPage,
    OrderSummaryPage,
    PetServicesPage,
    SelectPetPage,
    AddPetPage,
    ApartmentsPage,
    ApartmentschosenPage,
    AddApartmentPage,
    NotificationPage,
    MyOrdersPage,
    OrderDisplayPage,
    InvoicePage,
    FinalPage,
    ForgotEmailPage,
    MatchPage,
    SettingsPage,
    ProfileSettingsPage,
    AddressSettingsPage,
    CardSettingsPage,
    DoListPage,
    TodoListPagePage,
    VipPage,
    RewardsPage,
    AddCardPagePage,
    submitformPage,
    BundledealsPage,
    ReceiptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    OrderService,
    ShopService,
    LoadingService,
    AddressService,
    ProductsService,
    PetService,
    ProviderService,
    ShareDataService,
    CartAddRemoveService,
    PetDataProvider,
    CartDataProvider,
    SearchService,
    PromocodeService,
    CreditcardService,
    HouseCleaningService,
    Camera,
    DatePickerService,
    NotificationService,
    Facebook,
    GooglePlus,
    ImagePicker
  ]
})
export class AppModule { }
