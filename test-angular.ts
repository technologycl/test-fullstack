
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap, retry } from 'rxjs';


/**
 * -- Primer Problema: / First Problem:
 *
 * Mostrar el contenido de los observables disponibles en el servicio ContentService
 * en el template del componente AppComponent. Adicionalmente:
 *  Title debe estar todo en mayúsculas
 *  Body debe estar todo en minúsculas
 *  Footer debe estar capitalizado
 * /
 R. OK
 * "Show the content of the observables available in the ContentService 
 * service in the AppComponent component template. Additionally:"
 *  Title must be all uppercase
 *  Body must be all lowercase
 *  Footer must be capitalized
 * 
 * -- Segundo Problema: / Second Problem
 *
 * Se necesita que cuando el usuario haga click en el botón "Change Title", asociado al componente ChangeContentComponent,
 * actualize el titulo ("title") que se ve en el componente AppComponent 
 * / 
 r. Ok
 * "When the user clicks on the "Change Title" button, associated to the ChangeContentComponent, it is required to, 
 * update the title ("title") seen in the AppComponent."
 *
 *
 * -- Tercer Problema / Third Problem
 *
 * Se necesita que cuando el usuario haga click en el botón "Call Api" asociado al componente ChangeContentComponent
 * haga el llamado a la api manejada por el servicio GetContentService. En caso de que la conexión sea exitosa debe
 * mostrarse el mensaje "Connection to API Success", caso contrario debe mostrarse el mensaje "Connection to API Failed"
 * en el template asociado al componente ChangeContentComponent 
 * /
 * "* When the user clicks on the "Call Api" button associated to the ChangeContentComponent , it is necessary to call
 *  the api operated by the GetContentService. In case the connection is successful the message "Connection to API Success"
 *  should be displayed, otherwise the message "Connection to API Failed" should be displayed in the template associated 
 *  to the ChangeContentComponent."
 */

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <section>
        <div class="card">
          <div class="card-title">{{ title | uppercase }}</div>
          <br />
          <hr />
          <br />

          <div class="card-body">{{ body | lowercase }}</div>
          <br />
          <hr />
          <br />

          <div class="card-footer">{{ footer | titlecase  }}</div>
        </div>
      </section>
      <change-content></change-content>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: any;
  body: any;
  footer: any;

  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  
   private titleUpdated: BehaviorSubject<string> = new BehaviorSubject(
    'Este es el titulo Modificado'
  );
  
  private title: BehaviorSubject<string> = new BehaviorSubject(
    'Este es el titulo'
  );
  private body: BehaviorSubject<string> = new BehaviorSubject(
    'Este es el contenido principal de la pagina'
  );
  private footer: BehaviorSubject<string> = new BehaviorSubject(
    'Este es el footer '
  );

  private title$ = this.title.asObservable();
  private titleUpdated$ = this.titleUpdated.asObservable();
  private body$ = this.body.asObservable();
  private footer$ = this.footer.asObservable();

  constructor() {
    this.getTitle();
    this.getBody();
    this.getFooter();
  }

  getTitle() {
    return this.title$;
  }

  getBody() {
    return this.body$;
  }

  getFooter() {
    return this.footer$;
  }

  changeTitle() {
    return this.titleUpdated$;
  }
}

@Component({
  selector: 'change-content',
  template: `
    <section>
      <div class="card">
        <button (click)="changeTitle()"> Change Title </button>
        <button (click)="callApi()"> Call Api </button>
        <ng-container *ngIf="flag; else #error">
          <section> Connection to API Success  </section>
        </ng-container>
        
        </ng-content #error>
          <section> Connection to API Failed  </section>
        </ng-content>
        
      </div>
    </section>
  `,
})
export class ChangeContentComponent {
  newTitle = 'Este es el titulo modificado por otro componente';
  hasError = false;
  hasContent = false;
  flag = false;

  constructor( private service: GetContentService) {}

  changeTitle() {
    // Desarrollar el cuerpo del método / Develop the method body
  }

  callApi(){
    
    this.service.getContent()
      .subscribe( 
      (res: any) => {
        this.flag = true;
      },
      (error) => {
        this.flag = false;
      }
      );
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetContentService {
  constructor(
    private http: HttpClient
  ) {}

  getContent(){
    const url = 'https://sitenotexist.com/content/0';

    return this.http.get(url).pipe(
      retry(2),
      map( () => 'Respuesta modificada por el servicio'),
      catchError( (error) => of(error)),
      tap((value) => console.log('check for value', value)),
      map( () => ['Respuesta modificada por el servicio nuevamente']),
    );
  }
}
