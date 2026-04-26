import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiAssisstantPage } from './ai-assisstant.page';

describe('AiAssisstantPage', () => {
  let component: AiAssisstantPage;
  let fixture: ComponentFixture<AiAssisstantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AiAssisstantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
