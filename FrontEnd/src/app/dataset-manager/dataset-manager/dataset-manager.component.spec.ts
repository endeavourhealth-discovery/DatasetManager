import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetManagerComponent } from './dataset-manager.component';
import {CommonModule} from '@angular/common';
import {DialogsModule} from 'eds-angular4';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {By} from '@angular/platform-browser';

describe('DatasetManagerComponent', () => {
  let component: DatasetManagerComponent;
  let fixture: ComponentFixture<DatasetManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DialogsModule,
        NgbModule.forRoot()
      ],
      declarations: [ DatasetManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 users', () => {
    expect(component.tableData.length).toBe(4);
  });

  it('should have enabled "Show dialog" button', () => {
    const btn: any = fixture.debugElement.query(By.css('#showDialog')).nativeElement;
    expect(btn.disabled).toBe(false);
  });
});
