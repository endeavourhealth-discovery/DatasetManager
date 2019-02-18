import {Injectable} from '@angular/core';
import {AbstractMenuProvider} from 'eds-angular4';
import {MenuOption} from 'eds-angular4/dist/layout/models/MenuOption';
import {DatasetManagerComponent} from './dataset-manager/dataset-manager/dataset-manager.component';
import {Routes} from '@angular/router';
import {DatasetEditorComponent} from "./dataset-manager/dataset-manager/dataset-editor/dataset-editor.component";

@Injectable()
export class AppMenuService implements  AbstractMenuProvider {
  static getRoutes(): Routes {
    return [
      { path: '', redirectTo : 'datasetManager', pathMatch: 'full' }, // Default route
      { path: 'datasetManager', component: DatasetManagerComponent },
      { path: 'datasetEditor', component: DatasetEditorComponent }
    ];
  }
  getApplicationTitle(): string {
    return 'Dataset Manager';
  }

  getClientId(): string {
    return 'eds-user-manager';          // TODO: Client id
  }

  useUserManagerForRoles(): boolean {
    return false;
  }

  getMenuOptions(): MenuOption[] {
    return [
      {caption: 'Dataset Manager', state: 'Dataset Manager', icon: 'fa fa-user', role: 'eds-user-manager:user-manager'},
      {caption: 'Configuration', state: 'config', icon: 'fa fa-cogs', role: 'eds-user-manager:user-manager'},
      {caption: 'Delegation', state: 'config', icon: 'fa fa-group', role: 'eds-user-manager:user-manager'},
      {caption: 'Audit', state: 'config', icon: 'fa fa-list', role: 'eds-user-manager:user-manager'}
    ];
  }
}
