import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SingleArticle from '../components/Articles/Article';
import { PrivateRoute } from '../components/PrivateRoute';
import { FRONT_URL_ADD_ARTICLE } from '../constants/urlConstants';
import AddArticle from '../pages/AddArticle';


const Router = () => {
    return (
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/article/:idArticle" element={<SingleArticle/>} />
          <Route path={FRONT_URL_ADD_ARTICLE} element={
            <PrivateRoute roles={["ROLE_ADMIN"]} children={<AddArticle />} />
          }
          />
          <Route path="*" element={<NotFound/>} />
          <Route path="/a-propos" element={<About/>} />
        </Routes>
    )
}

export default Router;