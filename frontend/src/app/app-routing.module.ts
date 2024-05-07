import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EventDetailsPage } from './pages/events/event-details/event-details.page';
import {EventAddingPage} from "./pages/events/event-adding/event-adding.page";
import {EventBookingPage} from "./pages/events/event-booking/event-booking.page";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'my-tickets',
    loadChildren: () => import('./pages/my-tickets/my-tickets.module').then( m => m.MyTicketsPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'super-user',
    loadChildren: () => import('./pages/super-user/super-user.module').then( m => m.SuperUserPageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./pages/home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'featuredevents',
    loadChildren: () => import('./pages/featuredevents/featuredevents.module').then( m => m.FeaturedeventsPageModule)
  },
  {
    path: 'categories/movies',
    loadChildren: () => import('./categories/movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: 'categories/games',
    loadChildren: () => import('./categories/games/games.module').then( m => m.GamesPageModule)
  },
  {
    path: 'categories/parties',
    loadChildren: () => import('./categories/parties/parties.module').then( m => m.PartiesPageModule)
  },
  {
    path: 'categories/art',
    loadChildren: () => import('./categories/art/art.module').then( m => m.ArtPageModule)
  },
  {
    path: 'categories/meet',
    loadChildren: () => import('./categories/meets/meets.module').then( m => m.MeetsPageModule)
  },
  {
    path: 'categories/music',
    loadChildren: () => import('./categories/music/music.module').then( m => m.MusicPageModule)
  },
  {
    path: 'categories/education',
    loadChildren: () => import('./categories/education/education.module').then( m => m.EducationPageModule)
  },
  { path: 'event-details/:eventId', component: EventDetailsPage }

,

  { path: 'add-event', component: EventAddingPage }

,

 { path: 'book-event', component: EventBookingPage },
 {
  path: 'bookedevents',
  loadChildren: () => import('./pages/bookedevents/bookedevents.module').then( m => m.BookedeventsPageModule)
},
  {
    path: 'wish-list',
    loadChildren: () => import('./pages/wish-list/wish-list.module').then( m => m.WishListPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
