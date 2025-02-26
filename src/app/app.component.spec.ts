import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ChangeDetectorRef } from '@angular/core';
import { AppModule } from './app.module';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let _cd: ChangeDetectorRef;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            declarations: [AppComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        _cd = fixture.componentRef.injector.get(ChangeDetectorRef);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
