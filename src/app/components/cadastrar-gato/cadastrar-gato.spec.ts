import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarGato } from './cadastrar-gato';

describe('CadastrarGato', () => {
  let component: CadastrarGato;
  let fixture: ComponentFixture<CadastrarGato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarGato],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarGato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
