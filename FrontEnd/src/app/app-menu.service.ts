import {Injectable} from '@angular/core';
import {AbstractMenuProvider} from 'eds-angular4';
import {MenuOption} from 'eds-angular4/dist/layout/models/MenuOption';
import {DatasetManagerComponent} from './dataset-manager/dataset-manager/dataset-manager.component';
import {Routes} from '@angular/router';

@Injectable()
export class AppMenuService implements  AbstractMenuProvider {
  static getRoutes(): Routes {
    return [
      { path: '', redirectTo : 'datasetManager', pathMatch: 'full' }, // Default route
      {path: 'datasetManager', component: DatasetManagerComponent}
    ];
  }
  getApplicationTitle(): string {
    return 'Dataset Manager';             // TODO: Tool title
  }

  getClientId(): string {
    return 'eds-user-manager';          // TODO: Client id
  }

  useUserManagerForRoles(): boolean {
    return false;
  }

  getMenuOptions(): MenuOption[] {
    return [
      {caption: 'Dataset Manager module', state: 'skeleton', icon: 'fa fa-user', role: 'eds-user-manager:user-manager'},
      {caption: 'Configuration', state: 'config', icon: 'fa fa-cogs', role: 'eds-user-manager:user-manager'},
      {caption: 'Delegation', state: 'config', icon: 'fa fa-group', role: 'eds-user-manager:user-manager'},
      {caption: 'Audit', state: 'config', icon: 'fa fa-list', role: 'eds-user-manager:user-manager'}
    ];
  }
}
