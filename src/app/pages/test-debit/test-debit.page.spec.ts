import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDebitPage } from './test-debit.page';

describe('PartenairesPage', () => {
  let component: TestDebitPage;
  let fixture: ComponentFixture<TestDebitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDebitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDebitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
