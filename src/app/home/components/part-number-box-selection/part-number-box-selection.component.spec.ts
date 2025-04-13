import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartNumberBoxSelectionComponent } from './part-number-box-selection.component';

describe('HomeComponent', () => {
  let component: PartNumberBoxSelectionComponent;
  let fixture: ComponentFixture<PartNumberBoxSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartNumberBoxSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartNumberBoxSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
