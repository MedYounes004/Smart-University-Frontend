import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiScreenPage } from './ai-screen.page';

describe('AiScreenPage', () => {
  let component: AiScreenPage;
  let fixture: ComponentFixture<AiScreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AiScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
