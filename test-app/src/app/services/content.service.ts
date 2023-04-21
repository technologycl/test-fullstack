import { Injectable } from '@angular/core';
import { BehaviorSubject,} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

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
  private body$ = this.body.asObservable();
  private footer$ = this.footer.asObservable();

  constructor() {}

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
    // Desarrollar el cuerpo del método / Develop the method body
  }
}
