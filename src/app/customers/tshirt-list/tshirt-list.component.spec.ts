import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TshirtListComponent } from './tshirt-list.component';

describe('TshirtListComponent', () => {
  let component: TshirtListComponent;
  let fixture: ComponentFixture<TshirtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TshirtListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TshirtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
