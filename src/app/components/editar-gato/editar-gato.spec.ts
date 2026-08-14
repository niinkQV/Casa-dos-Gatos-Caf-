import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditarGato } from "./editar-gato";

describe("EditarGato", () => {
  let component: EditarGato;
  let fixture: ComponentFixture<EditarGato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarGato],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarGato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
