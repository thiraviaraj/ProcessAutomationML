import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from "./ui/header/header.component";
import { FooterComponent } from "./ui/footer/footer.component";
import { Page1Component } from "./ui/page1/page1.component";
import { Page2Component } from "./ui/page2/page2.component";
// import { LayoutComponent } from "./ui/layout/layout.component";

import { ModuleWithProviders } from "@angular/core";
const routes: Routes = [
    { path: "process", component: Page1Component },
    { path: "page2", component: Page2Component },
    { path: "home", redirectTo: "/", pathMatch: "full" }
];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);