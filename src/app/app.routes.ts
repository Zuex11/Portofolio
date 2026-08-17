  import { Component } from '@angular/core';
  import { Routes } from '@angular/router';
  import { About as aboutLayout} from './layout/about/about';
  import { Education as educationLayout } from './layout/education/education';
  import { Projects as projectLayout} from './layout/projects/projects';
  import { Skills  as skillsLayout} from './layout/skills/skills';
  import { Home } from './dashboard/home/home';
  import { Layout } from './layout/layout';
  import { About } from './dashboard/about/about';
  import { Skills } from './dashboard/skills/skills';

  export const routes: Routes = [
    {
      path: '',
      component: Layout,
      children: [
        { path: '', redirectTo: 'about', pathMatch: 'full' },
        { path: 'about', component: aboutLayout },
        { path: 'education', component: educationLayout },
        { path: 'projects', component: projectLayout },
        { path: 'skills', component: skillsLayout },
      ],
    },
    {
      path: 'dashboard',
      component: Home,
      children: [
        { path: '', redirectTo: 'about', pathMatch: 'full' },
        { path: 'about', component: About },
        { path: 'skills', component: Skills },
      ],
    },
  ];