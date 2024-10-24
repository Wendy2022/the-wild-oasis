import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. load the authenticated user
  const { isLoading, user, isAuthenticated, isFetching } = useUser();

  //2 if there is no authenticated user,redirect to the login
  //isLoading: 仅在查询的第一次加载时为 true
  //isFetching: 在任何时候数据正在获取时都为 true（包括背景刷新和重新获取）.防止过早重定向,确保等待所有数据更新完成

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && !isFetching) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate, isFetching]
  );
  //3. show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //2.
  /* if (!isAuthenticated) {
    navigate("/login");
  } */
  //4. if there is a user , render the app
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
