import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { SkeletonLoaderComponent } from './skeleton-loader.component';

describe('SkeletonLoaderComponent', () => {
  let fixture: ComponentFixture<SkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonLoaderComponent);
  });

  it('renders the selected placeholder and announces loading accessibly', () => {
    fixture.componentRef.setInput('variant', 'video');
    fixture.detectChanges();

    const loader = fixture.nativeElement.querySelector('[role="status"]');
    expect(loader.getAttribute('aria-busy')).toBe('true');
    expect(loader.querySelector('.skeleton-video')).toBeTruthy();
  });
});
