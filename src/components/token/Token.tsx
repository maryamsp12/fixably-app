import { useAppContext } from "../../context/useContext";
import './styles.css';

export const Token = () => {
  const { handleRefreshToken, apiToken } = useAppContext();
  return (
    <>
      <button className="button" onClick={() => handleRefreshToken()}>Refresh token</button>
      {apiToken}
    </>
  );
};


