import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierScoreComponent } from './modifier-score.component';

describe('ModifierScoreComponent', () => {
  let component: ModifierScoreComponent;
  let fixture: ComponentFixture<ModifierScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierScoreComponent]
    });
    fixture = TestBed.createComponent(ModifierScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
