import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenciaDetalheComponent } from './residencia-detalhe.component';

describe('ResidenciaDetalheComponent', () => {
  let component: ResidenciaDetalheComponent;
  let fixture: ComponentFixture<ResidenciaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResidenciaDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidenciaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
