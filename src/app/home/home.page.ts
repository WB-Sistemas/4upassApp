import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService, ConfigStateService, RestService } from '@abp/ng.core';
import { OAuthService } from 'angular-oauth2-oidc';
import { IdentityUserService } from '../proxy/volo/abp/identity';
import { IdentityUserDto } from '../proxy/volo/abp/identity/models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  users: IdentityUserDto[] = [];
  tenantName = 'host';
  fb!: FormGroup;
  loginError: string = '';
  isKeyboardOpen = false;
  envi = environment.application.baseUrl + '/account/recuperar-password'; 
  mostrarPassword = false;
  summited = false;

  get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  constructor(
    private oAuthService: OAuthService,
    private authService: AuthService,
    private identityService: IdentityUserService,
    private config: ConfigStateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.tenantName = this.config.getDeep('currentTenant.name');
    if (this.tenantName === null) {
      this.tenantName = 'host';
    }
  }

  ngOnInit() {
    this.form();
  }

  form() {
    this.fb = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.summited = true;
    if (this.fb.invalid) {
      this.fb.markAllAsTouched();
      return;
    }

    const { email, password } = this.fb.value;
    this.authService.login({
      username: email,
      password: password,
      rememberMe: false,
    }).subscribe({
      next: () => {
        console.log('Login successful');
        this.router.navigate(['/eventos-asignados']);
        this.fb.reset();
        this.loginError = '';
      },
      error: (error) => {
        console.log('Login error:', error);
        this.loginError = 'E-mail invalido o Contraseña incorrecta.';
      }
    });
  }

  retrieveUsers() {
    this.identityService.getList({ maxResultCount: 10 }).subscribe((result) => {
      this.users = result.items ?? [];
    });
  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit() {
    Keyboard.setScroll({ isDisabled: false });

    Keyboard.addListener('keyboardWillShow', () => {
      this.isKeyboardOpen = true;
      this.cd.detectChanges();
    });

    Keyboard.addListener('keyboardWillHide', () => {
      this.isKeyboardOpen = false;
      this.cd.detectChanges();
    });
  }

}
