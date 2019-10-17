import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { HttpClientModule } from '@angular/common/http';
import{ ProcessHTTPMsgService } from './process-httpmsg.service';

import  {DataLoaderService} from './data-loader/data-loader.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProcessHTTPMsgService,
    DataLoaderService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
