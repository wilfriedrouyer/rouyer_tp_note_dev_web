import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMusicsComponent } from './list-music.component';

describe('ListMusicsComponent', () => {
  let component: ListMusicsComponent;
  let fixture: ComponentFixture<ListMusicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMusicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMusicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
