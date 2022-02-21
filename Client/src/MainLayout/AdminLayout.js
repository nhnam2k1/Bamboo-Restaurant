import { Route, useRouteMatch } from "react-router-dom";

import Header from "./Header/Header";
import ChatPage from "../ChatFeature/ChatPage/ChatPage";

export default function AdminLayout(props) {
    const { path } = useRouteMatch();
    return(
        <>
        <Header/>
        <div className="main-content">
            <Route path={`${path}/chat`} component={ChatPage}/>
        </div>
        </>
    );
}