import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetsMenuComponent } from './tweets-menu.component';

describe('TweetsMenuComponent', () => {
  let component: TweetsMenuComponent;
  let fixture: ComponentFixture<TweetsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetsMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
