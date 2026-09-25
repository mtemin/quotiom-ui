import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilteringBar } from './filtering-bar';

describe('FilteringBar', () => {
  let component: FilteringBar;
  let fixture: ComponentFixture<FilteringBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteringBar],
    }).compileComponents();

    fixture = TestBed.createComponent(FilteringBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
