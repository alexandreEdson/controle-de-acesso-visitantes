import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteDetalheComponent } from './visitante-detalhe.component';

describe('VisitanteDetalheComponent', () => {
  let component: VisitanteDetalheComponent;
  let fixture: ComponentFixture<VisitanteDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitanteDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitanteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
