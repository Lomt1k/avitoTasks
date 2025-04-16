import { Loader } from '../../components/ui';
import './LoadingPage.scss';

const LoadingPage = () => {
  return (
    <main>
      <div className='loading-page'>
        <Loader />
      </div>
    </main>
  )
}

export { LoadingPage };