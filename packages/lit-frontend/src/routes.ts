import './views/main-page';
import './views/profile-page';

export default [
    { path: '/app', component: 'main-page' },
    { path: '/app/profile/:userid', component: 'profile-page' },
    { path: '(.*)', redirect: '/app' }
]