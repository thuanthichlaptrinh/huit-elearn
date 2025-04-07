// config
import config from '../config';

// pagess
import Blog from '../pages/Blog';
import DetailBook from '../pages/DetailBook';
import CreateTest from '../pages/CreateTest/CreateTest';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import UploadDocument from '../pages/UploadDocument/UploadDocument';
import InfomationPage from '../pages/InfomationPage/InfomationPage';
import HeaderOnly from '../layouts/HeaderOnly/HeaderOnly';
import FilterDepartment from '../pages/FilterDepartment/FilterDepartment';
import FilterSubject from '../pages/FilterSubject/FilterSubject';
import Loading from '../pages/Loading/Loading';

// Sử dụng cho những route không cần đăng nhập nhưng vẫn xem được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.filterDepartment, component: FilterDepartment },
    { path: config.routes.filterSubject, component: FilterSubject },
    { path: config.routes.detail, component: DetailBook },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.createtest, component: CreateTest },
    { path: config.routes.upload, component: UploadDocument },
    { path: config.routes.login, component: LoginPage },
    { path: config.routes.register, component: RegisterPage },
    { path: config.routes.infomation, component: InfomationPage, layout: HeaderOnly },
    { path: config.routes.loading, component: Loading },
];

// Sử dụng cho route bắt buộc đăng nhập mới xem được
const privateRoutes = [];

export { privateRoutes, publicRoutes };
