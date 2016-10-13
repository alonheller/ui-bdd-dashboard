import { Component } from '@angular/core';
import {JenkinsBddParserService} from "./services/jenkins-bdd-parser.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JenkinsBddParserService]
})
export class AppComponent {
  constructor(private jenkinsBddParserService: JenkinsBddParserService) {

  }

  title = this.jenkinsBddParserService.getTitle();
}
