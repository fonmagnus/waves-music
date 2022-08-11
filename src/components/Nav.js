import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faWater } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h1>
        <FontAwesomeIcon icon={faWater} />
        &nbsp;
        W A V E S
        &nbsp;
        <FontAwesomeIcon icon={faWater} />
      </h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic}/>
      </button>
    </nav>
  );
}

export default Nav;