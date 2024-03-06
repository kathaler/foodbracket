import './views/main-page';
import './views/profile-page';
import './views/bracket-page';

export default [
    { path: '/app', component: 'main-page' },
    { path: '/app/bracket', component: 'bracket-page' },
    { path: '/app/profile/:userid', component: 'profile-page' },
    { path: '(.*)', redirect: '/app' }
]